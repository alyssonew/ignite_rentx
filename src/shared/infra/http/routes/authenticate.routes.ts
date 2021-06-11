import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';
import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController()
const refreshTokenControler = new RefreshTokenController()

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenControler.handle)
export { authenticateRoutes }