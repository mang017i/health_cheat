const Picture = require("../../models/index")["Picture"];
const Cheat = require("../../models/index")["Cheat"];
const axios = require("axios");
const { upload } = require("../../middleware");
const fs = require("fs");

class PictureService {
  constructor() {
    this.picture = Picture;
  }

  /**
   * @param {Picture} picture
   * @returns {Promise<Picture>}
   */
  async create(cheat_id, path) {
    return await this.picture
      .create({
        cheat_id: cheat_id,
        path: "/images/cheat/" + path,
      })
      .then((picture) => {
        if (picture) {
          return picture;
        } else {
          throw new Error("Picture cannot be created for the cheat");
        }
      });
  }


  /**
   * @param {Number} id
   * @returns {Promise<Picture>}
   * @throws {Error} if picture not found
   * @throws {Error} if picture not deleted
   */
  async delete(id) {
    return await this.picture
      .destroy({
        where: {
          id: id,
        },
      })
      .then((picture) => {
        if (picture) {
          fs.unlinkSync(__basedir + "/public" + picture.path),
            (err) => {
              if (err) {
                throw new Error(err);
              }
            };
          return true;
        } else {
          throw new Error(`Picture with id ${id} not found`);
        }
      });
  }

  /**
   * @param {Number} cheat_id
   * @returns {Promise<Picture>}
   * @throws {Error} if picture not found
   * @throws {Error} if picture not deleted
   */
  async deletePictureByCheatId(cheat_id) {
    return await this.picture
      .destroy({
        where: {
          cheat_id: cheat_id,
        },
      })
      .then((picture) => {
        if (picture) {
          return true;
        } else {
          throw new Error(`Picture with cheat_id ${cheat_id} not found`);
        }
      });
  }

  /**
   * @param {Number} cheat_id
   * @returns {Promise<Picture>}
   * @throws {Error} if picture not found
   */
  async findPictureByCheatId(cheat_id) {
    return await this.picture
      .findOne({
        where: {
          cheat_id: cheat_id,
        },
      })
      .then((picture) => {
        if (picture) {
          return picture;
        } else {
          throw new Error(`Picture with cheat_id ${cheat_id} not found`);
        }
      });
  }

}

module.exports = new PictureService();
