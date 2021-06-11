import { ResetPassowordController } from "@modules/accounts/useCases/resetPasswordUser/ResetPassowordController";
import { SendForgotPassowordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPassowordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPassowordMailController()
const resetPasswordController = new ResetPassowordController()

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle)
passwordRoutes.post("/reset", resetPasswordController.handle)


export { passwordRoutes }