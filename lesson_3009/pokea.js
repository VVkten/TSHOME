"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var node_fetch_1 = require("node-fetch");
var DB_CONN_STRING = "mongodb://localhost:27017";
var DB_NAME = "pokemons";
var COLLECTION_NAME = "pokemons";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, collection, response, data, pokemons, firstLetter, pokemonsMatching, _i, pokemonsMatching_1, pokemon, pokemonDetailResponse, pokemonDetails, secondLetter, deleteResult, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new mongodb_1.MongoClient(DB_CONN_STRING);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 14, 15, 17]);
                    return [4 /*yield*/, client.connect()];
                case 2:
                    _a.sent();
                    console.log("З'єднано з базою даних");
                    db = client.db(DB_NAME);
                    collection = db.collection(COLLECTION_NAME);
                    return [4 /*yield*/, (0, node_fetch_1.default)('https://pokeapi.co/api/v2/pokemon?limit=1302', {})];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    pokemons = data.results;
                    return [4 /*yield*/, collection.insertMany(pokemons)];
                case 5:
                    _a.sent();
                    console.log("".concat(pokemons.length, " \u043F\u043E\u043A\u0435\u043C\u043E\u043D\u0456\u0432 \u0443 \u0431\u0430\u0437\u0456 \u0434\u0430\u043D\u0438\u0445"));
                    firstLetter = "V";
                    return [4 /*yield*/, collection.find({ name: { $regex: "^".concat(firstLetter), $options: 'i' } }).toArray()];
                case 6:
                    pokemonsMatching = _a.sent();
                    pokemonsMatching.forEach(function (pokemon) { console.log(pokemon.name); });
                    _i = 0, pokemonsMatching_1 = pokemonsMatching;
                    _a.label = 7;
                case 7:
                    if (!(_i < pokemonsMatching_1.length)) return [3 /*break*/, 12];
                    pokemon = pokemonsMatching_1[_i];
                    return [4 /*yield*/, (0, node_fetch_1.default)(pokemon.url, {})];
                case 8:
                    pokemonDetailResponse = _a.sent();
                    return [4 /*yield*/, pokemonDetailResponse.json()];
                case 9:
                    pokemonDetails = _a.sent();
                    return [4 /*yield*/, collection.updateOne({ name: pokemon.name }, { $set: { details: pokemonDetails } })];
                case 10:
                    _a.sent();
                    console.log("\u041E\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u0434\u0435\u0442\u0430\u043B\u0456 \u0434\u043B\u044F \u043F\u043E\u043A\u0435\u043C\u043E\u043D\u0430 : ".concat(pokemon.name));
                    _a.label = 11;
                case 11:
                    _i++;
                    return [3 /*break*/, 7];
                case 12:
                    secondLetter = "a";
                    return [4 /*yield*/, collection.deleteMany({ name: { $regex: "^".concat(secondLetter), $options: 'i' } })];
                case 13:
                    deleteResult = _a.sent();
                    console.log("\u0412\u0438\u0434\u0430\u043B\u0435\u043D\u043E ".concat(deleteResult.deletedCount, " \u043F\u043E\u043A\u0435\u043C\u043E\u043D\u0456\u0432 \u0449\u043E \u043F\u043E\u0447\u0438\u043D\u0430\u044E\u0442\u044C\u0441\u044F \u0437 \"").concat(secondLetter, "\"."));
                    return [3 /*break*/, 17];
                case 14:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 17];
                case 15: return [4 /*yield*/, client.close()];
                case 16:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 17: return [2 /*return*/];
            }
        });
    });
}
main().catch(console.error);
