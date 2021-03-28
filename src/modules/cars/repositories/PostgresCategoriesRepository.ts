import { Category } from "../model/Category";
import { ICategoryRepository, ICreteCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoryRepository {
  findByName(name: string): Category {
    console.log(name)
    return null;
    throw new Error("Method not implemented.");
  }
  list(): Category[] {
     return null;
  }
  create({name, description }:ICreteCategoryDTO): void {
    console.log(name, description);
  }
}

export { PostgresCategoriesRepository }