import { Category } from "../infra/typeorm/entities/Category";

interface ICreteCategoryDTO {
  name: string,
  description: string;
}

interface ICategoryRepository{
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;

  create({name, description }: ICreteCategoryDTO): Promise<void>;
 

}

export { ICategoryRepository, ICreteCategoryDTO }