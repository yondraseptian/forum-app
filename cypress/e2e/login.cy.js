/* eslint-disable no-undef */
/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("should display login page correctly", () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Password"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });

  it("should display alert when email is empty", () => {
    cy.get("button")
      .contains(/^Login$/)
      .click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi Email
    cy.get('input[placeholder="Email"]').type('testuser');
 
    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();
 
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when Email and password are wrong', () => {
    // mengisi Email
    cy.get('input[placeholder="Email"]').type('testuser');
 
    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('wrong_password');
 
    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();
 
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });

  it('should display homepage when Email and password are correct', () => {
    // mengisi Email
    cy.get('input[placeholder="Email"]').type('testuser');
 
    // mengisi password
    cy.get('input[placeholder="Password"]').type('test123456');
 
    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();
 
    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.url().should('include', '/');
  });
});
