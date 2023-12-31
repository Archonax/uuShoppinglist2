//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, useRoute } from "uu5g05";
import { useSubAppData } from "uu_plus4u5g02";
import Plus4U5App from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports
const Css = {
};
const darkmode = () => {
}
const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();
    const subAppDataObject = useSubAppData();
    const lsi = useLsi(importLsi, ["UuShoppingList2.Core.RouteBar"]);
    //console.log(lsi+"999");
    const appActionList = [
      { children: lsi.home, onClick: () => setRoute("home") },
      { children: lsi.jokes, onClick: () => setRoute("jokes") },
      { children: lsi.lists, onClick: () => setRoute("lists") },
      { children: lsi.about, onClick: () => setRoute("about"), collapsed: true },
    ];
    //@@viewOff:private
    console.log(subAppDataObject.data);
    //@@viewOn:render
    return (
      <Plus4U5App.RouteBar appActionList={appActionList} {...props}>
        <Plus4U5App.RouteHeader title={Utils.String.format(lsi.title, ""/*subAppDataObject.data.name*/)} />
        <button style={{marginLeft: 5 }} onclick={()=>darkmode()}>{lsi.dark}</button>
      </Plus4U5App.RouteBar>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports