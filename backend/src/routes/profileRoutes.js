import express from 'express';
import { getProfile,updateProfile,deleteProfile } from '../controllers/profile.controllers.js';
import { authenticate_token } from '../middleware/auth.js';

const router = express.Router();

router.get('/',authenticate_token,getProfile);
router.put('/',authenticate_token,updateProfile);
router.delete('/',authenticate_token,deleteProfile);

export default router;