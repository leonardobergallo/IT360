# 🚀 Guía de Deploy - IT360

## 📋 Prerrequisitos

- Cuenta en [GitHub](https://github.com)
- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Railway](https://railway.app) o [Neon](https://neon.tech)

## 🔧 Paso 1: Base de Datos (Railway/Neon)

### Opción A: Railway
1. Ve a [railway.app](https://railway.app)
2. Crea una cuenta y conecta tu GitHub
3. Crea un nuevo proyecto
4. Selecciona "Provision PostgreSQL"
5. Copia la URL de conexión (formato: `postgresql://user:pass@host:port/db`)

### Opción B: Neon
1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta
3. Crea un nuevo proyecto
4. Copia la URL de conexión

## 🌐 Paso 2: Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Crea una cuenta y conecta tu GitHub
3. Haz clic en "New Project"
4. Selecciona el repositorio `leonardobergallo/IT360`
5. Configura el proyecto:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

## ⚙️ Paso 3: Variables de Entorno

En Vercel, ve a Settings > Environment Variables y agrega:

```bash
# Base de datos
DATABASE_URL="postgresql://user:pass@host:port/db"

# NextAuth
NEXTAUTH_URL="https://tu-dominio.vercel.app"
NEXTAUTH_SECRET="tu-secret-key-aqui"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="tu-google-client-id"
GOOGLE_CLIENT_SECRET="tu-google-client-secret"

# MercadoPago (opcional)
MERCADOPAGO_ACCESS_TOKEN="tu-mercadopago-access-token"
MERCADOPAGO_PUBLIC_KEY="tu-mercadopago-public-key"
```

## 🗄️ Paso 4: Migrar Base de Datos

1. En Vercel, ve a la pestaña "Functions"
2. Ejecuta el comando:
```bash
npx prisma migrate deploy
npx prisma generate
```

O desde tu terminal local:
```bash
# Conecta tu base de datos local
DATABASE_URL="tu-url-de-railway-neon" npx prisma migrate deploy
```

## 🔐 Paso 5: Configurar NextAuth

### Para Google OAuth:
1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un proyecto
3. Habilita Google+ API
4. Crea credenciales OAuth 2.0
5. Agrega las URLs autorizadas:
   - `https://tu-dominio.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (desarrollo)

### Para Credenciales (Email/Password):
1. Crea un usuario admin en la base de datos:
```sql
INSERT INTO "User" (id, name, email, password, role, "createdAt", "updatedAt")
VALUES (
  'admin-1',
  'Admin IT360',
  'admin@it360.com.ar',
  '$2a$10$hashedpassword', -- Usar bcrypt para hashear
  'ADMIN',
  NOW(),
  NOW()
);
```

## 💳 Paso 6: Configurar MercadoPago

1. Ve a [MercadoPago Developers](https://www.mercadopago.com.ar/developers)
2. Crea una cuenta de desarrollador
3. Obtén las credenciales de prueba
4. Agrega las variables de entorno en Vercel

## 📱 Paso 7: Configurar WhatsApp

1. Actualiza el número de WhatsApp en:
   - `src/components/layout/header.tsx`
   - `src/components/layout/footer.tsx`
   - `src/app/contacto/page.tsx`
   - `src/components/payment/payment-button.tsx`

## 🎨 Paso 8: Personalizar Contenido

1. Actualiza los textos en:
   - `src/app/page.tsx` (landing page)
   - `src/app/productos/page.tsx` (productos)
   - `src/app/servicios/page.tsx` (servicios)
   - `src/app/contacto/page.tsx` (contacto)

2. Agrega imágenes reales en `public/`

3. Actualiza precios y stock en los productos

## 🔍 Paso 9: SEO y Analytics

1. Configura Google Analytics:
   - Ve a [Google Analytics](https://analytics.google.com)
   - Crea una propiedad
   - Agrega el código de tracking

2. Configura Google Search Console:
   - Ve a [Search Console](https://search.google.com/search-console)
   - Verifica tu dominio
   - Envía el sitemap

3. Optimiza metadatos en `src/app/layout.tsx`

## 📊 Paso 10: Monitoreo

1. Configura alertas en Vercel
2. Monitorea la base de datos
3. Configura logs de errores

## 🚀 URLs Importantes

- **Sitio principal:** `https://tu-dominio.vercel.app`
- **Panel admin:** `https://tu-dominio.vercel.app/admin`
- **Login admin:** `https://tu-dominio.vercel.app/admin/login`

## 🔧 Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Migrar base de datos
npx prisma migrate dev

# Ver base de datos
npx prisma studio

# Generar cliente Prisma
npx prisma generate
```

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel
2. Verifica las variables de entorno
3. Confirma que la base de datos esté conectada
4. Revisa que NextAuth esté configurado correctamente

## 🎯 Próximos Pasos

1. **Dominio personalizado:** Configura tu dominio en Vercel
2. **SSL:** Automático con Vercel
3. **CDN:** Automático con Vercel
4. **Backup:** Configura backups automáticos de la base de datos
5. **Monitoreo:** Configura alertas y métricas

---

¡Tu sitio IT360 estará listo para captar clientes! 🚀 