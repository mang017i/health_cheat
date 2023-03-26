const RoleService = require("../Role");
const UserService = require("../User");
const CheatService = require("../Cheat");
const CategoryService = require("../Category");
const MaterialService = require("../Material");
// const BookmarkService = require("../Bookmark");
const { faker } = require("@faker-js/faker");

class DatabaseService {
  constructor() {
    this.roleService = new RoleService();
    this.userService = new UserService();
    this.cheatService = new CheatService();
    this.materialService = new MaterialService();
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
        username: "root",
        password: "root",
        avatar: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "cyril.bancq@epitech.eu",
        username: "cyril.bancq",
        password: "cyril",
        avatar: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "anais.meirone@epitech.eu",
        username: "anais.meirone",
        password: "anais",
        avatar: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "issam.hadjal@epitech.eu",
        username: "issam.hadjal",
        password: "issam",
        avatar: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "samuel.cadau@epitech.eu",
        username: "samuel.cadau",
        password: "samuel",
        avatar: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
      {
        email: "aaron.amar@epitech.eu",
        username: "aaron.amar",
        password: "aaron",
        avatar: "https://avatars.githubusercontent.com/u/59500000?v=4",
        role_id: 2,
      },
    ];

    for (let i = 0; i < users.length; i++) {
      await this.userService.create(users[i]);
    }

    for (let i = 0; i < 100; i++) {
      await this.userService.create({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        avatar: faker.image.avatar(),
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
        title: "Cardiologie",
        icon: "cardiology",
        image: "../../public/images/category/cardiologie.jpg",
      },
      {
        title: "Dermatologie",
        icon: "dermatology",
        image: "../../public/images/category/dermatologie.jpg",
      },
      {
        title: "Gastro-Entérologie",
        icon: "gastroenterology",
        image: "../../public/images/category/gastro-entérologie.jpg",
      },
      {
        title: "Hématologie",
        icon: "hematology",
        image: "../../public/images/category/hematologie.jpg",
      },
      {
        title: "Néphrologie",
        icon: "nephrology",
        image: "../../public/images/category/nephrologie.jpg",
      },
      {
        title: "Neurologie",
        icon: "neurology",
        image: "../../public/images/category/neurologie.jpg",
      },
      {
        title: "Odontologie",
        icon: "dentistry",
        image: "../../public/images/category/odontologie.jpg",
      },
      {
        title: "Oncologie",
        icon: "oncology",
        image: "../../public/images/category/oncology.jpg",
      },
      {
        title: "ORL",
        icon: "endocrinology",
        image: "../../public/images/category/orl.jpg",
      },
      {
        title: "Pédiatrie",
        icon: "pediatrics",
        image: "../../public/images/category/pediatrie.jpg",
      },
      {
        title: "Urologie",
        icon: "urology",
        image: "../../public/images/category/urologie.jpg",
      },
    ];

    for (let i = 0; i < categories.length; i++) {
      await this.categoryService.create(categories[i]);
    }

    return true;
  }

  async createMandatoryMaterials() {
    const materials = [
      {
        name: "Valve anti-retour",
        image: "../../public/images/materials/back-check-valve.png",
      },
      {
        name: "Bandage",
        image: "../../public/images/materials/bandage-crepe-coton.png",
      },
      {
        name: "Casaque",
        image: "../../public/images/materials/casaque.png",
      },
      {
        name: "Cathéter",
        image: "../../public/images/materials/catheter.png",
      },
      {
        name: "Charlotte",
        image: "../../public/images/materials/charlotte.png",
      },
      {
        name: "Ciseaux",
        image: "../../public/images/materials/ciseau.png",
      },
      {
        name: "Compresse",
        image: "../../public/images/materials/compresse.png",
      },
      {
        name: "Gants",
        image: "../../public/images/materials/gants.png",
      },
      {
        name: "Glucomètre",
        image: "../../public/images/materials/glucometre.png",
      },
      {
        name: "Masque",
        image: "../../public/images/materials/masque-ffp2.png",
      },
      {
        name: "NaCl 0,9%",
        image: "../../public/images/materials/nacl.png",
      },
      {
        name: "Oxymètre",
        image: "../../public/images/materials/Oxymetre.png",
      },
      {
        name: "Pansements",
        image: "../../public/images/materials/pansements.png",
      },
      {
        name: "Seringue",
        image: "../../public/images/materials/seringue.png",
      },
      {
        name: "Sonde nasale",
        image: "../../public/images/materials/sonde_nasale.png",
      },
      {
        name: "Sonde urinaire",
        image: "../../public/images/materials/sonde_urinaire.png",
      },
      {
        name: "Stéthoscope",
        image: "../../public/images/materials/stethoscope.png",
      },
      {
        name: "Tegaderm",
        image: "../../public/images/materials/tegaderm.png",
      },
      {
        name: "Tensiomètre",
        image: "../../public/images/materials/tensiometre.png",
      },
      {
        name: "Thermomètre",
        image: "../../public/images/materials/thermometre.png",
      },
    ];

    for (let i = 0; i < materials.length; i++) {
      await this.materialService.create(materials[i]);
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
        description:
          "La cystite est une infection urinaire localisée au niveau de la vessie. Le plus souvent, elle est due à la bactérie Escherichia Coli.",
        step: {
          step1: "1. Prendre un verre d'eau",
          step2: "2. Prendre un verre d'eau",
          step3: "3. Prendre un verre d'eau",
          step4: "4. Prendre un verre d'eau",
        },
        recommendation: "Prendre un verre d'eau",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl8HaQ_201vTKuSsfr3-6lRkZsblE9GJmpXg&usqp=CAU",
        category_id: 1,
      },
      {
        title: "pulmonaire",
        description:
          "On appelle « Pulmonaire » diverses plantes et lichens dont les feuilles, la racine ou le thalle ont une forme évoquant plus ou moins celle d'un poumon.",
        step: {
          step1: "1. Prendre un verre d'eau",
          step2: "2. Prendre un verre d'eau",
          step3: "3. Prendre un verre d'eau",
        },
        recommendation: "Prendre un verre d'eau",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJoI8LQQGyv1LGAYiVwC39N-gSuTEaRSnyQVbm7Nqj6WBFt4LF8AIzZlKbfpId_yz3Ol4&usqp=CAU",
        category_id: 2,
      },
    ];

    for (let i = 0; i < cheats.length; i++) {
      await this.cheatService.create(cheats[i]);
    }

    for (let i = 0; i < 50; i++) {
      await this.cheatService.create({
        title: faker.science.unit().name,
        description: faker.hacker.phrase(),
        step: {
          step1: faker.hacker.phrase(),
          step2: faker.hacker.phrase(),
          step3: faker.hacker.phrase(),
        },
        recommendation: faker.hacker.phrase(),
        image: faker.image.imageUrl(),
        category_id: 1,
      });
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
