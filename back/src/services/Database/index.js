const RoleService = require("../Role");
const UserService = require("../User");
const { faker } = require("@faker-js/faker");

class DatabaseService {
  constructor() {
    this.roleService = new RoleService();
    this.userService = new UserService();
  }
    /**
   * @description Create mandatory roles
   */
    async createMandatoryRoles() {
      const roles = [
        {
          name: "user",
        },
        {
          name: "admin",
        },
      ];

      for (let i = 0; i < roles.length; i++) {
        await this.roleService.create(roles[i]);
      }

      return true;
    }

  /**
   * @description Create mandatory users
   */
  async createMandatoryUsers() {
    const users = [
      {
        email: "root@root.com",
        firstname: "root",
        lastname: "root",
        username: "root",
        password: "root",
        phone: "0606060606",
        address: "1 rue de la paix",
        city: "Marseille",
        role_id: 2,
      },
      {
        email: "cyril.bancq@epitech.eu",
        firstname: "Cyril",
        lastname: "Bancq",
        username: "cyril.bancq",
        password: "cyril",
        phone: "0606060606",
        address: "1 rue de la paix",
        city: "Marseille",
        role_id: 2,
      },
      {
        email: "anais.meirone@epitech.eu",
        firstname: "Anais",
        lastname: "Meirone",
        username: "anais.meirone",
        password: "anais",
        phone: "0606060606",
        address: "1 rue de la paix",
        city: "Marseille",
        role_id: 2,
      },
      {
        email: "issam.hadjal@epitech.eu",
        firstname: "Issam",
        lastname: "Hadjal",
        username: "issam.hadjal",
        password: "issam",
        phone: "0606060606",
        address: "1 rue de la paix",
        city: "Marseille",
        role_id: 2,
      },
      {
        email: "samuel.cadau@epitech.eu",
        firstname: "Samuel",
        lastname: "Cadau",
        username: "samuel.cadau",
        password: "samuel",
        phone: "0606060606",
        address: "1 rue de la paix",
        city: "Marseille",
        role_id: 2,
      },
      {
        email: "aaron.amar@epitech.eu",
        firstname: "Aaron",
        lastname: "Amar",
        username: "aaron.amar",
        password: "aaron",
        phone: "0606060606",
        address: "1 rue de la paix",
        city: "Marseille",
        role_id: 2,
      },
    ];

    for (let i = 0; i < users.length; i++) {
      await this.userService.create(users[i]);
    }

    for (let i = 0; i < 100; i++) {
      await this.userService.create({
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        role_id: 1,
      });
    }

    return true;
  }

}

module.exports = DatabaseService;
