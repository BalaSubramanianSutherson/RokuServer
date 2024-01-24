const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase_controller');

router.get('/', purchaseController.getPurchaseList)
router.post('/update', purchaseController.updatePurchaseContent)


module.exports = router;