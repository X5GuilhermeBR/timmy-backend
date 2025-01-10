const express = require('express');
const MemberController = require('../controllers/MemberController');

const router = express.Router();

router.post('/member', MemberController.createMember);
router.get('/members', MemberController.getAllMembers);

module.exports = router;
