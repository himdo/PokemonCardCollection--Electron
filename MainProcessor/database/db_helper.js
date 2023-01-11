const { getSetsData } = require('../../helpers/ReadAllJSONData');

const sqlite3 = require('sqlite3').verbose();

let databases = {
  // "cards":{ "id":String,},
  // "sets":{},
  // "types":{},
  // "subtypes":{},
  // "supertypes":{},
  // "rarities":{},
}

function InitializeDataBases() {
  const db = new sqlite3.Database('cards.db');
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS CardSets (CardSet TEXT)");
  
    const stmt = db.prepare("INSERT INTO CardSets VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("set " + i);
    }
    stmt.finalize();
  
    db.each("SELECT rowid AS id, CardSet FROM CardSets", (err, row) => {
        console.log(row.id + ": " + row.CardSet);
    });
  });
  
  db.close();
}

function DropAllDatabases() {
  try {
    const db = new sqlite3.Database('cards.db');
    db.serialize(() => {
      db.run("DROP TABLE IF EXISTS CardSets")
    })
    db.close();
  } catch (error) { }
}

function FreshStart() {
  DropAllDatabases()
  InitializeDataBases()
}


function GetCardSetsData() {
  return getSetsData()
}


module.exports = {
  InitializeDataBases,
  DropAllDatabases,
  FreshStart
}