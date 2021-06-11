import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { table } from "node:console";
import { IRentalsRepository } from "../IRentalRepositories";


class RentalsRepositoryInMemory implements IRentalsRepository{
 
 
  rentals:Rental[] = [];

 async findOpenRentalByCar(cad_id: string): Promise<Rental> {
    return  this.rentals.find(rental => rental.car_id === cad_id && !rental.end_date)
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return  this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
  }

  async create({
    car_id, 
    expected_return_date,
    user_id
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date()
    });

    this.rentals.push(rental)

    return rental
  }
  
  async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.id === id)
  }
 
 async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === user_id)
  }


}

export { RentalsRepositoryInMemory }