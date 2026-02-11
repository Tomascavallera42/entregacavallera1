import { Router } from "express";
import { generateMockUsers, generateMockPets } from "../utils/mocking.js";
import UserModel from "../models/User.js";
import PetModel from "../models/Pet.js";

const router = Router();

router.get("/mockingusers", async (req, res) => {
  const users = await generateMockUsers(50);
  res.status(200).send(users);
});

router.get("/mockingpets", async (req, res) => {
  const pets = generateMockPets(20);
  res.status(200).send(pets);
});

router.post("/generateData", async (req, res) => {
  const { users, pets } = req.body;

  if (!users || !pets) {
    return res.status(400).send({ error: "Faltan parametros" });
  }

  const mockUsers = await generateMockUsers(users);
  const mockPets = generateMockPets(pets);

  await UserModel.insertMany(mockUsers);
  await PetModel.insertMany(mockPets);

  res.status(201).send({
    usersInserted: mockUsers.length,
    petsInserted: mockPets.length
  });
});

export default router;
