const {initializeDatabase} = require("../db/db.connect");
const Car = require("./models/cars.model");
initializeDatabase();

// 1. Write a function to create a new car data given below.
const carData = {
  brand: "Ford",
  model: "Mustang",
  year: 2019,
  bodyStyle: "Convertible",
  fuelType: "Gasoline",
  transmission: "Automatic",
  engine: "5.0L V8",
  mileage: 25000,
  color: "Red",
  price: 3500000,
  condition: "Used",
  description: "Exciting Ford Mustang convertible with powerful V8 engine.",
  photos: [
    "https://example.com/mustang-photo1.jpg",
    "https://example.com/mustang-photo2.jpg",
    "https://example.com/mustang-photo3.jpg"
  ]
};

async function createNewCar(newCar){
    try{
        const car = new Car(newCar);
        const saveCar = await car.save();
        console.log("New Car Added: ", saveCar);
    } catch (error){
        throw error;
    }
};
// createNewCar(carData);

// 2. Run the same function to create another car data in the database.
const carData2 = {
  brand: "Honda",
  model: "Civic",
  year: 2018,
  bodyStyle: "Coupe",
  fuelType: "Gasoline",
  transmission: "Manual",
  engine: "1.5L Turbocharged Inline-4",
  mileage: 40000,
  color: "Black",
  price: 1800000,
  condition: "Used",
  description: "Sporty Civic coupe with low mileage and manual transmission.",
  photos: [
    "https://example.com/civic-photo1.jpg",
    "https://example.com/civic-photo2.jpg",
    "https://example.com/civic-photo3.jpg"
  ]
};
// createNewCar(carData2);

// 3. Create a function to read all cars from the database. Console all the cars. Use proper function and variable names.

async function readAllCars(){
    try{
        const allCars = await Car.find();
        console.log("All Cars are: ", allCars);
    } catch (error){
        console.log("Error in Retrieving data: ", error);
    }
}
// readAllCars();

// 4. Create a function to read cars by brand ("Ford"). Console the car details. Use proper function and variable names.
async function readCarsByBrand(brandName){
    try{
        const carsByBrand = await Car.find({brand: brandName});
        console.log(`Cars with ${brandName} Brand : `,carsByBrand);
    } catch(error){
        console.log("Error in Fetching Data: ", error);
    }
}
// readCarsByBrand("Ford");

// 5. Create a function to read cars by color ("Black"). Console the car details. Use proper function and variable names.
async function readCarsByColor(carColor){
    try{
        const carsByColor = await Car.find({color: carColor});
        console.log(`Cars with ${carColor} Color : `, carsByColor);
    } catch(error){
        console.log("Error in Fetching the Data :", error);
    }
}
// readCarsByColor("Black");

// 6. Create a function to update the price of a car with model "Corolla". Update the price to 2300000. Console the car with updated price.
async function updateCarPrice(modelName, newPrice) {
    try {
        const updatedCar = await Car.findOneAndUpdate(
            { model: modelName },
            { price: newPrice },
            { new: true } 
        );
        console.log("Updated Car Price:", updatedCar);
    } catch (error) {
        console.log("Error in Updating Price:", error);
    }
}
// updateCarPrice("Corolla", 2300000);

// 7. Create a function to update the condition of a car with model "Model S". Update the condition to "Used". Console the car with updated condition.
async function updateCarCondition(modelName, newCondition) {
    try {
        const updatedCar = await Car.findOneAndUpdate(
            { model: modelName },
            { condition: newCondition },
            { new: true }
        );
        console.log(`Updated Car Condition:`, updatedCar);
    } catch (error) {
        console.log("Error in Updating Condition:", error);
    }
}
// updateCarCondition("Model S", "Used");

// 8. Create a function to delete a car by ID. Take the id of the car brand Tesla from the database and delete that car record. Console the deleted car data.
async function deleteCarById(carId) {
    try {
        const deletedCar = await Car.findByIdAndDelete(carId);
        console.log("Deleted Car:", deletedCar);
    } catch (error) {
        console.log("Error in Deleting Car:", error);
    }
}
// deleteCarById("68f74e309a1ed8f08aea9556");


// 9. Create a function to delete a car by its body style. Delete the car data with body style "Coupe" from the database console the deleted car data.
async function deleteCarByBodyStyle(bodyStyle) {
    try {
        const deletedCar = await Car.findOneAndDelete({ bodyStyle: bodyStyle });
        console.log("Deleted Car by Body Style:", deletedCar);
    } catch (error) {
        console.log("Error in Deleting Car:", error);
    }
}
deleteCarByBodyStyle("Coupe");
