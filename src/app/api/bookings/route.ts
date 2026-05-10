import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper to escape characters for Telegram HTML
const escapeHTML = (text: string) => {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

interface BookingNotification {
    id: string;
    startTime: string | Date;
    notes?: string;
    client: {
        name: string;
        phone: string;
    };
    service: {
        name: string;
    };
    offline?: boolean;
}

async function sendTelegramNotification(booking: BookingNotification) {
    console.log('Attempting to send Telegram notification for booking:', booking.id);
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId || token === "your_bot_token_here") {
        console.warn('Telegram notification skipped: Missing or invalid TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID');
        return;
    }

    const dateStr = new Date(booking.startTime).toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const timeStr = new Date(booking.startTime).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const message = `✨ <b>NEW ATELIER RESERVATION</b> ✨
-----------------------------------------
👤 <b>Client:</b> ${escapeHTML(booking.client.name)}
📞 <b>Phone:</b> <code>${escapeHTML(booking.client.phone)}</code>
💅 <b>Service:</b> ${escapeHTML(booking.service.name)}
📅 <b>Date:</b> ${escapeHTML(dateStr)}
🕒 <b>Time:</b> ${escapeHTML(timeStr)}
-----------------------------------------
${booking.notes ? `📝 <b>Notes:</b> ${escapeHTML(booking.notes)}` : '<i>No additional notes</i>'}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();
        if (!response.ok) {
            console.error('Telegram API Error:', result);
        } else {
            console.log('Telegram notification sent successfully!');
        }
    } catch (error) {
        console.error('Failed to send Telegram notification:', error);
    }
}

export async function POST(request: Request) {
    let body: {
        serviceId?: string;
        startTime?: string;
        clientName?: string;
        clientPhone?: string;
        notes?: string;
    } | null = null;

    try {
        body = await request.json();
        
        if (!body) {
            return NextResponse.json({ error: 'Missing request body' }, { status: 400 });
        }

        const { serviceId, startTime, clientName, clientPhone, notes } = body;

        // 1. Basic validation
        if (!serviceId || !startTime || !clientName || !clientPhone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const parsedStartTime = new Date(startTime);
        if (Number.isNaN(parsedStartTime.getTime())) {
            return NextResponse.json({ error: 'Invalid booking time' }, { status: 400 });
        }

        // 2. Validate service exists
        const service = await prisma.service.findUnique({
            where: { id: serviceId }
        });

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        // 3. Check for existing booking at the same time
        const existingBooking = await prisma.appointment.findFirst({
            where: {
                startTime: parsedStartTime,
                status: { not: 'CANCELLED' }
            }
        });

        if (existingBooking) {
            return NextResponse.json({ error: 'This slot is already reserved' }, { status: 409 });
        }

        // 4. Upsert client based on phone
        const client = await prisma.client.upsert({
            where: { phone: clientPhone },
            update: { name: clientName },
            create: {
                phone: clientPhone,
                name: clientName
            }
        });

        // 5. Create appointment
        const appointment = await prisma.appointment.create({
            data: {
                clientId: client.id,
                serviceId,
                startTime: parsedStartTime,
                status: 'PENDING',
                notes: notes || ''
            },
            include: {
                service: true,
                client: true
            }
        });

        // 6. Send notification (Awaited for Vercel stability)
        // In serverless environments, we must await background tasks 
        // otherwise the function may terminate before the fetch completes.
        await sendTelegramNotification({
            ...appointment,
            notes: appointment.notes ?? undefined,
        }).catch(console.error);

        return NextResponse.json(appointment);
    } catch (error) {
        console.error('Failed to create booking:', error);
        // Graceful fallback in local/offline mode where DB may not be reachable.
        if (body && body.serviceId && body.startTime && body.clientName && body.clientPhone) {
            const fallbackAppointment = {
                id: `offline-${Date.now()}`,
                startTime: new Date(body.startTime),
                notes: body.notes || '',
                service: { name: body.serviceId }, // Best guess since service query failed
                client: {
                    name: body.clientName,
                    phone: body.clientPhone,
                },
                offline: true,
            };

            console.log('Database unavailable. Triggering Telegram notification in fallback mode.');
            await sendTelegramNotification(fallbackAppointment).catch(console.error);

            return NextResponse.json(fallbackAppointment);
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
