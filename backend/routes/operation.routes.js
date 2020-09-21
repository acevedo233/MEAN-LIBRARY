const express = require('express');
const router = express.Router();

const operation = require('../controllers/operation');


router.post('/addOperationBook', operation.addOperationBook);
router.post('/addOperationMagazine', operation.addOperationMagazine);
router.post('/getLoans', operation.getLoan)
router.post('/return', operation.return)

module.exports = router;