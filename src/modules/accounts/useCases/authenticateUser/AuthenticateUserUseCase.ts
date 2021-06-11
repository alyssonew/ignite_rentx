import { compare } from 'bcryptjs'
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { sign } from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError";
import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest{
  email: string;
  password: string;

}

interface IResponse{
  user: {
    name: string,
    email: string
  },
  token:string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
    
  ){}


  async execute({ email, password }: IRequest): Promise<IResponse>{
    //USuário exsite
    const user = await this.usersRepository.findByEmail(email)
    const {expires_refresh_token_days, expires_in_token, expires_in_refresh_token, secret_refresh_token, secret_token } = auth
    if (!user){
      throw new AppError("Email or password incorrect")
    }

    const passwordMatch =await compare(password, user.password)

    //senha está correta
    if (!passwordMatch){
      throw new AppError("Email or password incorrect")
    }
    //GErar jsonwebtoken

    const token = sign({}, secret_token,{
      subject: user.id,
      expiresIn: expires_in_token
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)
  
    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: refresh_token,
      expires_date: refresh_token_expires_date
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name:user.name,
        email: user.email
      },
      refresh_token
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }