const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'leaderboard.json');

const newResultJSON = process.env.NEW_RESULT;
if (!newResultJSON) {
  console.log("Nessun nuovo risultato fornito. Uscita.");
  process.exit(0);
}

let newResult;
try {
  newResult = JSON.parse(newResultJSON);
} catch (err) {
  console.error("Formato NEW_RESULT non valido:", err);
  process.exit(1);
}

let leaderboard = [];
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf8');
  try {
    leaderboard = JSON.parse(data);
  } catch (err) {
    console.error("Errore di parsing di leaderboard.json:", err);
    process.exit(1);
  }
}

leaderboard.push(newResult);
leaderboard.sort((a, b) => b.score - a.score);

fs.writeFileSync(filePath, JSON.stringify(leaderboard, null, 2), 'utf8');
console.log("Leaderboard aggiornata con successo.");
