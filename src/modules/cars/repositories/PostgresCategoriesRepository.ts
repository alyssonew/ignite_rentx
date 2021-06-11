import { AppError } from "../../../shared/errors/AppError";
import { Category } from "../infra/typeorm/entities/Category";
import { ICategoryRepository, ICreteCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoryRepository {
  findByName(name: string): Promise<Category>{
   // console.log(name)
    //return null;
    throw new AppError("Method not implemented.");
  }
  list(): Promise<Category[]> {
     return null;
  }
  create({name, description }:ICreteCategoryDTO): Promise<void> {
    console.log(name, description);

    return null;
  }
}

export { PostgresCategoriesRepository }