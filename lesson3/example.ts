const fs = require('fs');
const https = require('https');

// Отримуємо список покемонів
https.get('https://pokeapi.co/api/v2/pokemon?limit=1302', (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const pokemons = JSON.parse(data).results;

        // Зберігаємо всіх покемонів у файл
        fs.writeFile('pokemons.json', JSON.stringify(pokemons, null, 2), (err) => {
            if (err) throw err;
            console.log('Покемони збережено до файлу.');

            // Фільтруємо покемонів, імена яких починаються на букву 'V'
            const letter = 'V'; 
            const filteredPokemons = pokemons.filter(pokemon => pokemon.name.startsWith(letter.toLowerCase()));

            console.log(`Покемони, що починаються на букву "${letter}":`);
            filteredPokemons.forEach(pokemon => console.log(pokemon.name));

        });
    });
}).on('error', (err) => {
    console.log('Помилка:', err.message);
});
