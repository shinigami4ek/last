var mongoose = require('mongoose');

var universitySchema = new mongoose.Schema({
    disc: String,
    id: String,
    bolum: String,
    sehir: String,
    ulke: String,
    sure: String,
    fiyat: String,
    aciklama: String
})

module.exports = mongoose.model('university', universitySchema);