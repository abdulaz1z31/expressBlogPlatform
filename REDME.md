# Article API

Bu loyiha `Article` ma'lumotlar bazasidan `author_id`ni olish uchun yozilgan oddiy API ni o'z ichiga oladi. Ushbu API `Node.js`, `Express`, va `Mongoose` yordamida yaratilgan va MongoDB bilan ishlaydi.

## Loyihaning asosiy funksiyalari

- **Create Article**: Yangi maqola yaratish.
- **Get All Articles**: Barcha maqolalarni ko‘rish.
- **Get Article By ID**: Maqolani `id` bo‘yicha ko‘rish va uning `author_id` ni olish.
- **Update Article By ID**: Maqolani `id` bo‘yicha yangilash.
- **Delete Article By ID**: Maqolani `id` bo‘yicha o'chirish.

## Talablar

- Node.js (v14 yoki undan yuqori)
- MongoDB
- npm (Node Package Manager)

## O'rnatish

Loyihani lokal kompyuteringizga yuklab olish uchun quyidagi qadamlarni bajaring:

1. **Loyihani klonlash**:
    ```bash
    git clone <repository-url>
    cd article-api
    ```

2. **Bog'liqliklarni o'rnatish**:
    ```bash
    npm install
    ```

3. **Muhit o'zgaruvchilari (`.env`) ni sozlash**:
   `.env` faylini yaratib, quyidagi o'zgaruvchilarni qo'shing:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_database_uri
