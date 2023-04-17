describe("Signup", () => {
  beforeEach(() => {
    cy.task("init:db");
    cy.request("POST", "/api/login", {
      username: "test",
      password: "salasana",
    });
  });

  it("Logged in user can create a new boat", () => {
    cy.visit("/");
    cy.contains("test").click();
    cy.contains("Add a new boat").click();
    cy.get("input[name*='boatName']").type("Paatti");
    cy.contains("Create new boat").click();
    cy.contains("Owner");
  });
});
