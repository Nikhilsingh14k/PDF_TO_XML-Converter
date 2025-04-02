import express from 'express';
import { getProfile, loginUser, registerUser, saveConversionHistory,deleteHistory ,loadPage} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import multer from 'multer';
const userRouter = express.Router();

const upload = multer({ dest: 'uploads/' });

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/save-history', authUser, upload.single('file'), saveConversionHistory);  
userRouter.post('/delete-history', authUser, deleteHistory);
userRouter.get('/get-xml', authUser,loadPage );

export default userRouter;
