const express = require('express');
const router = express.Router();

const book = require('../controllers/book.controller');

router.get('/', book.getBooks);
router.post('/', book.createBook);
router.get('/:id', book.getBook);
router.put('/:id', book.editBook);
router.delete('/:id', book.deleteBook);
router.post('/getBookByTitle', book.getBookByTitle);
router.post('/getBookByKeywords', book.getBookByKeywords);
router.post('/getBookByTopics', book.getBookByTopics);
router.post('/getBookMaxLoan', book.getBookMaxLoan);
router.post('/getBookMaxSearch', book.getBookMaxSearch);

module.exports = router;