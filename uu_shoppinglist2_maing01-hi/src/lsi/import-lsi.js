import { Utils } from "uu5g05";
import lsiEn from "./en.json";
import lsiCs from "./cs.json";

const libraryCode = "uu-shoppinglist2-maing01-hi";

const importLsi = (language) => import(`./${language}.json`);
importLsi.libraryCode = libraryCode;

Utils.Lsi.setDefaultLsi(libraryCode, { en: lsiEn });

export default importLsi;