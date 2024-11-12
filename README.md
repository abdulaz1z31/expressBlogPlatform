# Blog Platform

"Blog Platform" - bu maqolalar, kategoriyalar, kurslar, foydalanuvchilar va kommentariyalar bilan ishlash imkonini beruvchi platforma. Ushbu loyiha foydalanuvchilarga maqola yozish, kurslar va kategoriyalar yaratish, va izohlar qoldirish kabi funksiyalarni taqdim etadi.

## Loyihaning Funksiyalari

- **Foydalanuvchilarni boshqarish**: Ro'yxatdan o'tish, tizimga kirish, foydalanuvchi ma'lumotlarini yangilash va o'chirish.
- **Maqolalarni boshqarish**: Maqola yaratish, ko'rish, yangilash va o'chirish.
- **Kategoriyalarni boshqarish**: Kurs va maqolalar uchun kategoriyalar yaratish, ko'rish, yangilash va o'chirish.
- **Kurslarni boshqarish**: Kurs yaratish, ko'rish, yangilash va o'chirish.
- **Kommentariyalarni boshqarish**: Kommentariya qo'shish, ko'rish, yangilash va o'chirish.

## Ma'lumotlar Bazasi Strukturas

Ma'lumotlar bazasi quyidagi jadvallarni o'z ichiga oladi:

1. **Users** (Foydalanuvchilar) - foydalanuvchi ma'lumotlari saqlanadi
2. **Articles** (Maqolalar) - maqolalar haqida ma'lumot
3. **Categories** (Kategoriyalar) - maqola va kurslar uchun kategoriyalar
4. **Courses** (Kurslar) - kurslar haqida ma'lumot
5. **Comments** (Kommentariyalar) - foydalanuvchilar tomonidan qoldirilgan kommentariyalar

## Endpoints

### Foydalanuvchilar

- `POST /users/register` - Yangi foydalanuvchini ro'yxatdan o'tkazish
- `POST /users/login` - Foydalanuvchini tizimga kirish
- `GET /users/:id` - ID bo'yicha foydalanuvchini ko'rish
- `PUT /users/:id` - Foydalanuvchi ma'lumotlarini yangilash
- `DELETE /users/:id` - Foydalanuvchini o'chirish

### Maqolalar

- `POST /articles` - Yangi maqola yaratish
- `GET /articles` - Barcha maqolalarni ko'rish
- `GET /articles/:id` - ID bo'yicha maqolani ko'rish
- `PUT /articles/:id` - Maqola ma'lumotlarini yangilash
- `DELETE /articles/:id` - Maqolani o'chirish

### Kategoriyalar

- `POST /categories` - Yangi kategoriya yaratish
- `GET /categories` - Barcha kategoriyalarni ko'rish
- `GET /categories/:id` - ID bo'yicha kategoriyani ko'rish
- `PUT /categories/:id` - Kategoriya ma'lumotlarini yangilash
- `DELETE /categories/:id` - Kategoriyani o'chirish

### Kurslar

- `POST /courses` - Yangi kurs yaratish
- `GET /courses` - Barcha kurslarni ko'rish
- `GET /courses/:id` - ID bo'yicha kursni ko'rish
- `PUT /courses/:id` - Kurs ma'lumotlarini yangilash
- `DELETE /courses/:id` - Kursni o'chirish

### Kommentariyalar

- `POST /comments` - Yangi kommentariya qo'shish
- `GET /comments` - Barcha kommentariyalarni ko'rish
- `GET /comments/:id` - ID bo'yicha kommentariyani ko'rish
- `PUT /comments/:id` - Kommentariyani yangilash
- `DELETE /comments/:id` - Kommentariyani o'chirish

## Loyihani Ishga Tushirish

1. **Repozitoriydan klonlash**:
   git clone https://github.com/abdulaz1z31/expressBlogPlatform
2. **Kerakli paketlarni o'rnatish**:
    npm install
3. **Muhit o'zgaruvchilarini sozlash: .env faylida quyidagi o'zgaruvchilarni belgilang**:

    PORT=5000
    MONGO_URI=<MongoDB URI>
    JWT_ACCESS_SECRET=<JWT secret key>
    JWT_REFRESH_SECRET=<JWT secret key>
    JWT_ACCESS_TIME=<JWT time>
    JWT_REFRESH_TIME=<JWT time>
4. **Serverni ishga tushirish**:
    npm run dev

5. **Texnologiyalar**
    Node.js va Express.js - backend uchun
    MongoDB - ma'lumotlar bazasi sifatida
    Mongoose - MongoDB bilan oson ishlash uchun ORM
    JWT (JSON Web Token) - autentifikatsiya uchun
    bcrypt - parollarni xavfsiz saqlash uchun
