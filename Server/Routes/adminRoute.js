import express from 'express';

import { adminSignupAuth } from '../Auth/adminSignupAuth.js';
import { adminLoginAuth } from '../Auth/adminLoginAuth.js';

import { adminSignupController } from '../Controller/adminSignupController.js';
import { adminloginController } from '../Controller/adminLoginController.js';

const router = express.Router();

router.post("/signup", adminSignupAuth, adminSignupController);
router.post("/login", adminLoginAuth, adminloginController)


export default router;
