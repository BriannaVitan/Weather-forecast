import { v4 as uuid } from 'uuid'; 
import fs from 'fs/promises'; 

// Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuid(); 
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
// Define a read method that reads from the searchHistory.json file

  private async read() {
  return await fs.readFile('./db/db.json', {
    flag: 'a+',
    encoding: 'utf8',
  });
}

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('./db/db.json', JSON.stringify(cities, null, '\t'));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];

      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }
      return parsedCities;
    });
  }

  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
      if (!city) {
        throw new Error('City cannot be blank');
    }
    const newCity: City = { name: city, id: uuid() };

    return await this.getCities()
    .then((Cities) => {
      if (Cities.find((currentCity) => currentCity.name === city)) {
        return Cities;
      }
      return [...Cities, newCity];
    })
    .then((updatedCities) => this.write(updatedCities))
    .then(() => newCity);
}


  // Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities()
    .then((cities) => cities.filter((city) => city.id !==id))
    .then((filteredCities) => this.write(filteredCities));
  }
}
export default new HistoryService();