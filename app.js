const express = require('express');

//express app
const app = express();

//register view engine
app.set('view engine','ejs');

//static files
app.use(express.static('public'));

//listen for requests
app.listen(3000);

app.get('/', (req,res) =>{
    res.render('index' , {title : 'Home'});
});

app.get('/login', (req,res) =>{
    res.render('login' , {title : 'Login'});
});

app.get('/profile', (req,res) =>{
    res.render('profile' , {title : 'Profile'});
});

app.get('/about', (req,res) =>{
    res.render('about' , {title : 'About us'});
});

//redirect
app.get('/about-us' , (req , res) => {
    res.redirect('/about');
});

app.get('/index' , (req , res) => {
    res.redirect('/');
});

//404
app.use((req,res) =>{
    res.status(404).render('404' , {title : '404 - Not Found'});
});