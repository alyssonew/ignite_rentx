import { Router } from 'express'
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import multer from "multer"
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig)

const createUsersController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUsersController.handle);

usersRoutes.patch("/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"), 
  updateUserAvatarController.handle)

  usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle)
export { usersRoutes }