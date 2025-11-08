const fs = require('fs');
const csv = fs.readFileSync('produtos.csv', 'utf8').trim();
const lines = csv.split('\n');
const headers = lines[0].split(',').map(h => h.trim());
const rows = lines.slice(1).map(l => l.split(',').map(v => v.trim()));
const json = rows.map(r => {
  const obj = {};
  headers.forEach((h, i) => obj[h] = r[i]);
  return obj;
});
fs.writeFileSync('data/produtos.json', JSON.stringify(json, null, 2));
console.log('data/produtos.json gerado com', json.length, 'produtos');