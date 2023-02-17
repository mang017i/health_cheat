const Cheat = require("../../models/index")["Cheat"];
const CheatService = require("../../services/Cheat");
const Cheats = new CheatService();
const { successResponse, errorResponse } = require("../../helpers/index");

class CheatController {
  /**
   * @param {Cheat} cheat
   * @returns {Promise<Cheat>}
   */

  async create(req, res) {
    try {
      const cheat = await Cheats.create(req.body);
      const message = "Cheat created successfully";
      return successResponse(req, res, cheat, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @returns {Promise<Cheat[]>}
   */
  async findAll(req, res) {
    try {
      const cheats = await Cheats.findAll();
      const message = "Cheats retrieved successfully";
      return successResponse(req, res, cheats, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<Cheat>}
   */
  async findOne(req, res) {
    try {
      const cheatId = req.params.id;
      const cheat = await Cheats.findOne(cheatId);
      const message = "Cheat retrieved successfully";
      return successResponse(req, res, cheat, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  // /**
  //  * @param {String} symbol
  //  * @returns {Promise<Cheat>}
  //  * @description Retrieve a cheat by symbol
  //  */
  // async findBySymbol(req, res) {
  //   try {
  //     let { symbol } = req.query;
  //     const cheat = await Cheats.findBySymbol(symbol);
  //     const message = "Cheat retrieved successfully";
  //     return successResponse(req, res, cheat, message);
  //   } catch (error) {
  //     return errorResponse(req, res, error.message);
  //   }
  // }

  // /**
  //  * @returns {Promise<Cheat>}
  //  * @description Find Bitcoin
  //  */
  // async findBtc(req, res) {
  //   try {
  //     const cheat = await Cheats.findBitcoin();
  //     const message = "Bitcoin retrieved successfully";
  //     return successResponse(req, res, cheat, message);
  //   } catch (error) {
  //     return errorResponse(req, res, error.message);
  //   }
  // }

  /**
   * @param {Number} id
   * @param {Cheat} cheat
   * @returns {Promise<Cheat>}
   */
  async update(req, res) {
    try {
      const cheatId = req.params.id;
      const cheat = await Cheats.update(cheatId, req.body);
      const message = "Cheat updated successfully";
      return successResponse(req, res, cheat, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  /**
   * @param {Number} id
   * @returns {Promise<Cheat>}
   */
  async delete(req, res) {
    try {
      const cheatId = req.params.id;
      const cheat = await Cheats.delete(cheatId);
      const message = "Cheat deleted successfully";
      return successResponse(req, res, cheat, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }

  // /**
  //  * @param {String} symbol
  //  * @param {String[]} options
  //  * @returns {Promise<Cheat[]>}
  //  */
  // async getAveragePriceOfCheat(req, res) {
  //   try {
  //     let { symbol } = req.query;
  //     symbol += "USDT";
  //     const cheat = await Cheats.getPriceOfACheat(symbol);
  //     const message = "Average Price info retrieved successfully";
  //     return successResponse(req, res, cheat, message);
  //   } catch (error) {
  //     return errorResponse(req, res, error.message);
  //   }
  // }

  /**
   * @returns {Promise<Cheat[]>}
   * @description Get all cheats from Binance format USDT and create them in the database
   * @returns {Promise<Cheat[]>}
   */
  async setAllCheats(req, res) {
    try {
      const cheats = await Cheats.setAllCheatDB();
      const message = "Cheats retrieved successfully";
      return successResponse(req, res, cheats, message);
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  }
}

module.exports = CheatController;
