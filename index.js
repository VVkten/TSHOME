var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Імпортуємо необхідні бібліотеки
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var APP_DB_NAME = 'mongodb://localhost:27017/lesson6';
mongoose.connect(APP_DB_NAME)
    .then(function () { return console.log('Підключено до бази даних MongoDB'); })
    .catch(function (err) { return console.error('Помилка підключення до бази даних:', err); });
var ProductSchema = new mongoose.Schema({
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
var Product = mongoose.model('Product', ProductSchema);
// Функція перевірки автентифікації
var authenticate = function (req, res, next) {
    var password = req.headers['x-password'];
    var correctPassword = '1112'; // Вставте ваш пароль
    if (password !== correctPassword) {
        return res.status(403).send('Доступ заборонено: неправильний пароль');
    }
    next();
};
// Отримання всіх продуктів
app.get('/products', authenticate, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.find()];
            case 1:
                products = _a.sent();
                res.json(products);
                return [2 /*return*/];
        }
    });
}); });
// Отримання продукту за ID
app.get('/products/:id', authenticate, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.findById(req.params.id)];
            case 1:
                product = _a.sent();
                if (product) {
                    res.json(product);
                }
                else {
                    res.status(404).send('Продукт не знайдено');
                }
                return [2 /*return*/];
        }
    });
}); });
// Додавання нового продукту
app.post('/products', authenticate, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newProduct = new Product({
                    name: req.body.name,
                    price: parseFloat(req.body.price).toFixed(2),
                    manufacturer: req.body.manufacturer
                });
                return [4 /*yield*/, newProduct.save()];
            case 1:
                _a.sent();
                res.status(201).json(newProduct);
                return [2 /*return*/];
        }
    });
}); });
// Оновлення ціни продукту
app.patch('/products/:id', authenticate, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var price, updatedProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                price = req.body.price;
                if (price <= 0) {
                    return [2 /*return*/, res.status(400).send('Ціна повинна бути додатнім числом')];
                }
                return [4 /*yield*/, Product.findByIdAndUpdate(req.params.id, { price: parseFloat(price).toFixed(2) }, { new: true })];
            case 1:
                updatedProduct = _a.sent();
                if (updatedProduct) {
                    res.json(updatedProduct);
                }
                else {
                    res.status(404).send('Продукт не знайдено');
                }
                return [2 /*return*/];
        }
    });
}); });
// Видалення продукту
app.delete('/products/:id', authenticate, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var deletedProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.findByIdAndDelete(req.params.id)];
            case 1:
                deletedProduct = _a.sent();
                if (deletedProduct) {
                    res.send('Продукт видалено');
                }
                else {
                    res.status(404).send('Продукт не знайдено');
                }
                return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log('Сервер працює на порту 3000');
});
