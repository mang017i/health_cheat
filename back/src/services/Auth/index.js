const config = require("../../config/auth.config");
const User = require("../../models/index")["User"];
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserService = require("../../services/User");
const Users = new UserService();
// const nodemailer = require("nodemailer");

class AuthService {

    constructor() {
        this.user = User;
    }

  /**
   * @param {String} email
   * @param {String} password
   * @returns {Promise<User>}
   */
  async register(user) {
    if (!user.email) {
      throw new Error("Email is required");
    }
    if (!user.password) {
      throw new Error("Password is required");
    }
    if (!user.username) {
      throw new Error("Username is required");
    }
    if(!user.lastname) {
      throw new Error("Lastname is required");
    }
    if(!user.firstname) {
      throw new Error("Firstname is required");
    }

    const userFoundEmail = await Users.checkUserEmail(user.email);
    const userFoundUsername = await Users.checkUserUsername(user.username);

    if (userFoundEmail) {
      throw new Error("User already exists with this email");
    }

    if (userFoundUsername) {
      throw new Error("User already exists with this username");
    }

    // Hash password
    var hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    return await this.user.create(user).then((user) => {
      if (user) {
        return user;
      } else {
        throw new Error("User not created");
      }
    });
  }

  /**
   * @param {User} user
   * @returns {Promise<User>}
   */
  async login(user) {
    return await Users.findByEmail(user.email).then((u) => {
      if (u) {
        var passwordIsValid = bcrypt.compareSync(user.password, u.password);
        if (!passwordIsValid) {
          throw new Error("Invalid password");
        }

        const token = [jwt.sign({ id: u.id }, config.secret, {
          algorithm: "HS256",
          expiresIn: 86400, // 24 hours
        }), u.id];

        return token
      } else {
        throw new Error(`User not found with this credentials email:${user.email} & password:${user.password}`);
      }
    });
  }


// /**
//  * @description send email with token and id
//  * @param {*} token
//  * @param {*} email
//  * @param {*} id
//  */
//   async sendEmail(token, email, id) {

//     let transporter = nodemailer.createTransport({
//       service: "hotmail",
//       auth: {
//         user: "a-q-x-s-c--83@live.fr",
//         pass: "coucou83*"
//       }
//     });

//     const options = {
//       from: "a-q-x-s-c--83@live.fr",
//       to: email,
//       subject: "Reset password in front",
//       text: `Hello, you can reset your password by clicking on the following link: http://localhost:8000/#/reset-password/users/${id}/${token}`,
//     };

//    const info = await transporter.sendMail(options);
//     return info;

//   }

//   /**
//    * @description generate token
//    * @param {*} user
//    * @returns {Promise<String>}
//    */
//   async generateToken(user) {
//     const token = [jwt.sign({ id: user.id }, config.secret, {
//       algorithm: "HS256",
//       expiresIn: 86400, // 24 hours
//     }), user.id];
//     return token;
//   }


//   /**
//    * @description ask for a password reset
//    * @param {*} user
//    * @returns {Promise<String>}
//    */
//   async requestPasswordReset(user) {
//     const userFound = await Users.findByEmail(user.email);
//     if (userFound) {
//       const token = await this.generateToken(userFound);
//       const sended = await this.sendEmail(token, userFound.email, userFound.id);
//       return sended;
//     } else {
//       throw new Error("User with this email not found");
//     }
//   }
}

module.exports = AuthService;
