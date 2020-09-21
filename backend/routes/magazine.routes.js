const express = require('express');
const router = express.Router();

const magazine = require('../controllers/magazine.controller');

router.get('/', magazine.getMagazine);
router.post('/', magazine.createMagazine);
router.get('/:id', magazine.getJournal);
router.put('/:id', magazine.editMagazine);
router.delete('/:id', magazine.deleteMagazine);
router.post('/getMagazineByTitle', magazine.getMagazineByTitle);
router.post('/getMagazineByKeywords', magazine.getMagazineByKeywords);
router.post('/getMagazineByTopics', magazine.getMagazineByTopics);
router.post('/getMagazineMaxLoan', magazine.getMagazineMaxLoan);
router.post('/getMagazineMaxSearch', magazine.getMagazineMaxSearch);

module.exports = router;