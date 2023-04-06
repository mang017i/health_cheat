const RoleService = require("../Role");
const UserService = require("../User");
const CheatService = require("../Cheat");
const CategoryService = require("../Category");
const MaterialService = require("../Material");
const { faker } = require("@faker-js/faker");

class DatabaseService {
  constructor() {
    this.roleService = new RoleService();
    this.userService = new UserService();
    this.cheatService = new CheatService();
    this.materialService = new MaterialService();
    this.categoryService = new CategoryService();
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
        email: "anissa Hadjal.hadjal@ifchurennes.fr",
        username: "Anissa Hadjal Hadjal",
        password: "anissa Hadjal",
        avatar: "../../public/images/avatar/minion1.png",
        role_id: 2,
      },
    ];

    for (let i = 0; i < users.length; i++) {
      await this.userService.create(users[i]);
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
      {
        title: "Autres",
        icon: "healing",
        image: "../../public/images/category/autre.jpg",
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
        name: "Casaque stérile",
        image: "casaque",
      },
      {
        name: "KTO",
        image: "catheter",
      },
      {
        name: "Charlotte",
        image: "charlotte",
      },
      {
        name: "Ciseaux stérile",
        image: "ciseaux",
      },
      {
        name: "Compresse stérile",
        image: "compresse",
      },
      {
        name: "Gants à usage unique",
        image: "gants",
      },
      {
        name: "Lecteur glycémique",
        image: "gluco",
      },
      {
        name: "Masque",
        image: "masque",
      },
      {
        name: "Poche de NaCl 0,9%",
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
        name: "Seringue 10ml",
        image: "seringue",
      },
      {
        name: "Sonde naso gastrique",
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
        name: "Dynamap",
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
        name: "OPCT",
        image: "container",
      },
      {
        name: "Tubes de prélèvement",
        image: "tubes",
      },
      {
        name: "Sac noir",
        image: "poubelle",
      },
      {
        name: "SHA",
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
        name: "Contrôle ultime",
        image: "ciu",
      },
      {
        name: "Dossier tranfusionnel",
        image: "documents",
      },
      {
        name: "Scalpel",
        image: "scalpel",
      },
      {
        name: "Gants stériles",
        image: "gantss",
      },
      {
        name: "Autopiqueur à usage unique",
        image: "aun",
      },
      {
        name: "Lancette",
        image: "lancette",
      },
      {
        name: "Tablier de protection",
        image: "tablier",
      },
      {
        name: "Film de polyuréthane",
        image: "filmp",
      },
      {
        name: "Sac DASRI",
        image: "dasri",
      },
      {
        name: "Mousse",
        image: "mousse",
      },
      {
        name: "Mèche",
        image: "meche",
      },
      {
        name: "Sérum physiologique",
        image: "serumphy",
      },
      {
        name: "Champ stérile troué",
        image: "cst",
      },
      {
        name: "Champ stérile plein",
        image: "csp",
      },
      {
        name: "Curette",
        image: "curette",
      },
      {
        name: "Grandes compresses",
        image: "grandecompresse",
      },
      {
        name: "Seringues hépariné avec aiguille sécurisée",
        image: "seringueheparine",
      },
      {
        name: "Sparadra",
        image: "sparadra",
      },
      {
        name: "Trocard",
        image: "trocard",
      },
      {
        name: "Poche de perfusion",
        image: "pocheperf",
      },
      {
        name: "Tubulure",
        image: "tubulure",
      },
      {
        name: "Seringue 20ml",
        image: "seringue",
      },
      {
        name: "Aiguille de Hubert",
        image: "aiguilleh",
      },
      {
        name: "Stéristrip",
        image: "steristrip",
      },
      {
        name: "Poche de recueil stomie",
        image: "prs",
      },
      {
        name: "Socle de stomie",
        image: "socle",
      },
      {
        name: "Savon",
        image: "savon",
      },
      {
        name: "Spray de retrait et protection",
        image: "spray",
      },
      {
        name: "Anneau de maintien",
        image: "anneau",
      },
      {
        name: "Rampe",
        image: "rampe",
      },
      {
        name: "Prolongateur",
        image: "prolongateur",
      },
      {
        name: "Poche de soluté",
        image: "solute",
      },
      {
        name: "Lubrifiant",
        image: "lubrifiant",
      },
      {
        name: "Poche de recueil",
        image: "recueil",
      },
      {
        name: "Système d'aspiration",
        image: "aspiration",
      },
      {
        name: "Haricot",
        image: "haricot",
      },
      {
        name: "Eau stérile",
        image: "eau",
      },
      {
        name: "Dakin",
        image: "dakin",
      },
      {
        name: "Pince",
        image: "pince",
      },
      {
        name: "Pince ôte agrafe",
        image: "agrafe",
      },
      {
        name: "Carte de groupe sanguin",
        image: "groupesang",
      },
      {
        name: "Chariot de soin",
        image: "chariot",
      },
      {
        name: "Canule de trachéotomie stérile",
        image: "canule",
      },
      {
        name: "Raccord annelé",
        image: "raccordannele",
      },
      {
        name: "Raccord à rotule stérile",
        image: "raccordrotule",
      },
      {
        name: "Manomètre d'aspiration",
        image: "manomètre",
      },
      {
        name: "Bocal d'aspiration",
        image: "bocal",
      },
      {
        name: "Tuyeaux à renflements",
        image: "tuyeaux",
      },
      {
        name: "Valve d'aspiration",
        image: "valveaspi",
      },
      {
        name: "Sonde d'aspiration trachéale",
        image: "sondeaspi",
      },
      {
        name: "Digivide",
        image: "digivide",
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
        title: "Changement de canule trachéale",
        description:
          "La trachéotomie est l'ouverture de la face antérieure de la trachée, dont la lumière est reliée à l'extérieur par une canule permettant d'assurer une respiration en excluant les voies aériennes supérieures. La trachéostomie : ouverture par section complète de la trachée à plein canal.",
        step: {
          step1:
            "Informer du geste et installation sur le dos avec billot afin que la tête soit en légère hyper extension.",
          step2:
            "Préparer la boite d’intubation dans la chambre pour le premier change de canule ou pour tout change difficile.",
          step3:
            "Vérifier le bon fonctionnement du matériel d’aspiration gastrique.",
          step4:
            "Mettre la sonde gastrique en aspiration une dizaine de minutes avant d’effectuer le change.",
          step5:
            "S’assurer que le change aura lieu à distance du repas précédent si la personne s’alimente per-os.",
          step6:
            "Vérifier le bon fonctionnement du matériel d’aspiration trachéale.",
          step7: "Ventiler le malade à l’oxygène pur.",
          step8: "Mettre le lit à plat.",
          step9:
            "Disposer un billot sous les épaules du patient, (la tête en hyper extension doit reposer sur le plan du lit) sauf si contre-indication (lésion du rachis).",
          step10:
            "Mettre charlotte, masque, lunettes et tablier de protection.",
          step11: "Se laver les mains selon protocole du guide de l’hygiène.",
          step12: "Préparer le matériel sur un champ stérile.",
        },
        recommendation:
          "Maintenir la perméabilité des voies aériennes, prévenir la formation d'un bouchon muqueux, améliorer les échanges gazeux, prévenir l'infection pulmonaire. Le soin se déroule à deux IDE, une IDE coté 'propre' (1) et une IDE coté 'sale' (2).",
        image: "1",
        category_id: 8,
        creator: "Anissa Hadjal",

      },
      {
        title: "Transfusion sanguine",
        description:
          "Acte sous le contrôle de l’établissement Français du Sang, qui la définit comme un acte thérapeutique complexe qui consiste à apporter à un patient, appelé receveur, les éléments du sang par perfusion intraveineuse qui lui font provisoirement défaut. ",
        step: {
          step1: "S’assurer qu’un médecin puisse intervenir à tout moment",
          step2:
            "Délai maximum pour commencer la transfusion est de 6 heures après la réception du PSL dans l’unité de soins ",
          step3:
            "S’assurer de la présence et validation des documents : | Double détermination du groupage sanguin | RAI de moins de 3 jours | Ordonnance de prescription médicale conforme ➔ Si absence : prélèvement sanguin",
          step4:
            "Contrôle à la réception des PSL : | Problème de transport ? Durée de transport Glacière ou sac isotherme ? Glacière fermée CGR en contact direct avec les blocs de glace ? Température entre 2°C et 10°C Complétude de la commande | Concordance identité | Concordance produit : nature quantité= 2CGR et qualité = phénotypé | Concordance numéros lot bordereaux de délivrance et culots | Concordance groupe sanguin -phénotype | Intégrité ? Aspect ? Date de péremption ? | Traçabilité réception sur Bordereaux De Délivrance",
          step5:
            "Contrôle au pied du patient : | Concordance identité | Concordance produit : nature quantité= 2CGR et qualité = phénotypé | Concordance groupe sanguin -phénotype | Concordance numéros BDD et culot | Intégrité ? Aspect ? Date de péremption ? | Vérification que la patiente a bien été informé | Vérification de la perméabilité de la voie veineuse réservée à la transfusion. | Surveillance de la patiente : Clinique : ???? Faciès ? Coloration ? Dyspnée ? Sueurs ? Douleur ? | L’observation clinique et les paramètres vitaux du patient (pouls, TA, T°) sont vérifiés et notés dans le dossier du patient informatisé avant la pose du CGR",
          step6:
            "CUI | Lecture horizontale de droite à gauche Interprétation des résultats | Interprétation (présence agglutination ou non, même réaction sur culot et patient ou pas) | Décision de transfuser ou pas | Attention à bien dater et signer CUI | Pose du CGR | 1ml = 20 gouttes (débit fonction PM et clinique du patient)",
          step7:
            "Suivi du patient | Faciès ? Coloration ? Sueurs ? Douleur ? | FC, TA, FR, T°, diurèse | Surveillance avant la pose, à la pose, +5min, +15min, +30min puis tous les 30 mins pendant 2h",
          step8:
            "Traçabilité | Noter l’heure de pose du CGR et son N° | 1 étiquette par feuillet du triptyque | Noter si incident transfusionnel",
        },
        recommendation:
          "Lors d’anémie, c’est à dire que le taux d’hémoglobine est à 7 g/dL chez un patient sans antécédent particulier ou à 10 g/dL en cas de patient avec une pathologie cardiaque (les normes étant de 12 à 16 g/dL chez la femme, et de 13 à 18 g/dL chez l’homme). L’anémie peut être lié à plusieurs facteurs : une hémorragie, une hémopathie ou un traitement ",
        image:
          "2",
        category_id: 4,
        creator: "Anissa Hadjal",
      },
      {
        title: "Pansement du Picc Line ",
        description:
          "Cathéter veineux central qui est inséré dans une veine périphérique du bras et dont la partie distale se situe à la jonction de la veine cave supérieure et de l’oreillette droite. Il permet d’injecter, de perfuser ou de prélever du sang. La pose est effectuée sous anesthésie locale chez l’adulte et sous échoguidage par le service d’anesthésiologie. Noter dans le dossier patient la distance extériorisée du cathéter.",
        step: {
          step1: "Mettre les masques (patient/ide)",
          step2:
            "Installation du patient confortablement, bras écarté en hyperextension",
          step3: "mettre un champ stérile sous le bras du patient",
          step4: "Préparation du champs avec le matériel",
          step5: "SHA",
          step6:
            "Retirer le pansement à main nu ou avec des gants si pansement souillé, essayer de retirer le pansement en tirant les deux extrémités pour le décoller du centre une fois retirer bien visualiser le repère du picc",
          step7: "SHA",
          step8:
            "Décoller le statlock en levant les fenêtres puis en déloger le cathéter et retirer le statlock",
          step9: "SHA",
          step10:
            "Sans toucher faire une détersion au savon antiseptique + rinçage + séchage du point de ponction vers l’extrémité du cathéter",
          step11: "SHA",
          step12: "Mettre les gants stériles",
          step13:
            "Effectuer la désinfection en deux temps du point de ponction vers l’extrémité du cathéter",
          step14: "Pose du nouveau statlock",
          step15:
            "Ajuster le cathéter sur le statlock, flèches orientées vers le point de ponction",
          step16: "Fermer les fenêtres du statlock",
          step17:
            "Mettre en place le pansement transparent largement sur le cathéter en laissant le clamp à l’extérieur du pansement (mettre au même repère que à l’ablation du pansement)",
          step18: "Vérifier la perméabilité du pansement",
          step19:
            "Préparer une seringue de 20cc de NaCl 0,9% et purger la valve anti-retour",
          step20: "Clamper le Picc Line",
          step21:
            "Avec des compresses imbibés d’antiseptique désadapter la valve",
          step22: "Avec des compresses imbibés adapter la valve",
          step23: "Dé clamper",
          step24:
            "Vérifier le retour veineux et rincé de 20cc de NaCl 0,9% le Picc en rinçage pulsé",
          step25: "Oter et jeter les gants",
          step26: "SHA",
          step27: "Report dossier patient",
        },
        recommendation:
          "La pose d’un PICC Line dépend du type de  traitement, de sa durée, du capital veineux du patient, du contexte clinique  et du choix du ou de la patiente. Réfection du pansement à J1. Réfection du pansement en deux temps si aspect de la peau visuellement propre mais réfection en quatres temps si peau visuellement sale. Réfection du pansement tous les 8 jours sauf en cas de peau visuellement sale",
        image:
          "3",
        category_id: 4,
        creator: "Anissa Hadjal",
      },
      {
        title: "Gaz du sang",
        description:
          "Le gaz du sang permet de mesurer les taux d’oxygène et de dioxyde de carbone ainsi que de déterminer l’acidité du sang.",
        recommendation:
          "Prélever 2 à 3 ml de sang, retirer l’aiguille et comprimer l’artère pendant 5 minutes avec une compresse imbibée d’antiseptique. Difficultés respiratoires, altération de l’état de conscience, insuffisance cardiaque ou rénale.",
        step: {
          step1:
            "Se laver les mains au savon ordinaire puis passer les mains au gel hydroalcoolique.",
          step2:
            "Demander au patient s’il a un traitement anticoagulant. Si oui, prévoir une compression plus prolongée de l’artère.",
          step3: "Préparer la seringue en réglant le piston à 1 ml au moins.",
          step4: "Mettre des gants.",
          step5:
            "Repérer l’artère radiale au poignet (éventuellement si difficulté l’artère humérale).",
          step6:
            "Désinfecter la zone à piquer avec une compresse imbibée de solution antiseptique.",
          step7:
            "Après le prélèvement, vérifier l’absence de bulles d’air ou les évacuer. Fermer la seringue, purger, l’agiter pour mélanger le sang et l’anticoagulant tout en comprimant au doigt la zone piquée.",
          step8:
            "Après environ 2 minutes, mettre en place une bande pour continuer la compression de l’artère pendant au moins 15 minutes puis enlever la bande et recouvrir le point de ponction d’un pansement.",
          step9:
            "Étiqueter la seringue (étiquette code-barre au nom du patient).",
          step10:
            "Remplir le bon en précisant l’heure de prélèvement, le nom et la fonction du préleveur. Cocher date, air ambiant ou sous O 2. Coller l’étiquette code barre du patient et de l’UF.",
        },
        image:
          "4",
        category_id: 4,
        creator: "Anissa Hadjal",
      },
      {
        title: "Prélèvement sanguin veineux",
        description:
          "Acte qui permet de recueillir un échantillon de sang veineux afin d'effectuer des examens biologiques",
        step: {
          step1:
            "Je vérifie la concordance entre l’identité du patient et les étiquettes collées sur les bons.",
          step2:
            "Pour prélever, je privilégie la solution périphérique et je choisis le côté opposé à la perfusion.",
          step3: "Je pose le garrot pas plus de 2 min. Je désinfecte.",
          step4:
            "Je purge si nécessaire avec 1 tube neutre (avant tube citraté) ou grâce aux hémocs.",
          step5:
            "Je remplis les tubes jusqu’au trait de jauge notamment pour les tubes d’hémostase bleu clair ; jusqu’au trait de repère pour les hémocultures (3 graduations à partir du haut).",
          step6:
            "J’étiquète les prélèvements en présence du patient, en vérifiant son identité.",
          step7:
            "J’inscris sur les bon la date, l'heure, l'identité et la fonction du préleveur (tampon ok).",
          step8:
            "Je verifie que les étiquettes soient bien résentes sur chaque tube et chaque bon et je mets les tubes et les bons dans les pochettes : 1 pochette = 1 bon et le(s) prélèvement(s) correspondant(s).",
        },
        recommendation:
          "Sur Prescription Médicale, afin de détecter des anomalies du sang, de diagnostiquer certaines maladies et d’évaluer le fonctionnement desorganes",
        image:
          "5",
        category_id: 4,
        creator: "Anissa Hadjal",
      },
      {
        title: "Pose de VVP",
        description:
          "Technique d'installation d'un cathéter veineux périphérique pour la réalisation d'une perfusion, un traitement intraveineux, une transfusion sanguine ou l'administration de produit de contraste",
        step: {
          step1: "Vérifier l'identité du patient",
          step2:
            "Serrer le garrot et repérer la veine : plutôt une veine de l'avant bras, éviter la main et le pli du coude",
          step3:
            "Préparer le matériel, mettre les gants, se désinfecter les mains, avoir préparer le montage du soluté",
          step4:
            "Introduire le cathéter, dès que le sang arrive dans le mandrin faire glisser le cathéter sur l'aiguille pour le positionner dans la veine",
          step5: "Desserrer le garrot avant d'enlever le mandrin",
          step6:
            "Raccorder le prolongateur et vérifier le débit et la perméabilité",
          step7: "Appliquer le pansement occlusif",
          step8:
            "Régler le débit de la perfusion selon la prescription et tracer le soin",
        },
        recommendation:
          "Sur Prescription Médicale, en cas de nécessité de réaliser une perfusion, un traitement intraveineux, une transfusion sanguine ou l'administration de produit de contraste. Perfusion, TTT IV, transfusion sanguine, produit de contraste",
        image:
          "6",
        category_id: 11,
        creator: "Anissa Hadjal",
      },
      {
        title: "Pose aiguille de Huber sur chambre implantable",
        description:
          "La pose d’une aiguille de Huber permet un accès vasculaire central, c’est un dispositif intraveineux implanté dans l’espace sous cutané du patient. La chambre implantable est destinée à préserver le capital veineux, elle est posée dans le cadre de pathologies et des soins au long cours comme les chimiothérapies antibiothérapies prolongées.",
        step: {
          step1:
            "Ma tenue soignante est conforme aux recommendations (propre, masque, charlotte)",
          step2: "Vérifier l’identité du patient",
          step3: "Repérer la chambre implantable (CCI)",
          step4: "Faire une désinfection hygiénique des mains avec le SHA",
          step5:
            "Choisir son matériel, vérifier les dates de péremption et l’intégrité des emballages",
          step6: "Faire une désinfection hygiénique des mains avec le SHA",
          step7: "Ouvrir le champ stérile",
          step8:
            "Disposer le matériel sur le champ stérile et disposer les gants stériles ainsi qu’un paquet de compresses sur un adaptable à côté",
          step9:
            "Imbiber les deux paquets de compresses d’antiseptique alcoolique",
          step10: "Effectuer une désinfection hygiénique des mains",
          step11:
            "Réaliser l’antisepsie large de la peau en 2 temps (nettoyage + séchage)",
          step12:
            "Refaire une désinfection hygiénique des mains et mettre les gants stériles",
          step13:
            "Remplir la seringue avec 20 ml de NaCl et la purger, purger l’aiguille de Huber, clamper le système, adapter la tubulure à la poche de perfusion et la purger",
          step14:
            "Faire une 2ème antisepsie de la peau et mettre le champ fenêtré",
          step15:
            "Introduire l'aiguille au centre et perpendiculairement au septum en calant la CIP entre 3 doigts (système positionné vers le haut du thorax)",
          step16: "Vérifier le retour veineux",
          step17:
            "Injecter 2 ml de NaCl lentement puis effectuer un rinçage pulsé de 6 ml et clamper l’aiguille",
          step18:
            "Fixer l'aiguille avec les bandelettes adhésives, libérer les clamps de la poche de perfusion et ajuster le débit",
          step19:
            "Recouvrir le site d’insertion d’un pansement stérile occlusif et transparent",
        },
        recommendation:
          "Lorsque que le soin est effectué, il y a 6 critères de bon fonctionnement à respecter qui sont : retour veineux présent, injection aisée à la seringue, bon débit de perfusion, pas de douleur spontanée ou à l'injection, pas d'oedème be cervico-brachial ou au niveau d ela CCI, absence d’inflammation au point de ponction ou sur le trajet tunnelisé.",
        image:
          "7",
        category_id: 7,
        creator: "Anissa Hadjal",
      },
      {
        title: "Retrait de l’aiguille de Huber",
        description:
          "Le retrait de l’aiguille de Huber se fait obligatoirement en pression positive",
        recommendation:
          "Le retrait de l’aiguille de Huber s’effectue au maximum tous les 8 jours (J+7) en absence de souillure, de décollement du pansement transparent ou de signe inflammatoire au point de ponction.",
        step: {
          step1: "Désinfection des mains au SHA",
          step2: "Mettre les gants non stériles",
          step3: "Enlever le pansement recouvrant le sites d’insertion",
          step4:
            "Mettre le système vers le haut = armer le dispositif de sécurité “clic”",
          step5:
            "Effectuer un rinçage pulsée avec une seringue pré-remplie de 10 ml de NaCl 0,9%",
          step6:
            "Retirer l’aiguille tout en injectant pour maintenir une pression positive",
          step7: "Eliminer l’aiguille immédiatement dans un OPCT",
          step8: "Appliquer un pansement stérile et occlusif",
        },
        image:
          "8",
        category_id: 7,
        creator: "Anissa Hadjal",
      },
      {
        title: "Stomie / Bricker",
        description:
          "Les stomies (fécales / bricker) sont des muqueuses et non des plaies, c’est un soin propre. Comme c’est une muqueuse, la stomie doit rester rouge, rosée et humide. Il existe des supports en deux pièces (socle + poche) ou en une pièce (socle intégrée avec la poche).",
        step: {
          step1:
            "Préalablement à la pose et changement de la poche de stomie / Bricker, avoir découper en cercle par rapport au diamètre de la stomie le support",
          step2: "Se laver les mains, porter des gants à usage unique",
          step3:
            "Décoller la poche doucement en maintenant la peau avec le doigt, possibilité d’utiliser un spray de retrait pour ôter la poche, la mettre dans la poubelle",
          step4:
            "Nettoyer à l’eau tiède et avec du savon si on veut la muqueuse, rincer soigneusement et sécher en tamponnant avec des compresses ou gants à usage unique",
          step5: "Utiliser un spray de protection de la peau si besoin",
          step6:
            "Appliquer la nouvelle poche, bien coller la poche, ne pas hésiter à appuyer pour ne pas avoir de potentielle fuites ou décollement",
        },
        recommendation:
          "Le soin au mieux est à réaliser à distance d’un repas ou à jeun. Il faudra faire attention à certains produits qui peuvent assécher la peau ou entraîner des irritations voire des allergies. Le savon pourra être utilisé à condition d’être rincé soigneusement. Si des poils gène, ne jamais utiliser de rasoir mais une tondeuse",
        image:
          "9",
        category_id: 3,
        creator: "Anissa Hadjal",
      },
      {
        title:
          "Voie veineuse central | Cathéter artériel | Cathéter de dialyse",
        description:
          "C’est un acte à haut risque infectieux, si possible mieux vaut faire les soins à deux.",
        recommendation:
          "Une voie veineuse centrale est un dispositif médical visant à cathétériser une veine de gros calibre. Ce système permet d'injecter des médicaments mais aussi, dans certains cas, de mesurer la pression veineuse centrale. Un cathéter artériel est un dispositif médical visant à cathétériser une artère. Ce système permet de faire des prélèvements sanguins artériels, gaz du sang. Il permet également de mesurer la pression artérielle en continue. Un cathéter dialyse est un dispositif médical visant à cathétériser une veine de gros calibre. Ce système permet d’épurer le sang de ses déchets. Pour les pansement de VVC non tunnelisé, les KTA et les cathéter dialyse non tunnelisé la réfection doit se faire toute les 96h (tous les 4 jours) à l’inverse les KT tunnélisé doivent être réfectionné au bout de 7 jours. Changement de rampe et les lignes de perfusion à chaque pansement même s' il est changé avant le jour prévu. Ne jamais changer l'électorat de la voie proximale",
        step: {
          step1: "Lavage des mains",
          step2: "Masques patient et soignant",
          step3: "Charlotte",
          step4: "L’aidant met la casaque stérile à l’IDE",
          step5: "Mise des gants stérile",
          step6:
            "L’aidant vous donnes un paquet de compresses stériles imbibés de désinfectant de surface",
          step7:
            "L’aidant va à l’aide de gants non stériles retirer le pansement",
          step8:
            "L’IDE vient déposer une compresse stérile imbibé sur le point de ponction",
          step9:
            "Nettoyage en escargot en partant du point de ponction vers la peau périphérique",
          step10:
            "Mettre une compresse stérile plié en 4 au niveau des ailettes en laissant visible le point de ponction",
          step11: "L’aidant vous prépare un film transparent occlusif",
          step12: "Mise en place du film transparent occlusif",
          step13: "Vérifier que le pansement est bien occlusif",
          step14: "Enlever les masques, les gants, la charlotte et la casaque",
          step15: "SHA",
        },
        image: "10",
        category_id: 5,
        creator: "Anissa Hadjal",
      },
      {
        title: "Montage de rampes et changement des lignes de perfusions",
        description:
          "Montage de rampes en stérile ou avec des compresses stériles imbibées de désinfectant. Pour le changement des lignes de perfusions on vient tout changer jusqu’à la lumière du KT mais pas sur la voie de la proximale.",
        recommendation:
          "Sur un KTC 3 voies, il faudra deux rampes : une pour la voie distale et une pour la voie médiane. - Voie médiane : curarisation et sédation - Voie distale : remplissage et injections ponctuelles (il y a la PVC sur la distale) La voie proximale (la + proche du patient) pour les amines elle ne sera donc pas mise sur rampes Sur une voie veineuse périphérique si jamais plusieurs traitement à passer",
        step: {
          step1: "Ouvrir un champs stérile :",
          step2:
            "Déposer une ou deux rampes stériles (selon le besoin) avec les petits prolongateurs",
          step3: "Une poche soluté selon prescription avec tubulure stérile",
          step4: "Compresses stériles imbibés de désinfectant",
          step5: "Un prolongateur",
          step6: "Mise de gants stérile",
          step7:
            "Adapter la poche de soluté sur la rampes côté opposé au patient",
          step8:
            "Si besoin d’une 2ème rampes : branché du côté du patient mettre le petit prolongateur et le Relier à l’autre rampes du côté opposé au patient",
          step9:
            "Sur la deuxième rampes du côté du patient adapter le grand prolongateur",
          step10: "Purger la ou les rampes sans oublier les robinets",
          step11: "Clamper la voie distale",
          step12:
            "Adapter le prolongateur à la voie distale avec des compresses stérile imbibés",
          step13: "Dé clamper",
          step14:
            "Changement de la poche de soluté (en fonction de la prescription) sur la voie médiane (penser à clamper et dé clamper )",
          step15: "Changer également toute les lignes de perfusion",
          step16:
            "Vérifier que tous les robinet nécessaire sont ouvert au patient et que tout les solutés et Traitement diffuse bien",
        },
        image: "11",
        category_id: 11,
        creator: "Anissa Hadjal",
      },
      {
        title: "Pose de sonde Naso-Gastrique (SNG)",
        description:
          "C’est une sonde insérée par le nez ou la bouche qui arrive dans l’estomac. C’est un soin propre.",
        recommendation:
          "Tubage gastrique à la recherche de bactéries dans le liquide gastrique, Vidange gastrique, Nutrition entérale et administration de traitement.",
        step: {
          step1: "Réaliser une friction au SHA, mettre les gants",
          step2: "Placer un haricot sur le torse du patient",
          step3:
            "Évaluer la distance nez/lobe de l’oreille/estomac pour connaître la longueur de sonde nécessaire.",
          step4: "Lubrifier l’extrémité distale de la sonde",
          step5:
            "Avec une compresse, prendre la sonde à 15 cm de son extrémité distale.",
          step6:
            "Introduire la sonde de manière perpendiculaire et la faire progresser doucement.",
          step7:
            "Au carrefour oro-pharyngé et si possible, lui demander de déglutir et à ce moment pousser la sonde pour la faire descendre jusqu’au repère. Pencher la tête du patient rend le passage de la sonde plus simple. Retirer le mandrin si la sonde est lestée",
          step8:
            "Adapter la seringue remplie d’air au bout de la sonde. Placer le stéthoscope au niveau de l’abdomen, le maintenir tout en poussant sur le piston de la seringue d’air. Un bruit aérique doit être entendu.",
          step9:
            "Fixer la sonde avec l’adhésif. Nez, joue, passer derrière l’oreille.",
          step10:
            "Faire un repère sur la SNG et s’assurer de sa bonne fixation. Noter le repère dans les transmissions.",
          step11: "Faire un contrôle radiographique.",
        },
        image: "12",
        category_id: 3,
        creator: "Anissa Hadjal",
      },
      {
        title: "Pose sonde urinaire",
        description:
          "Le soin de pose de sonde urinaire consiste à insérer un tube souple et creux dans la vessie par le canal urinaire afin de drainer l'urine. Il est recommandé pour les personnes ayant des problèmes de rétention urinaire ou d'incontinence.",
        recommendation:
          "La pose de sonde urinaire vise à assurer une intervention efficace et sécurisée au niveau du petit bassin. Il est également important de prendre en compte la prévention de la rétention urinaire et la préservation de l'état cutané chez les personnes incontinentes, ainsi que de calculer le résidu post-mictionnel (RPM) pour évaluer le bon fonctionnement du système urinaire.",
        step: {
          step1: "Procédé à la toilette urogénitale puis toilette antiseptique",
          step2: "Préparer le matériel sur champ stérile",
          step3: "Mettre les gants stériles",
          step4: "Remplir la seringue de la quantité nécessaire d’eau stérile",
          step5: "Vérifier la perméabilité du ballonnet",
          step6:
            "Introduire la sonde par le méat urinaire jusqu’à apparition d’urine. Si homme, maintenir la verge perpendiculaire puis à la butée, abaisser la verge horizontalement.",
          step7: "Gonfler le ballonnet",
        },
        image: "13",
        category_id: 10,
        creator: "Anissa Hadjal",
      },
      {
        title: "Soins de GPE",
        description:
          "Les soins de GPE (Gastrostomie Percutanée Endoscopique) consistent à prendre soin d'une stomie gastrique, c'est-à-dire une ouverture pratiquée dans l'estomac pour permettre une alimentation entérale. Les indications pour ce type de soins sont généralement une alimentation orale difficile ou insuffisante.",
        recommendation: "Alimentation orale difficile ou insuffisante",
        step: {
          step1: "Vérifier le ballonnet selon protocole du service",
          step2: "Nettoyer la stomie au sérum phy ou savon doux",
          step3: "Rincer abondamment",
          step4: "Sécher minutieusement",
          step5:
            "Placer une compresse non tissée non stérile entre la peau et la collerette ou Mickey",
        },
        image: "14",
        category_id: 3,
        creator: "Anissa Hadjal",
      },
      {
        title: "Ablation de fils",
        description:
          "L'ablation de fils est une procédure médicale qui consiste à retirer les fils de suture utilisés pour fermer une plaie après une intervention chirurgicale ou une blessure. Les étapes de la procédure incluent le dépôt d'une compresse propre, la saisie et la coupe du fil, puis le retrait complet des fils en vérifiant la présence des trois brins.",
        step: {
          step1:
            "Déposer une compresse propre à proximité de la plaie pour y déposer les agrafes",
          step2:
            "Saisir une des extrémités du fil avec la pince pour le décoller de la peau",
          step3:
            "Couper le fil sous le nœud au ras de la peau; pour cela, il faut glisser le coupe fil sous la boucle du noeud (voir image ci-dessous)",
          step4: "Tirer le fil",
          step5: "Vérifier la présence des 3 brins",
        },
        recommendation:
          "L'ablation de fils est un soin qui consiste à retirer les fils utilisés pour refermer une plaie après une intervention chirurgicale. Pour réaliser ce soin, il est nécessaire de déposer une compresse propre à proximité de la plaie pour y déposer les agrafes, puis de saisir une des extrémités du fil avec une pince pour le décoller de la peau. Ensuite, il faut couper le fil sous le nœud au ras de la peau, en glissant le coupe-fil sous la boucle du noeud, puis tirer le fil et vérifier la présence des 3 brins. Pour éviter toute infection, il est important de suivre les règles d'hygiène et de stérilisation, et de surveiller la plaie pour détecter tout signe d'inflammation ou d'infection.",
        image: "15",
        category_id: 2,
        creator: "Anissa Hadjal",
      },
      {
        title: "Ablation d'agrafes",
        description:
          "L'ablation d'agrafes consiste à retirer les agrafes qui ont été utilisées pour refermer une plaie après une intervention chirurgicale. Cela se fait en saisissant chaque extrémité de l'agrafe avec une pince et en la tirant doucement. Le retrait des agrafes est généralement rapide et peu douloureux.",
        step: {
          step1: "Désinfecter la zone autour de chaque agrafe.",
          step2:
            "Utiliser une pince pour soulever délicatement la partie centrale de l'agrafe.",
          step3:
            "Utiliser une deuxième pince pour plier les ailes de l'agrafe en direction de la peau.",
          step4:
            "Tirer doucement l'agrafe hors de la peau en veillant à ce qu'elle reste droite.",
          step5: "Répéter les étapes 2 à 4 pour chaque agrafe.",
          step6:
            "Inspecter la plaie pour s'assurer qu'aucune agrafe n'a été laissée dans la peau.",
          step7: "Nettoyer et désinfecter la zone de la plaie.",
        },
        recommendation:
          "L'ablation d'agrafes doit être réalisée avec précaution sur ordonnance médicale afin de réduire le risque d'infection. Les instruments utilisés doivent être stérilisés avant l'intervention. Une surveillance attentive du patient est recommandée pour détecter tout signe d'inconfort, d'infection ou de saignement après l'ablation des agrafes.",
        image: "16",
        category_id: 2,
        creator: "Anissa Hadjal",
      },
      {
        title: "Aspiration trachéale",
        description:
          "L'aspiration trachéale est un soin qui consiste à retirer les sécrétions accumulées dans les voies respiratoires à l'aide d'une sonde adaptée. Ce soin est réalisé dans le but d'évacuer les sécrétions et prévenir les infections bronchiques. Il nécessite une certaine technique pour être réalisé de manière efficace et sûre, ainsi que le respect de mesures d'hygiène strictes pour éviter les contaminations croisées.",
        recommendation:
          "Evacuer les sécrétions accumulées au niveau de la trachée et prévenir une infection bronchique. Sur PM",
        step: {
          step1: "Lavage simple des mains",
          step2: "Mettre tablier et masque et gants",
          step3: "Rassurer le patient",
          step4: "Retirer la sonde de l’emballage et l’adapter au digivide",
          step5: "Introduire la sonde jusqu’à l’endroit souhaité",
          step6:
            "Effectuer l’aspiration en maintenant la canule d’une main et de l’autre appuyer sur le digivide tout en retirant la sonde de façon circulaire",
          step7: "Rincer la sonde après chaque série d’aspiration",
          step8:
            "L’ensemble du circuit est rincé (sonde et tuyau) à l’eau stérile",
          step9: "A la fin du soin éliminer les déchets",
          step10: "Lavage simple des mains",
          step11:
            "Noter dans dossier aspect qualité et quantité des sécrétions",
          step12: "Remarques : une sonde peut servir à plusieurs aspirations",
        },
        image: "17",
        category_id: 8,
        creator: "Anissa Hadjal",
      },
    ];

    for (let i = 0; i < cheats.length; i++) {
      await this.cheatService.create(cheats[i]);
    }

    return true;
  }
}

module.exports = DatabaseService;
