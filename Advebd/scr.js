const fs = require('node:fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const [set1, set2] = data.split('\n').reduce((acc, el) => {
    const newNumbers = el.split(' ');
    if (newNumbers.length < 2) return acc;
    acc[0].push(parseInt(newNumbers[0]));
    acc[1].push(parseInt(newNumbers.pop()));
    return acc;
  }, [[], []]);

  set1.sort();
  set2.sort();
  let acc = 0;
  for (let i = 0; i<set1.length; i++ ){
    acc += Math.abs(set1[i]-set2[i])
  }

  console.log(acc);
} catch (err) {
  console.error(err);
}
