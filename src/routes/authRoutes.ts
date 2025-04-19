import express from 'express';
import { signup, updatePassword, login } from '../controllers/authController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.post('/signup', signup);

// login 
router.post('/login', login);

// update password 
router.put('/updatePassword', updatePassword)

export default router;
