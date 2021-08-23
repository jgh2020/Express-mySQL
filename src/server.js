// express 모듈 호출
const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5500;

// app.use(bodyParser.json());
// app.use(badyParser.urlencoded({extended:true}));

const fs = require('fs');
const { Server } = require('http');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host, 
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

app.get('/api/wordlist', (req,res) => {
    // res.send();
    connection.query(
        "Select * from wordlist",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
})

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})

// nodemon 설치하면 node서버 리로드 쉽게 할 수 있음
// 설치 : npm install -g nodemon
// 설치 후 : node 대신, nodemon Server.js
