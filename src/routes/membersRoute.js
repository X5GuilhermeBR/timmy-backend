const express = require('express');
const MemberController = require('../controllers/MemberController');

const router = express.Router();

router.post('/member', MemberController.createMember);
router.patch('/member/:id', MemberController.deactivateMember);
router.get('/members', MemberController.getAllMembers);

module.exports = router;
