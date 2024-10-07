// Імпортуємо необхідні бібліотеки
const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const APP_DB_NAME = 'mongodb://localhost:27017/lesson6';

mongoose.connect(APP_DB_NAME)
    .then(() => console.log('Підключено до бази даних MongoDB'))
    .catch(err => console.error('Помилка підключення до бази даних:', err));

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 
    },
    manufacturer: {
        type: String,
        required: false
    }
});

const Product = mongoose.model('Product', ProductSchema);

// Функція перевірки автентифікації
const authenticate = (req, res, next) => {
    const password = req.headers['x-password'];
    const correctPassword = '1112'; // Вставте ваш пароль

    if (password !== correctPassword) {
        return res.status(403).send('Доступ заборонено: неправильний пароль');
    }
    next();
};

// Отримання всіх продуктів
app.get('/products', authenticate, async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Отримання продукту за ID
app.get('/products/:id', authenticate, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product); 
    } else {
        res.status(404).send('Продукт не знайдено'); 
    }
});

// Додавання нового продукту
app.post('/products', authenticate, async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: parseFloat(req.body.price).toFixed(2),
        manufacturer: req.body.manufacturer
    });
    await newProduct.save(); 
    res.status(201).json(newProduct); 
});

// Оновлення ціни продукту
app.patch('/products/:id', authenticate, async (req, res) => {
    const { price } = req.body;
    if (price <= 0) {
        return res.status(400).send('Ціна повинна бути додатнім числом'); 
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { price: parseFloat(price).toFixed(2) }, { new: true });
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).send('Продукт не знайдено'); 
    }
});

// Видалення продукту
app.delete('/products/:id', authenticate, async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
        res.send('Продукт видалено');
    } else {
        res.status(404).send('Продукт не знайдено');
    }
});

app.listen(3000, () => {
    console.log('Сервер працює на порту 3000');
});
