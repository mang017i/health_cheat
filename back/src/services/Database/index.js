const RoleService = require("../Role");
const UserService = require("../User");
const CheatService = require("../Cheat");
const CategoryService = require("../Category");
// const BookmarkService = require("../Bookmark");
const { faker } = require("@faker-js/faker");

class DatabaseService {
  constructor() {
    this.roleService = new RoleService();
    this.userService = new UserService();
    this.cheatService = new CheatService();
    this.categoryService = new CategoryService();
    // this.bookmarkService = new BookmarkService();
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
        image: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "cyril.bancq@epitech.eu",
        firstname: "Cyril",
        lastname: "Bancq",
        username: "cyril.bancq",
        password: "cyril",
        image: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "anais.meirone@epitech.eu",
        firstname: "Anais",
        lastname: "Meirone",
        username: "anais.meirone",
        password: "anais",
        image: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "issam.hadjal@epitech.eu",
        firstname: "Issam",
        lastname: "Hadjal",
        username: "issam.hadjal",
        password: "issam",
        image: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "samuel.cadau@epitech.eu",
        firstname: "Samuel",
        lastname: "Cadau",
        username: "samuel.cadau",
        password: "samuel",
        image: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "aaron.amar@epitech.eu",
        firstname: "Aaron",
        lastname: "Amar",
        username: "aaron.amar",
        password: "aaron",
        image: "https://avatars.githubusercontent.com/u/59500000?v=4",
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
        image: faker.image.avatar(),
        role_id: 1,
      });
    }

    return true;
  }
   /**
   * @description Create mandatory categories
   */
   async createMandatoryCategories() {
    const categories = [
      {
        title: "UrinaireCategory",
      },
      {
        title: "PulmonaireCategory",
      },
    ];

    for (let i = 0; i < categories.length; i++) {
      await this.categoryService.create(categories[i]);
    }

    return true;
  }

   /**
   * @description Create mandatory cheats
   */
   async createMandatoryCheats() {
    const cheats = [
      {
        title: "urinaire",
        description: "urinaire",
        image: "urinaire",
        category_id: 1,
      },
      {
        title: "pulmonaire",
        description: "pulmonaire",
        image: "pulmonaire",
        category_id: 2,
      },
    ];

    for (let i = 0; i < cheats.length; i++) {
      await this.cheatService.create(cheats[i]);
    }

    return true;
  }
  // async createMandatoryBookmarks() {
  //   const bookmarks = [
  //     {
  //       cheat_id: 1,
  //       user_id: 1,
  //     },
  //     {
  //       cheat_id: 2,
  //       user_id: 1,
  //     },
  //     {
  //       cheat_id: 1,
  //       user_id: 8,
  //     },
  //     {
  //       cheat_id: 2,
  //       user_id: 17,
  //     },
  //   ];

  //   for (let i = 0; i < bookmarks.length; i++) {
  //     await this.bookmarkService.create(bookmarks[i]);
  //   }

  //   return true;
  // }

}

module.exports = DatabaseService;
