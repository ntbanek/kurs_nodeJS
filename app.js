const functions = require('./functions');

functions.sayHello(); //wywołanie funkcji
functions.add(2,3);

//tak raczej nie robimy, bo używamy expressa:

/*
const http = require('http');

const handler = (req, res) => { // w tej funkcji jesteśmy w stanie wysłać jakieś wiadomości na front
    console.log('wiadomość');
}
//Za każdym razem jak odświeżymy stronę wywołuje się calback createServera który możemy sobie napisać - jest to handler
const server = http.createServer(handler); //mamy tutaj callbacka do createServer
const port = 3300;

server.listen(port, (err) => {
    console.log(`Serwer działa na porcie ${port}`)
    if(err) {
        return console.log(`Błąd ${err}`)
    }
})

*/

const express = require('express');
const port = process.env.PORT || 3300;
const app = express();
const path = require('path')

app.set('view engine', 'hbs');

app.use('/assets', express.static(path.join(__dirname, "./assets")));
app.use('/js', express.static(path.join(__dirname, "./js")));
app.use('/images', express.static(path.join(__dirname, './images'))); 


app.listen(port, err => {
    if(err) {
        return(console.log(`Błąd ${err}`))
    }
    console.log(`Strona działa na porcie ${port}`);
});

app.get('/', (req,res) => {
    res.render("index", {
        pageTitle: "Zajęcia dotyczące NodeJS",
        result: functions.add(10,15)
    });
}); // WAŻNE: przekazywanie zmiennych z backendu do frontendu!!!

app.get('/about', (req,res) => { // ustawianie endpointów
    res.render("about") // renderuje z hbsa
})

app.get('/katowice', (req,res) => { 
    res.send('<h1>Strona o Katowicach</h1>')
})