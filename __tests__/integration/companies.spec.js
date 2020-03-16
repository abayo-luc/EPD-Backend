import request from "../helpers/request";
import getJWT from "../helpers/getJWT";
import db from "../../src/models";

const { User, Company } = db;
describe("#Companies", () => {
  let tokens;
  let company;
  beforeAll(async () => {
    tokens = await getJWT();
    company = await Company.create({
      name: `I&M Ltd`,
      email: `info@iandm.com`,
      address: "KG 11 Av",
      phoneNumber: `0789211276`
    });
  });
  describe("GET /companies", () => {
    ["admin", "superAdmin"].forEach(role => {
      it(`should allow ${role} to view all companies`, () => {
        return request
          .get("/api/companies")
          .set("Authorization", `Bearer ${tokens[role].token}`)
          .then(res => {
            const { data } = res.body;
            expect(res.status).toEqual(200);
            expect(data).toBeInstanceOf(Array);
          });
      });
    });
    ["agent", "supervisor"].forEach(role => {
      it(`should not let ${role} to view all companies`, () => {
        return request
          .get("/api/companies")
          .set("Authorization", `Bearer ${tokens[role].token}`)
          .then(res => {
            expect(res.status).toEqual(401);
          });
      });
    });
  });
  describe("POST /companies", () => {
    ["admin", "superAdmin"].forEach((role, index) => {
      it(`should allow ${role} to create a new company`, () => {
        return request
          .post("/api/companies")
          .send({
            name: `ABC ${role}`,
            email: `info@abc${role}.com`,
            address: "KG 11 Av",
            phoneNumber: `07331389${(index + 1) * 10}`
          })
          .set("Authorization", `Bearer ${tokens[role].token}`)
          .then(res => {
            const { data } = res.body;
            expect(res.status).toEqual(201);
            expect(data.name).toEqual(`ABC ${role}`);
          });
      });
    });
    ["agent", "supervisor"].forEach((role, index) => {
      it(`should not let ${role} add a new company`, () => {
        return request
          .post("/api/companies")
          .send({
            name: `ABC ${role}`,
            email: `info@abc${role}.com`,
            address: "KG 11 Av",
            phoneNumber: `07331389${(index + 1) * 10}`
          })
          .set("Authorization", `Bearer ${tokens[role].token}`)
          .then(res => {
            expect(res.status).toEqual(401);
          });
      });
    });
  });
  describe("GET /companies/:id", () => {
    it("should allow supervisor to access their company", async () => {
      return request
        .get(`/api/companies/${tokens.supervisor.companyId}`)
        .set("Authorization", `Bearer ${tokens.supervisor.token}`)
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it("should allow agent to access their company", async () => {
      const agent = await User.findByPk(tokens.agent.id);
      agent.companyId = company.id;
      await agent.save({ fields: ["companyId"] });
      return request
        .get(`/api/companies/${company.id}`)
        .set("Authorization", `Bearer ${tokens.agent.token}`)
        .then(res => {
          const { data } = res.body;
          expect(res.status).toEqual(200);
          expect(data.id).toEqual(company.id);
        })
        .then(async () => {
          agent.companyId = null;
          await agent.save({ fields: ["companyId"] });
        });
    });
  });
});
