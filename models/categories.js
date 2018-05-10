var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    kategoriAdi: String,
})

module.exports = mongoose.model('categories', categorySchema);