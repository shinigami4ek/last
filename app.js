var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    University = require('./models/university'),
    Kategori = require('./models/categories');

mongoose.connect("mongodb://localhost/webProject");
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
/*
university.find({}, function (err, uni) {
    if (err) {
        console.log(err);
    } else {
        console.log("****************KULLANICILAR***************");
        uni.forEach(function(uni){
            console.log(uni.universityName);
            console.log(uni.country);
            console.log(uni.categories);
            console.log("*******");            
        })
    }
}) */



app.get('/', function (req, res) {
    Kategori.find({}, function (err, sonuc) {
        if (err) {
            console.log(err);
        } else {
            University.find({}, function (err, universite) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('index', { kategoriler: sonuc, universiteler: universite });
                }
            })
        }
    })
})

app.get('/categories/:get', function (req, res) {
    var get = req.params.get;
    University.find({ 'kategori': get }, function (err, sonuc) {
        if (err) {
            console.log(err);
        } else {
            Kategori.find({}, function (err, cat) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('categories', { universiteler: sonuc, kategoriler: cat });
                }
            })


        }
    })
})
app.post('/categories', function (req, res) {
    var kategori = req.body.kategori;
    var universite = req.body.universite;
    University.find({adi: universite, kategori: kategori},function(err,donenSonuc){
        if (err) {
            console.log(err);
        } else {
            Kategori.find({},function(err,kategori){
                if (err) {
                    console.log(err);
                } else {
                    res.render('categories', { universiteler: donenSonuc, kategoriler: kategori });
                }
            })
           
        }
    })
})

// ADD NEW CATEGORY
app.post('/kategori/new', function (req, res) {
    var kategoriAdi = req.body.kategoriAdi;
    var yeniKategori = { kategoriAdi: kategoriAdi };
    Kategori.create(yeniKategori, function (err, yeniEkle) {
        if (err) {
            console.log(err);
        } else {
            console.log('Yeni Kategori Eklendi ' + yeniEkle.kategoriAdi);
            res.redirect('/kategori/new');
        }
    })
})
app.get('/kategori/new', function (req, res) {
    res.render('newcategory');
})
// END ADD CATEGORY

app.get('/home', function (req, res) {
    University.find({}, function (err, universite) {
        if (err) {
            console.log(err);
        } else {
            Kategori.find({}, function (err, kategoriler) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('home', { universiteler: universite, kategoriler: kategoriler })
                }
            })
        }
    })
})

app.get('/home/new', function (req, res) {
    res.render('new');
})
// ADD UNIVERSITY
app.post('/home', function (req, res) {
    var universiteKategorisi = req.body.universiteKategorisi;
    var universiteAdi = req.body.universiteAdi;
    var universiteBölümü = req.body.universiteBolumu;
    var universiteSehir = req.body.universiteSehir;
    var universiteÜlke = req.body.universiteUlke;
    var universiteSüre = req.body.universiteSure;
    var universiteFiyat = req.body.universiteFiyat;
    var universiteAciklama = req.body.universiteAciklama;
    var yeniUniversite = {
        kategori: universiteKategorisi,
        adi: universiteAdi,
        bolum: universiteBölümü,
        sehir: universiteSehir,
        ulke: universiteÜlke,
        sure: universiteSüre,
        fiyat: universiteFiyat,
        aciklama: universiteAciklama
    };
    University.create(yeniUniversite, function (err, yeniEkle) {
        if (err) {
            console.log(err);
        } else {
            console.log('Yeni Üniversite Eklendi ' + yeniEkle.adi);
            res.redirect('/home');
        }
    })
})


var server = app.listen(3000, function () {
    console.log("Server Port: %d", server.address().port);
})