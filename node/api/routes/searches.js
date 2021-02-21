const express = require('express');
const router = express.Router();
const { getSearches, saveWeatherSearch, getUserById } = require('../controllers/search')


router.get('/getSearches', getSearches)
router.post('/saveWeatherSearch', saveWeatherSearch)
router.post('/getUserById', getUserById)






module.exports = router;