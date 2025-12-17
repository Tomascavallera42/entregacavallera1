import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const generateMockUsers = async (quantity) => {
  const users = [];
  const hashedPassword = await bcrypt.hash("coder123", 10);

  for (let i = 0; i < quantity; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: []
    });
  }

  return users;
};

export const generateMockPets = (quantity) => {
  const pets = [];

  for (let i = 0; i < quantity; i++) {
    pets.push({
      name: faker.animal.petName(),
      species: faker.animal.type(),
      age: faker.number.int({ min: 1, max: 15 })
    });
  }

  return pets;
};
