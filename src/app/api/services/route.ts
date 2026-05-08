import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { SERVICES } from '@/lib/mock-data';

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            orderBy: {
                category: 'asc'
            }
        });
        return NextResponse.json(services);
    } catch (error) {
        console.error('Failed to fetch services:', error);
        // Fallback so booking UI still works when local DB is unavailable.
        const fallbackServices = SERVICES.map((service) => ({
            ...service,
            name_vn: null,
            description_vn: null,
        }));
        return NextResponse.json(fallbackServices);
    }
}
