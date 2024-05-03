import express from 'express';
import SignUp from '../Controller/SignUp.js';
import Login from '../Controller/Login.js';
import userVerification from '../Middleware/AuthorisationCheck.js';
const router = express.Router();

router.post('/', userVerification);
router.post('/signup', SignUp);
router.post('/login', Login);

export default router;
