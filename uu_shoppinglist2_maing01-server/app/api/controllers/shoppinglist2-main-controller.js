"use strict";
const Shoppinglist2MainAbl = require("../../abl/shoppinglist2-main-abl.js");

class Shoppinglist2MainController {
  init(ucEnv) {
    return Shoppinglist2MainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return Shoppinglist2MainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return Shoppinglist2MainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new Shoppinglist2MainController();
