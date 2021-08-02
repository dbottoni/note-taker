const router = require('express').Router();
const fs = require('fs');
//const { notes } = require('../db/db.json');

//var notesArray = [];

router.get('/notes', (req, res) => {
  fs.readFile('db/db.json', (err,data) => {
    if (err) throw err;

    let notes = JSON.parse(data);

    res.json(notes);
  });
});

router.post('/notes', (req, res) => {
  const note = req.body;
  note.id = notesArray.length.toString();
  notesArray.push(note);

  fs.writeFile("db/db.json", JSON.stringify(notesArray), (err) => {
    if (err) console.log(err);
  });
  res.json(notesArray);
});

router.delete('/notes/:id', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {
    let notes = JSON.parse(data);
    let id = req.params.id;
    let newId = 0;

    notes = notes.filter(currentNotes => {
      return currentNotes.id !==id;
    });
    
    for(currentNotes of notes){
      currentNotes.id = newId.tostring();
      newId++;
    }

    fs.writeFileSync('db/db.json', JSON.stringify(notes), (err) => {
      if (err) throw (err);
      console.log("Note has been deleted")
    });
    res.json(notes);
  });
});


module.exports = router;
