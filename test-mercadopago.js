const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

// Configurar MercadoPago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});

// Cambia esta variable por tu URL pública de ngrok
const PUBLIC_URL = "https://TU-NGROK-URL.ngrok.io";

async function testMercadoPago() {
  console.log('🔍 Probando configuración de MercadoPago...\n');
  
  // Verificar que existe el token
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    console.error('❌ Error: MERCADOPAGO_ACCESS_TOKEN no está configurado');
    console.log('💡 Asegúrate de tener un archivo .env con tu token de MercadoPago');
    return;
  }
  
  console.log('✅ Token de acceso encontrado');
  console.log('🔑 Token:', process.env.MERCADOPAGO_ACCESS_TOKEN.substring(0, 10) + '...');
  
  try {
    // Crear una preferencia de prueba
    const preference = new Preference(client);
    
    const preferenceData = {
      items: [
        {
          id: 'test-item-1',
          title: 'Producto de Prueba',
          unit_price: 100,
          quantity: 1,
          currency_id: 'ARS',
        }
      ],
      payer: {
        name: 'Usuario de Prueba',
        email: 'test@example.com',
        phone: {
          number: '1234567890',
        },
      },
      back_urls: {
        success: `${PUBLIC_URL}/compra-exitosa`,
        failure: `${PUBLIC_URL}/compra-fallida`,
        pending: `${PUBLIC_URL}/compra-pendiente`,
      },
      auto_return: 'approved',
      external_reference: `test_${Date.now()}`,
    };

    console.log('\n📝 Creando preferencia de pago de prueba...');
    
    const response = await preference.create({ body: preferenceData });
    
    console.log('✅ Preferencia creada exitosamente!');
    console.log('🆔 ID de preferencia:', response.id);
    console.log('🔗 URL de pago:', response.init_point);
    console.log('🔗 URL de sandbox:', response.sandbox_init_point);
    
    console.log('\n🎉 ¡La configuración de MercadoPago está funcionando correctamente!');
    console.log('\n📋 Para probar el pago:');
    console.log('1. Abre la URL de sandbox en tu navegador');
    console.log('2. Usa las tarjetas de prueba de MercadoPago:');
    console.log('   - Mastercard: 5031 4332 1540 6351');
    console.log('   - Visa: 4509 9535 6623 3704');
    console.log('   - CVV: 123');
    console.log('   - Fecha: 11/25');
    console.log('   - Nombre: APRO');
    
  } catch (error) {
    console.error('❌ Error al crear preferencia:', error);
    
    if (error.message.includes('401')) {
      console.log('\n💡 El token de acceso parece ser inválido o estar expirado');
      console.log('   Verifica que tu MERCADOPAGO_ACCESS_TOKEN sea correcto');
    } else if (error.message.includes('403')) {
      console.log('\n💡 No tienes permisos para crear preferencias');
      console.log('   Verifica que tu cuenta de MercadoPago tenga los permisos necesarios');
    }
  }
}

// Ejecutar la prueba
testMercadoPago(); 