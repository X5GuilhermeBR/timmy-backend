const express = require('express');
const MemberController = require('../controllers/MemberController');

const router = express.Router();

router.post('/member', MemberController.createMember);
router.patch('/member/:id', MemberController.toggleMemberStatus);
router.get('/member/:id', MemberController.getMemberById);
router.get('/members', MemberController.getAllMembers);
router.put('/member/:id', MemberController.updateMember);

module.exports = router;
