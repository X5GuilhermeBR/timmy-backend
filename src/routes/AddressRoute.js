const express = require('express');
const AddressController = require('../controllers/AddressController');

const router = express.Router();

router.post('/address', AddressController.create);

module.exports = router;
