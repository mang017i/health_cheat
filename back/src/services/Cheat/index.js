const Cheat = require("../../models/index")["Cheat"];
const Category = require("../../models/index")["Category"];
const dotenv = require("dotenv");
const Pic = require("../../models/index")["Picture"];
const Picture = require("../../services/Picture");

// const qs = require("qs");
// const axios = require("axios");
// const moment = require("moment");
// const { filterCheatData } = require("../../helpers/index");
dotenv.config();


class CheatService {
  constructor() {
    this.cheat = Cheat;
  }

  /**
   * @param {Cheat} cheat
   * @returns {Promise<Cheat>}
   * @description Create cheat in db
   */
  async create(cheat) {
    return await this.cheat.create(cheat);
  }

  /**
   * @returns {Promise<Cheat[]>}
   * @description Return all cheats
   */
  async findAll() {
    return await this.cheat
      .findAll({
        include: [
          // {
          //   model: Category,
          //   as: "categories",
          // },
          {
            model: Pic,
            as: "picture"
          }
        ],

      })
      .then((cheats) => {
        if (cheats.length !== 0) {
          return cheats;
        } else {
          throw new Error("No cheats found");
        }
      });
  }

  /**
   * @param {Number} id
   * @returns {Promise<Cheat>}
   */
  async findOne(id) {
    return await this.cheat
      .findOne({
        where: {
          id: id,
        },
        include: [
        //   {
        //     model: Category,
        //     as: "categories",
        //   },
        {
          model: Pic,
          as: "picture"
        }
        ],
      })
      .then((cheat) => {
        if (cheat) {
          return cheat;
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  // /**
  //  * @returns {Promise<Cheat>}
  //  * @description Find Bitcoin Cheat
  //  */
  // async findBitcoin() {
  //   return await this.findBySymbol("BTCUSDT")
  //     .then((cheat) => {
  //       return cheat;
  //     })
  //     .catch(() => {
  //       throw new Error("Bitcoin not available");
  //     });
  // }

  /**
   * @param {Number} id
   * @param {Cheat} cheat
   * @returns {Promise<Cheat>}
   */
  async update(id, cheat) {
    return await this.cheat
      .update(cheat, {
        where: {
          id: id,
        },
      })
      .then((cheat) => {
        if (cheat) {
          return cheat;
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  /**
   * @param {Number} id
   * @returns {Promise<Cheat>}
   */
  async delete(id) {
    return await this.cheat
      .destroy({
        where: {
          id: id,
        },
      })
      .then((num) => {
        if (num == 1) {
          return this.findAll();
        }
      })
      .catch(() => {
        throw new Error("Cheat not found with id " + id);
      });
  }

  // /**
  //  * @param {String} symbol
  //  * @returns {Promise<Cheat>}
  //  */
  // async findBySymbol(symbol) {
  //   return await this.cheat
  //     .findOne({
  //       where: {
  //         symbol: symbol,
  //       },
  //     })
  //     .then((cheat) => {
  //       return cheat;
  //     })
  //     .catch(() => {
  //       throw new Error("Cheat not found with symbol " + symbol);
  //     });
  // }

  // /**
  //  * @param {String} symbol
  //  * @returns {Promise<Cheat>}
  //  * @description Get price of a cheat
  //  */
  // async getPriceOfACheat(symbol) {
  //   const cheat = await this.findBySymbol(symbol);
  //   return {
  //     symbol: cheat.symbol,
  //     price: cheat.price,
  //   };
  // }

  // /**
  //  * @param {String} symbol
  //  * @returns {Promise<Cheat>}
  //  * @description Checks if a cheat with the given symbol already exists
  //  */
  // async cheatExists(symbol) {
  //   const cheat = await this.findBySymbol(symbol);
  //   return cheat ? true : false;
  // }

  // /**
  //  * @returns {Promise<Cheat[]>}
  //  * @description Get all cheats from Binance format USDT and create them in the database
  //  */
  // async setAllCheatDB() {
  //   const url = "https://www.binance.com/api/v3/ticker/price";
  //   return await axios
  //     .get(url)
  //     .then((res) => {
  //       const filteredData = filterCheatData(res.data);
  //       filteredData.forEach(async (data) => {
  //         let newUrl = `https://api.binance.com/api/v3/ticker/24hr?symbol=${data.symbol}`;
  //         await axios
  //           .get(newUrl)
  //           .then((res) => {
  //             let symbol = data.symbol;
  //             let price = parseFloat(res.data.lastPrice).toFixed(2);
  //             let volume = parseFloat(res.data.volume).toFixed(2);
  //             let variation = parseFloat(res.data.priceChangePercent).toFixed(
  //               2
  //             );
  //             if (parseFloat(res.data.lastPrice) <= 50) {
  //               if (parseFloat(res.data.lastPrice) <= 10) return;
  //               const cheat = {
  //                 symbol: symbol,
  //                 price: price,
  //                 volume: volume,
  //                 variation: variation,
  //                 historic: {},
  //               };
  //               this.create(cheat);
  //             } else {
  //               const cheat = {
  //                 symbol: symbol,
  //                 price: price,
  //                 volume: volume,
  //                 variation: variation,
  //                 historic: {},
  //               };
  //               this.getHistoricOfCheat(cheat).then((res) => {
  //                 this.create(res).then((res) => {
  //                   let symb = data.symbol.slice(0, -4);
  //                   Picture.setPictureForAllCheats(symb, res.dataValues.id)
  //                 });
  //               });
  //             }
  //           })
  //           .catch((error) => {
  //             throw new Error(error.message);
  //           });
  //       });
  //     })
  //     .catch((error) => {
  //       throw new Error(error.message);
  //     });
  // }

  // /**
  //  * @param {String} symbol
  //  * @param {String[]} options
  //  * @returns {Promise<Cheat[]>}
  //  * @description Return candlestick data for a cheat
  //  */
  // async getHistoricOfCheat(cheat) {
  //   if (!cheat) {
  //     throw new Error("Cheat is required");
  //   }

  //   // REQUEST
  //   const baseUrl = `https://data.binance.com`;
  //   const endpoint = `/api/v3/klines`;
  //   const headers = {
  //     BINANCE_API_KEY: apiKeys,
  //     BINANCE_SECRET_KEY: apiSecret,
  //   };
  //   // SET ALL THE TIME
  //   const currentDate = moment().unix() * 1000;
  //   const oneHourAgo = moment().subtract(1, "hours").unix() * 1000;
  //   const fourHourAgo = moment().subtract(4, "hours").unix() * 1000;
  //   const sixHourAgo = moment().subtract(6, "hours").unix() * 1000;
  //   const eightHourAgo = moment().subtract(8, "hours").unix() * 1000;
  //   const twelveHourAgo = moment().subtract(12, "hours").unix() * 1000;
  //   const oneDayAgo = moment().subtract(1, "days").unix() * 1000;
  //   const threeDayAgo = moment().subtract(3, "days").unix() * 1000;
  //   const oneWeekAgo = moment().subtract(1, "weeks").unix() * 1000;
  //   const oneMonthAgo = moment().subtract(1, "months").unix() * 1000;

  //   const intervals = {
  //     hour: "1h",
  //     // fourHour: "4h",
  //     // sixHour: "6h",
  //     // eightHour: "8h",
  //     // twelveHour: "12h",
  //     // day: "1d",
  //     // threeDay: "3d",
  //     // week: "1w",
  //     // oneMonth: "1M",
  //   };

  //   const time = {
  //     // "1h": {
  //     //   start: oneHourAgo,
  //     //   end: currentDate,
  //     // },
  //     fourHour: {
  //       start: fourHourAgo,
  //       end: currentDate,
  //     },
  //     // "6h": {
  //     //   start: sixHourAgo,
  //     //   end: currentDate,
  //     // },
  //     // "8h": {
  //     //   start: eightHourAgo,
  //     //   end: currentDate,
  //     // },
  //     // "12h": {
  //     //   start: twelveHourAgo,
  //     //   end: currentDate,
  //     // },
  //     day: {
  //       start: oneDayAgo,
  //       end: currentDate,
  //     },
  //     // "3d": {
  //     //   start: threeDayAgo,
  //     //   end: currentDate,
  //     // },
  //     week: {
  //       start: oneWeekAgo,
  //       end: currentDate,
  //     },
  //     oneMonth: {
  //       start: oneMonthAgo,
  //       end: currentDate,
  //     },
  //   };

  //   let historic = {};
  //   for (let interval in intervals) {
  //     if (!intervals[interval]) {
  //       throw new Error(`Interval ${interval} is required`);
  //     }
  //     for (let timePeriod in time) {
  //       const { start, end } = time[timePeriod];
  //       const val = intervals[interval];
  //       const symbol = cheat.symbol;
  //       const queryParams = {
  //         symbol: `${symbol}`,
  //         interval: val,
  //         startTime: start,
  //         endTime: end,
  //         limit: 365,
  //       };
  //       const url = baseUrl + endpoint + "?" + qs.stringify(queryParams);
  //       await axios
  //         .get(url, { headers })
  //         .then((res) => {
  //           for (let bar of res.data) {
  //             if (!historic[timePeriod]) {
  //               historic[timePeriod] = [];
  //             }
  //             historic[timePeriod].push({
  //               Symbol: cheat.symbol,
  //               Open: bar[1],
  //               Close: bar[4],
  //               High: bar[2],
  //               Low: bar[3],
  //               Volume: bar[5],
  //               Time: moment(bar[0]).format("YYYY-MM-DD HH:mm:ss"),
  //             });
  //           }
  //         })
  //         .catch((error) => {
  //           throw new Error(error.message);
  //         });
  //     }
  //   }

  //   Object.assign(cheat.historic, historic);
  //   return cheat;
  // }
}

module.exports = CheatService;
