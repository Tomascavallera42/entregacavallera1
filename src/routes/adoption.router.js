import { Router } from "express";
import Adoption from "../models/Adoption.js";
import Pet from "../models/Pet.js";
import User from "../models/User.js";


const router = Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 *       500:
 *         description: Error del servidor
 */
router.get("/", async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate("user")
      .populate("pet");

    res.status(200).send(adoptions);
  } catch (error) {
    res.status(500).send({ error: "Error obteniendo adopciones" });
  }
});

/**
 * @swagger
 * /api/adoptions/{id}:
 *   get:
 *     summary: Obtener adopcion por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopcion encontrada
 *       404:
 *         description: Adopcion no encontrada
 */
router.get("/:id", async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id)
      .populate("user")
      .populate("pet");

    if (!adoption) {
      return res.status(404).send({ error: "Adopcion no encontrada" });
    }

    res.status(200).send(adoption);
  } catch (error) {
    res.status(500).send({ error: "Error buscando adopcion" });
  }
});

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crear una nueva adopcion
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               petId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Adopcion creada
 *       400:
 *         description: Datos invalidos
 */
router.post("/", async (req, res) => {
  try {
    const { userId, petId } = req.body;

    const user = await User.findById(userId);
    const pet = await Pet.findById(petId);

    if (!user || !pet) {
      return res.status(400).send({ error: "Usuario o mascota invalida" });
    }

    const adoption = await Adoption.create({
      user: userId,
      pet: petId
    });

    res.status(201).send(adoption);
  } catch (error) {
    res.status(500).send({ error: "Error creando adopcion" });
  }
});

/**
 * @swagger
 * /api/adoptions/{id}:
 *   delete:
 *     summary: Eliminar adopcion
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopcion eliminada
 *       404:
 *         description: No encontrada
 */
router.delete("/:id", async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndDelete(req.params.id);

    if (!adoption) {
      return res.status(404).send({ error: "Adopcion no encontrada" });
    }

    res.status(200).send({ message: "Adopcion eliminada" });
  } catch (error) {
    res.status(500).send({ error: "Error eliminando adopcion" });
  }
});

export default router;
