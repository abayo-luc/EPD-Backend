import faker from "faker";
import request from "../helpers/request";
import getJWT from "../helpers/getJWT";
import db from "../../src/models";

const { User, Company } = db;

describe("#Users", () => {
  let tokens;
  beforeAll(async () => {
    tokens = await getJWT();
  });
  describe("GET /users", () => {
    ["get", "post"].forEach(method => {
      it("should return authentication error", () => {
        return request[method]("/api/users").then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(401);
          expect(error.message).toEqual("Authentication failed.");
        });
      });
    });

    [("superAdmin", "admin")].forEach(role => {
      it(`should allow ${role} to access all users`, () => {
        return request
          .get("/api/users")
          .set("Authorization", `Bearer ${tokens[role].token}`)
          .then(res => {
            const { data } = res.body;
            expect(res.status).toEqual(200);
            expect(data).toBeInstanceOf(Array);
            expect(data.length).toBeDefined();
          });
      });
    });

    ["supervisor", "agent"].forEach(role => {
      it(`should allow ${role} to access all users`, () => {
        return request
          .get("/api/users")
          .set("Authorization", `Bearer ${tokens[role].token}`)
          .then(res => {
            const {
              error: { message }
            } = res.body;
            expect(res.status).toEqual(401);
            expect(message).toEqual("Authorization failed.");
          });
      });
    });
  });
  describe("POST /users", () => {
    it(`should not allow agent to create a new user`, () => {
      return request
        .post("/api/users")
        .set("Authorization", `Bearer ${tokens.agent.token}`)
        .then(res => {
          const {
            error: { message }
          } = res.body;
          expect(res.status).toEqual(401);
          expect(message).toEqual("Authorization failed.");
        });
    });

    ["admin", "superAdmin"].forEach((role, index) => {
      it(`should allow ${role} to create a new user and assign role`, () => {
        return request
          .post("/api/users")
          .send({
            username: faker.internet.userName().substr(0, 5),
            phoneNumber: `07221397${(index + 1) * 10}`,
            password: "password",
            role: "admin"
          })
          .set("Authorization", `Bearer ${tokens[role].token}`)
          .then(res => {
            const { data } = res.body;
            expect(res.status).toEqual(201);
            expect(data.password).not.toBeDefined();
          });
      });
    });
    it(`should return validation error`, () => {
      return request
        .post("/api/users")
        .send()
        .set("Authorization", `Bearer ${tokens.admin.token}`)
        .then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(400);
          expect(error.phoneNumber).toEqual("phoneNumber is required");
        });
    });
    it("should return validation error on invalid username", () => {
      return request
        .post("/api/users")
        .send({
          username: "lu",
          phoneNumber: "0722139797",
          password: "password"
        })
        .set("Authorization", `Bearer ${tokens.admin.token}`)
        .then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(400);
          expect(error.username).toEqual(
            "username length must be at least 3 characters long"
          );
        });
    });
    it("should return validation error on invalid username", () => {
      return request
        .post("/api/users")
        .send({
          username: "luc23",
          phoneNumber: "072213",
          password: "password"
        })
        .set("Authorization", `Bearer ${tokens.admin.token}`)
        .then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(400);
          expect(error.phoneNumber).toEqual("Invalid phone number");
        });
    });
    it("should fail on existing username", async () => {
      const user = await User.create({
        username: "testOne1",
        phoneNumber: "0722112346",
        password: "password"
      });
      return request
        .post("/api/users")
        .send({
          username: user.username,
          password: "password",
          phoneNumber: "0722112348"
        })
        .set("Authorization", `Bearer ${tokens.admin.token}`)
        .then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(400);
          expect(error.username).toEqual("Username is already taken");
        });
    });
    it("should fail on existing username", async () => {
      const user = await User.create({
        username: "testOne2",
        phoneNumber: "0722112345",
        password: "password"
      });
      return request
        .post("/api/users")
        .send({
          username: "testOne3",
          password: "password",
          phoneNumber: user.phoneNumber
        })
        .set("Authorization", `Bearer ${tokens.admin.token}`)
        .then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(400);
          expect(error.phoneNumber).toEqual("PhoneNumber is already taken");
        });
    });
  });

  describe("GET /users", () => {
    ["superAdmin", "admin", "agent", "supervisor"].forEach(role => {
      it(`should allow ${role} to get his profile`, () => {
        return request
          .get(`/api/users/${tokens[role].id}`)
          .set("Authorization", `Bearer ${tokens[role].token}`)
          .then(res => {
            const { data } = res.body;
            expect(res.status).toEqual(200);
            expect(data.id).toEqual(tokens[role].id);
            expect(data.role).toEqual(role);
          });
      });
    });

    it(`should allow supervisor to access other agent's data`, async () => {
      const user = await User.create({
        username: faker.internet.userName(),
        phoneNumber: faker.phone.phoneNumberFormat(3),
        password: "password",
        companyId: tokens.supervisor.companyId
      });
      return request
        .get(`/api/companies/${tokens.supervisor.companyId}/users/${user.id}`)
        .set("Authorization", `Bearer ${tokens.supervisor.token}`)
        .then(res => {
          const { data } = res.body;
          expect(res.status).toEqual(200);
          expect(data.username).toEqual(user.username);
        });
    });
    it("should not allows supervisor to access other company agent data", async () => {
      const company = await Company.create({
        name: faker.company.companyName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        phoneNumber: "0723165477"
      });
      const user = await User.create({
        username: faker.internet.userName(),
        phoneNumber: "0723165476",
        password: "password",
        companyId: company.id
      });
      return request
        .get(`/api/companies/${company.id}/users/${user.id}`)
        .set("Authorization", `Bearer ${tokens.supervisor.token}`)
        .then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(401);
          expect(error.message).toEqual("Authorization failed.");
        });
    });
    it("should return error on invalid user id", () => {
      return request
        .get(`/api/users/hello-world`)
        .set("Authorization", `Bearer ${tokens.admin.token}`)
        .then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(400);
          expect(error.message).toEqual("Invalid id");
        });
    });
  });

  describe("PUT /users", () => {
    ["superAdmin", "admin", "agent", "supervisor"].forEach(role => {
      it(`should allow ${role} to get his profile`, () => {
        return request
          .put(`/api/users/${tokens[role].id}`)
          .send({
            username: `agentDefault${role}`
          })
          .set("Authorization", `Bearer ${tokens[role].token}`)
          .then(res => {
            const { data } = res.body;
            expect(res.status).toEqual(200);
            expect(data.username).toEqual(`agentDefault${role}`);
          });
      });
    });
    it(`should not allow supervisor to update agent profile`, () => {
      return request
        .put(`/api/users/${tokens.agent.id}`)
        .send({
          name: `agent`
        })
        .set("Authorization", `Bearer ${tokens.supervisor.token}`)
        .then(res => {
          expect(res.status).toEqual(401);
        });
    });
    it("should return error on invalid user id", () => {
      return request
        .put(`/api/users/hello-world`)
        .send({ username: "hello" })
        .set("Authorization", `Bearer ${tokens.admin.token}`)
        .then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(400);
          expect(error.message).toEqual("Invalid id");
        });
    });
  });

  describe("PUT /users/:id/passwords", () => {
    it(`should allow user to update password`, () => {
      return request
        .put(`/api/users/${tokens.agent.id}/passwords`)
        .send({
          password: "password"
        })
        .set("Authorization", `Bearer ${tokens.agent.token}`)
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    it(`should allow admin to update user password`, () => {
      return request
        .put(`/api/users/${tokens.agent.id}/passwords`)
        .send({
          password: `password`
        })
        .set("Authorization", `Bearer ${tokens.admin.token}`)
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it(`should allow user to update password`, () => {
      return request
        .put(`/api/users/${tokens.agent.id}/passwords`)
        .send()
        .set("Authorization", `Bearer ${tokens.admin.token}`)
        .then(res => {
          const { error } = res.body;
          expect(res.status).toEqual(400);
          expect(error.password).toEqual("User.password cannot be null");
        });
    });
  });
});
