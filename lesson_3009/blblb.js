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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var mongodb = require('mongodb');
var DB_CONN_STRING = "mongodb://localhost:27017";
var DB_NAME = "it";
var COLLECTION_NAME = "students";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, collection, student, result, cursor, _a, cursor_1, cursor_1_1, doc, e_1_1, err_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    client = new mongodb.MongoClient(DB_CONN_STRING, { useUnifiedTopology: true });
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 16, 17, 19]);
                    // Підключаємося до сервера
                    return [4 /*yield*/, client.connect()];
                case 2:
                    // Підключаємося до сервера
                    _e.sent();
                    console.log("Connected to the database");
                    db = client.db(DB_NAME);
                    collection = db.collection(COLLECTION_NAME);
                    student = { name: "Vadym", age: 16, city: "Lviv" };
                    return [4 /*yield*/, collection.insertOne(student)];
                case 3:
                    result = _e.sent();
                    console.log("Student inserted successfully", result.insertedId);
                    cursor = collection.find({});
                    _e.label = 4;
                case 4:
                    _e.trys.push([4, 9, 10, 15]);
                    _a = true, cursor_1 = __asyncValues(cursor);
                    _e.label = 5;
                case 5: return [4 /*yield*/, cursor_1.next()];
                case 6:
                    if (!(cursor_1_1 = _e.sent(), _b = cursor_1_1.done, !_b)) return [3 /*break*/, 8];
                    _d = cursor_1_1.value;
                    _a = false;
                    doc = _d;
                    console.dir(doc);
                    _e.label = 7;
                case 7:
                    _a = true;
                    return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _e.trys.push([10, , 13, 14]);
                    if (!(!_a && !_b && (_c = cursor_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _c.call(cursor_1)];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15: return [3 /*break*/, 19];
                case 16:
                    err_1 = _e.sent();
                    console.error(err_1);
                    return [3 /*break*/, 19];
                case 17: 
                // Закриваємо клієнт після завершення роботи
                return [4 /*yield*/, client.close()];
                case 18:
                    // Закриваємо клієнт після завершення роботи
                    _e.sent();
                    return [7 /*endfinally*/];
                case 19: return [2 /*return*/];
            }
        });
    });
}
// Викликаємо основну функцію
main().catch(console.error);
