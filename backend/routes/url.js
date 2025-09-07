const express = require('express'); 
const router = express.Router(); 

const {generateShortUrl, handlegetAnalytics} = require('../controllers/url'); 
router.post('/', generateShortUrl); 
router.get('/analytics/:shortId', handlegetAnalytics); 

module.exports = router ; 