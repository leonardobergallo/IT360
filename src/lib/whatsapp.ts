export async function sendWhatsAppMessage(to: string, message: string) {
  const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_ID!;
  const TOKEN = process.env.WHATSAPP_API_KEY!;

  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

  const body = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: message }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (data.error) {
    console.error('Error enviando WhatsApp:', data.error);
  }
  return data;
} 