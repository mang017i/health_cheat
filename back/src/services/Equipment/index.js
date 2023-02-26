const Equipment = require("../../models/index")["Equipment"];

class EquipmentService {
  constructor() {
    this.equipment = Equipment;
  }

  async addCheatToMaterial(materialId, cheatId) {
    return await this.equipment
      .create({
        material_id: materialId,
        cheat_id: cheatId,
      })
      .then((equipment) => {
        if (equipment) {
          return equipment;
        } else {
          throw new Error(
            `Equipment not created with material_id: ${materialId} and cheat_id: ${cheatId}`
          );
        }
      });
  }

  async removeCheatFromMaterial(materialId, cheatId) {
    return await this.equipment
      .destroy({
        where: {
          material_id: materialId,
          cheat_id: cheatId,
        },
      })
      .then((equipment) => {
        if (equipment) {
          return true;
        } else {
          throw new Error(
            `Equipment not found with material_id: ${materialId} and cheat_id: ${cheatId}`
          );
        }
      });
  }

  async findAllByMaterialId(materialId) {
    return await this.equipment
      .findAll({
        where: {
          material_id: materialId,
        },
      })
      .then((equipments) => {
        if (equipments.length === 0) {
          throw new Error(`Any equipments found with material_id: ${materialId}`);
        }
        return equipments;
      });
  }

  async findAllByCheatId(cheatId) {
    return await this.equipment
      .findAll({
        where: {
          cheat_id: cheatId,
        },
      })
      .then((equipments) => {
        if (equipments.length === 0) {
          throw new Error(`Any equipments found with cheat_id: ${cheatId}`);
        }
        return equipments;
      });
  }

  async findOneByMaterialIdAndCheatId(materialId, cheatId) {
    return await this.equipment
      .findOne({
        where: {
          material_id: materialId,
          cheat_id: cheatId,
        },
      })
      .then((equipment) => {
        if (equipment) {
          return equipment;
        } else {
          throw new Error(
            `Equipment not found with material_id: ${materialId} and cheat_id: ${cheatId}`
          );
        }
      });
  }

  async findAll() {
    return await this.equipment.findAll().then((equipments) => {
      if (equipments) {
        if (equipments.length === 0) {
            throw new Error("Any equipments found");
        }
        return equipments;
      } else {
        throw new Error("Any equipments found");
      }
    });
  }

  /** EquipmentS HELPERS */
  async isCheatEquipment(materialId, cheatId) {
    return await this.findOneByMaterialIdAndCheatId(materialId, cheatId)
      .then((equipment) => {
        if (equipment) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  }
}

module.exports = new EquipmentService();
