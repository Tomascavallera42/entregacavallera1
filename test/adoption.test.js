import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import User from "../src/models/User.js";
import Pet from "../src/models/Pet.js";
import Adoption from "../src/models/Adoption.js";

const expect = chai.expect;
const request = supertest(app);

describe("Adoption Router Functional Tests", () => {

  let user;
  let pet;
  let adoption;

  before(async () => {
    await mongoose.connect("mongodb://localhost:27017/adoptionDB_test");

    await User.deleteMany({});
    await Pet.deleteMany({});
    await Adoption.deleteMany({});

    user = await User.create({
      first_name: "Test",
      last_name: "User",
      email: "test@test.com",
      password: "123",
      role: "user"
    });

    pet = await Pet.create({
      name: "Firulais",
      species: "Dog",
      age: 3
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("POST /api/adoptions should create adoption", async () => {
    const res = await request.post("/api/adoptions").send({
      userId: user._id,
      petId: pet._id
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");

    adoption = res.body;
  });

  it("GET /api/adoptions should return array", async () => {
    const res = await request.get("/api/adoptions");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("GET /api/adoptions/:id should return adoption", async () => {
    const res = await request.get(`/api/adoptions/${adoption._id}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
  });

  it("DELETE /api/adoptions/:id should delete adoption", async () => {
    const res = await request.delete(`/api/adoptions/${adoption._id}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("message");
  });

});
