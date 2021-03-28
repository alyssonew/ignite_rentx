import { Category } from "../model/Category";

interface ICreteCategoryDTO {
  name: string,
  description: string;
}

interface ICategoryRepository{
  findByName(name: string): Category;
  list(): Category[];

  create({name, description }: ICreteCategoryDTO): void;
 

}

export { ICategoryRepository, ICreteCategoryDTO }