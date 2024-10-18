const express = require('express');
const { registerUser, loginUser, getUsers, deleteUser, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, getUsers); 
router.delete('/users/:id',protect,deleteUser);
router.put('/users/:id', protect, updateUser);


module.exports = router;
