describe("Signup", () => {
  beforeEach(() => {
    cy.task("init:db");
    cy.request("POST", "/api/login", {
      username: "test",
      password: "salasana",
    });
    cy.visit("/newBoat");
    cy.get("input[name*='boatName']").type("Paatti");
    cy.contains("Create new boat").click();
  });

  it("Logged in user can create a new boat", () => {
    cy.visit("/");
    cy.contains("Start logging").click();
    cy.contains("Create log entry without location").click();
  });
});
