//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { RouteController } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import ListProvider from "../bricks/joke/list-provider4";
import ListTitle from "../bricks/joke/list-title";
import ListView from "../bricks/joke/list-view3";
import CreateView from "../bricks/joke/create-view2";
//@@viewOff:imports


/*function ArcComponent() {
  let arc=1;
  const arcfunc=()=>{
    arc+=1;
  };
  return (
  <div>
    <button onClick={arcfunc}>Archive</button>
  </div>
  );
}*/

//@@viewOn:css
const Css = {
  container: () => Config.Css.css({ maxWidth: 640, margin: "0px auto" }),
  createView: () => Config.Css.css({ margin: "24px 0px" }),
};
//@@viewOff:css

let Lists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Lists",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ListProvider>
          {(jokeDataList) => (
            <RouteController routeDataObject={jokeDataList}>
              <div className={Css.container()}>
                <CreateView jokeDataList={jokeDataList} className={Css.createView()} />
                <ListView jokeDataList={jokeDataList} />
                <ListTitle jokeList={jokeDataList.data} />
              </div>
            </RouteController>
          )}
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});
//Jokes = withRoute(Jokes, { authenticated: true });
//@@viewOn:exports
export { Lists };
export default Lists;
//@@viewOff:exports