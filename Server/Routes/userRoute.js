import express from 'express';

import { userSignupAuth } from '../Auth/userSignupAuth.js';
import { userLoginAuth } from '../Auth/userLoginAuth.js';
import { userSignupController } from '../Controller/userSignupController.js';
import { userloginController } from '../Controller/userLoginController.js';

const router = express.Router();

router.post("/signup", userSignupAuth, userSignupController);
router.post("/login", userLoginAuth, userloginController);


export default router;
