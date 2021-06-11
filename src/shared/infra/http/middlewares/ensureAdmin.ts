import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { usersRoutes } from "../routes/users.routes";

export async function ensureAdmin(
  request: Request,
  respose: Response,
  next: NextFunction
){

  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id)

  if (!user.isAdmin){
    throw new AppError("User is not and admin")
  }

  return next()
}