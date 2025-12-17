import { Router } from "express";
import { generateMockUsers, generateMockPets } from "../utils/mocking.js";
import UserModel from "../models/User.js";
import PetModel from "../models/Pet.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(10);
  res.status(200).json(pets);
});

router.get("/mockingusers", async (req, res) => {
  const users = await generateMockUsers(50);
  res.status(200).json(users);
});

router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).json({ error: "Parametros invalidos" });
    }

    const mockUsers = await generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    await UserModel.insertMany(mockUsers);
    await PetModel.insertMany(mockPets);

    res.status(201).json({
      users,
      pets
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
