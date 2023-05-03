describe("Signup", () => {
  beforeEach(() => {
    cy.task("init:db");
    cy.request("POST", "/api/login", {
      username: "test",
      password: "salasana",
    });
  });
});
