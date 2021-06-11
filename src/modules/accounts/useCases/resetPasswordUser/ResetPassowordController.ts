import { passwordRoutes } from "@shared/infra/http/routes/password.routes";
import { Request, Response } from "express"
import { container } from "tsyringe"
import { ResetPassowordUserUseCase } from "./ResetPassowordUserUseCase"

class ResetPassowordController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { token } = request.query;
    const { password } = request.body;
    const resetPasswordUserUseCase = container.resolve(
      ResetPassowordUserUseCase
    )
    await resetPasswordUserUseCase.execute({ token: String(token), password })
    return response.send()
  }



}

export { ResetPassowordController }