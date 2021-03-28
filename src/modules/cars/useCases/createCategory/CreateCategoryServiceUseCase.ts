import { ICategoryRepository } from "../../repositories/ICategoriesRepository";


interface IRequest{
  name: string;
  description?: string;
}

/*
[] Definir o tipo de retorno
[x] Alterar o retorno de erro
[] Acessar o repositório

*/
class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository){

  }
  
  execute({ name, description }: IRequest): void {

    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
     throw new Error("Categoy already exists!")
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }