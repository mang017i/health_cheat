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
        image: "var",
      },
      {
        name: "Bandage",
        image: "bandage",
      },
      {
        name: "Casaque",
        image: "casaque",
      },
      {
        name: "Cathéter",
        image: "catheter",
      },
      {
        name: "Charlotte",
        image: "charlotte",
      },
      {
        name: "Ciseaux",
        image: "ciseaux",
      },
      {
        name: "Compresse",
        image: "compresse",
      },
      {
        name: "Gants",
        image: "gants",
      },
      {
        name: "Glucomètre",
        image: "gluco",
      },
      {
        name: "Masque",
        image: "masque",
      },
      {
        name: "NaCl 0,9%",
        image: "nacl",
      },
      {
        name: "Oxymètre",
        image: "oxy",
      },
      {
        name: "Pansements",
        image: "pansements",
      },
      {
        name: "Seringue",
        image: "seringue",
      },
      {
        name: "Sonde nasale",
        image: "nasale",
      },
      {
        name: "Sonde urinaire",
        image: "urinaire",
      },
      {
        name: "Stéthoscope",
        image: "stethoscope",
      },
      {
        name: "Tegaderm",
        image: "tegaderm",
      },
      {
        name: "Tensiomètre",
        image: "tensio",
      },
      {
        name: "Thermomètre",
        image: "thermo",
      },
      {
        name: "Plateau décontaminé",
        image: "plateau",
      },
      {
        name: "Système de prélèvement sécurisé ",
        image: "sysprelev",
      },
      {
        name: "Garrot",
        image: "garrot",
      },
      {
        name: "Antiseptique",
        image: "antiseptique",
      },
      {
        name: "Container à aiguilles",
        image: "container",
      },
      {
        name: "Tubes de prélèvement",
        image: "tubes",
      },
      {
        name: "Sac poubelle",
        image: "poubelle",
      },
      {
        name: "Gel hydroalcoolique",
        image: "gel",
      },
      {
        name: "Fiche de prélèvement labo",
        image: "fiche",
      },
      {
        name: "VVP",
        image: "vvp",
      },
      {
        name: "Tubulure à filtre",
        image: "tubulure",
      },
      {
        name: "Matériel pour CIU",
        image: "ciu",
      },
      {
        name: "Documents spécifiques (RAI, PM, FDD, etc.)",
        image: "documents",
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
          step1: "Je vérifie la concordance entre l’identité du patient et les étiquettes collées sur les bons.",
          step2: "2. Prendre un verre d'eau",
          step3: "3. Prendre un verre d'eau",
        },
        recommendation: "Prendre un verre d'eau",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJoI8LQQGyv1LGAYiVwC39N-gSuTEaRSnyQVbm7Nqj6WBFt4LF8AIzZlKbfpId_yz3Ol4&usqp=CAU",
        category_id: 2,
      },
      {
        title: "Prélèvement sanguin veineux",
        description:
          "Acte qui permet de recueillir un échantillon de sang veineux afin d'effectuer des examens biologiques",
        step: {
          step1: "Je vérifie la concordance entre l’identité du patient et les étiquettes collées sur les bons.",
          step2: "Pour prélever, je privilégie la solution périphérique et je choisis le côté opposé à la perfusion.",
          step3: "Je pose le garrot pas plus de 2 min. Je désinfecte.",
          step4: "Je purge si nécessaire avec 1 tube neutre (avant tube citraté) ou grâce aux hémocs.",
          step5: "Je remplis les tubes jusqu’au trait de jauge notamment pour les tubes d’hémostase bleu clair ; jusqu’au trait de repère pour les hémocultures (3 graduations à partir du haut).",
          step6: "J’étiquète les prélèvements en présence du patient, en vérifiant son identité.",
          step7: "J’inscris sur les bon la date, l'heure, l'identité et la fonction du préleveur (tampon ok).",
          step8: "Je verifie que les étiquettes soient bien résentes sur chaque tube et chaque bon et je mets les tubes et les bons dans les pochettes : 1 pochette = 1 bon et le(s) prélèvement(s) correspondant(s).",
        },
        recommendation: "Sur Prescription Médicale, afin de détecter des anomalies du sang, de diagnostiquer certaines maladies et d’évaluer le fonctionnement desorganes",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl8HaQ_201vTKuSsfr3-6lRkZsblE9GJmpXg&usqp=CAU",
        category_id: 3,
      },
      {
        title: "Transfusion sanguine",
        description:
          "Acte sous le contrôle de l’établissement Français du Sang, qui la définit comme un acte thérapeutique complexe qui consiste à apporter à un patient, appelé receveur, les éléments du sang par perfusion intraveineuse qui lui font provisoirement défaut ». ",
        step: {
          step1: "S’assurer qu’un médecin puisse intervenir à tout moment",
          step2: "Délai maximum pour commencer la transfusion est de 6 heures après la réception du PSL dans l’unité de soins ",
          step3: "S’assurer de la présence et validation des documents : • Double détermination du groupage sanguin • RAI de moins de 3 jours • Ordonnance de prescription médicale conforme ➔ Si absence : prélèvement sanguin",
          step4: "Contrôle à la réception des PSL : • Problème de transport ? Durée de transport Glacière ou sac isotherme ? Glacière fermée CGR en contact direct avec les blocs de glace ? Température entre 2°C et 10°C Complétude de la commande • Concordance identité • Concordance produit : nature quantité= 2CGR et qualité = phénotypé • Concordance numéros lot bordereaux de délivrance et culots • Concordance groupe sanguin -phénotype • Intégrité ? Aspect ? Date de péremption ? • Traçabilité réception sur Bordereaux De Délivrance",
          step5: "Contrôle au pied du patient : • Concordance identité • Concordance produit : nature quantité= 2CGR et qualité = phénotypé • Concordance groupe sanguin -phénotype • Concordance numéros BDD et culot • Intégrité ? Aspect ? Date de péremption ? • Vérification que la patiente a bien été informé • Vérification de la perméabilité de la voie veineuse réservée à la transfusion. • Surveillance de la patiente : Clinique : ???? Faciès ? Coloration ? Dyspnée ? Sueurs ? Douleur ? • L’observation clinique et les paramètres vitaux du patient (pouls, TA, T°) sont vérifiés et notés dans le dossier du patient informatisé avant la pose du CGR",
          step6: "CUI • Lecture horizontale de droite à gauche Interprétation des résultats • Interprétation (présence agglutination ou non, même réaction sur culot et patient ou pas) • Décision de transfuser ou pas • Attention à bien dater et signer CUI • Pose du CGR • 1ml = 20 gouttes (débit fonction PM et clinique du patient)",
          step7: "Suivi du patient • Faciès ? Coloration ? Sueurs ? Douleur ? • FC, TA, FR, T°, diurèse • Surveillance avant la pose, à la pose, +5min, +15min, +30min puis tous les 30 mins pendant 2h",
          step8: "Traçabilité • Noter l’heure de pose du CGR et son N° • 1 étiquette par feuillet du triptyque • Noter si incident transfusionnel"
        },
        recommendation: "Lors d’anémie, c’est à dire que le taux d’hémoglobine est à 7 g/dL chez un patient sans antécédent particulier ou à 10 g/dL en cas de patient avec une pathologie cardiaque (les normes étant de 12 à 16 g/dL chez la femme, et de 13 à 18 g/dL chez l’homme). L’anémie peut être lié à plusieurs facteurs : une hémorragie, une hémopathie ou un traitement ",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl8HaQ_201vTKuSsfr3-6lRkZsblE9GJmpXg&usqp=CAU",
        category_id: 3,
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
