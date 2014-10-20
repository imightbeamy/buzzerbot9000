var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('locations');

db.serialize(function() {
  db.run("CREATE TABLE guest_hometowns ( tel INTEGER PRIMARY KEY, answer TEXT, options TEXT )");
});
  

var saveNumber(number, answer, options) {
  db.serialize(function() {
    db.run("INSERT INTO guest_hometowns VALUES ($number, $answer, $options)", {
      $number: number,
      $answer: answer,
      $options: options
    });
  });
}

var fetchNumber(number) {
  db.serialize(function() {
    db
      .prepare("SELECT tel, answer, options FROM guest_hometowns WHERE tel = ?", number)
      .get(function(err, row) {
          if (err) throw err;
          console.log(row.number, + ":" + row.answer + "::" + row.options);
        }
      })
      .finalize();
}
