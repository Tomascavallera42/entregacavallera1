import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Tests funcionales Adoption Router", () => {

  it("GET /api/adoptions", async () => {
    const res = await requester.get("/api/adoptions");
    expect(res.status).to.equal(200);
  });

  it("POST /api/adoptions OK", async () => {
    const res = await requester.post("/api/adoptions").send({
      userId: "testUser",
      petId: "testPet"
    });
    expect(res.status).to.not.equal(500);
  });

  it("POST /api/adoptions error", async () => {
    const res = await requester.post("/api/adoptions").send({});
    expect(res.status).to.equal(400);
  });

});
