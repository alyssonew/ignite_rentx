import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository{
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licence_plate: string): Promise<Car>;
  findAvailable(brand?: string, 
    category_id?: string, 
    name?: string): Promise<Car[]>;

  findById(id: string): Promise<Car>
  updateAvailable(id: string, status: boolean): Promise<Car>

}

export { ICarsRepository }