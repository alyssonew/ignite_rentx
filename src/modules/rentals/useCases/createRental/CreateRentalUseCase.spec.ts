import dayjs from "dayjs"

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsReporitoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {

  const dayAdd24Hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsReporitoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayJsDateProvider = new DayjsDateProvider() 
    createRentalUseCase = new CreateRentalUseCase(rentalsReporitoryInMemory, 
      dayJsDateProvider,
      carsRepositoryInMemory)
  })


  it("should be able to create a new Rental", async ()=>{

    const car = await carsRepositoryInMemory.create({
      name: "TEste",
      description: "Cart Test",
      daily_rate: 100,
      license_plate: "teste",
      fine_amount: 40,
      category_id: "12345",
      brand: "brand"
    })

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a new Rental if there is another open to the same user", async ()=>{
  
    await rentalsReporitoryInMemory.create(({
     car_id: "11111",
     expected_return_date: dayAdd24Hours,
     user_id: "12345"
    }))

    await expect(createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      })  
    ).rejects.toEqual(new AppError("There's a rental in progress for this user"))
 
  })


  
  it("should not be able to create a new Rental if there is another open to the same car", async ()=>{

    await rentalsReporitoryInMemory.create(({
      car_id: "test",
      expected_return_date: dayAdd24Hours,
      user_id: "12345"
     }))

    await expect(createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: dayAdd24Hours,
      })  
    ).rejects.toEqual(new AppError("Car is unvailable"))
  })


  it("should not be able to create a new Rental with invalid return time", async ()=>{

   await expect(createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
  
    ).rejects.toEqual(new AppError("Invalid return time!"))
 
  })

})