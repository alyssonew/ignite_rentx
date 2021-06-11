import "reflect-metadata";

import "@shared/container/providers"

import { container } from "tsyringe"

import  { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import  { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { ICategoryRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepositories";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";



// ICategoriesRepository
container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)


container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)