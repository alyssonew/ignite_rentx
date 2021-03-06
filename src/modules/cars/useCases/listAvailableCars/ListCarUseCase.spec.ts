import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarUseCase } from "./ListAvailableCarsUseCase"

let listCarsUseCase: ListAvailableCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarUseCase(carsRepositoryInMemory);
  })

  it("sould be able to list all avaiable cars", async () => {

   const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id"
    })
    
    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

    it("should be able to list all available cars by brand", async() => {
      const car = await carsRepositoryInMemory.create({
        name: "Car2",
        description: "Car description",
        daily_rate: 110,
        license_plate: "DEF-1234",
        fine_amount: 40,
        brand: "Car_brand_test",
        category_id: "category_id"
      })
      
      const cars = await listCarsUseCase.execute({
        brand: "Car_brand_test",
      })

      expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by name", async() => {
      const car = await carsRepositoryInMemory.create({
        name: "Car3",
        description: "Car description",
        daily_rate: 110,
        license_plate: "DEF-12345",
        fine_amount: 40,
        brand: "Car_name_test",
        category_id: "category_id"
      })
      
      const cars = await listCarsUseCase.execute({
        name: "Car3",
      })

      expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by category", async() => {
      const car = await carsRepositoryInMemory.create({
        name: "Car2",
        description: "Car description",
        daily_rate: 110,
        license_plate: "DEF-1234",
        fine_amount: 40,
        brand: "Car_brand_test",
        category_id: "12345"
      })
      
      const cars = await listCarsUseCase.execute({
        category_id: "12345",
      })

      expect(cars).toEqual([car])
    })
    
})