var fs = require('fs');
var https = require('https');
// Отримуємо список покемонів
https.get('https://pokeapi.co/api/v2/pokemon?limit=1302', function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var pokemons = JSON.parse(data).results;
        // Зберігаємо всіх покемонів у файл
        fs.writeFile('pokemons.json', JSON.stringify(pokemons, null, 2), function (err) {
            if (err)
                throw err;
            console.log('Покемони збережено до файлу.');
            // Фільтруємо покемонів, імена яких починаються на букву 'V'
            var letter = 'V';
            var filteredPokemons = pokemons.filter(function (pokemon) { return pokemon.name.startsWith(letter.toLowerCase()); });
            console.log("\u041F\u043E\u043A\u0435\u043C\u043E\u043D\u0438, \u0449\u043E \u043F\u043E\u0447\u0438\u043D\u0430\u044E\u0442\u044C\u0441\u044F \u043D\u0430 \u0431\u0443\u043A\u0432\u0443 \"".concat(letter, "\":"));
            filteredPokemons.forEach(function (pokemon) { return console.log(pokemon.name); });
        });
    });
}).on('error', function (err) {
    console.log('Помилка:', err.message);
});
