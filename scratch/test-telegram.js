const token = "8764106616:AAE0XvRlIFXoi04QLX4Bw9DbTttZq4O21AY";
const chatId = "8455130374";

async function test() {
    console.log(`Testing Telegram Bot...`);
    console.log(`Token: ${token}`);
    console.log(`Chat ID: ${chatId}`);
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
        const botInfo = await response.json();
        console.log('Bot Info:', JSON.stringify(botInfo, null, 2));

        if (!botInfo.ok) {
            console.error('Invalid Token!');
            return;
        }

        const sendResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: "🚀 Test message from Antigravity script!"
            })
        });
        
        const sendResult = await sendResponse.json();
        console.log('Send Result:', JSON.stringify(sendResult, null, 2));
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
