const express = require('express');
const mysql = require('mysql');
const path = require('path');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'login'
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/registrazione.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.post('/', (req, res) => {
  const { username, password, nome, cognome } = req.body;

  const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUsernameQuery, [username], (err, results) => {
    if (err) {
      console.error('Errore durante la verifica dell\'username nel database', err);
      return res.status(500).send('Errore del server');
    }

    if (results.length > 0) {
      return res.send('L\'username esiste già. Scegli un altro username.');
    }

    const insertUserQuery = 'INSERT INTO users (username, password, nome, cognome) VALUES (?, ?, ?, ?)';
    db.query(insertUserQuery, [username, password, nome, cognome], (err) => {
      if (err) {
        console.error('Errore durante l\'inserimento dell\'utente nel database', err);
        return res.status(500).send('Errore del server');
      }

      return res.send('<script>alert("registrazione effettuata con successo");</script>');
    });
  });
});

app.post('/login', (req, res) => {
  const { loginUsername, loginPassword } = req.body;

  const checkLoginQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(checkLoginQuery, [loginUsername, loginPassword], (err, results) => {
    if (err) {
      console.error('Errore durante la verifica delle credenziali nel database', err);
      return res.status(500).send('Errore del server');
    }

    if (results.length > 0) {
      return res.redirect('/public/shop.html');
    }

    res.send('Credenziali non valide. Riprova.');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
  