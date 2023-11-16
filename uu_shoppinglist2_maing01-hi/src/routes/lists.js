//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import ListProvider from "../bricks/joke/list-provider2.js";
import ListView from "../bricks/joke/list-view2.js";
import CreateView from "../bricks/joke/create-view2.js";
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

let Lists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Lists",
  //@@viewOff:statics
  
  render(a) {
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ListProvider>
          {({ jokeList, remove, update, create, filterList }) => (
            <>
              <CreateView onCreate={create} style={{ maxWidth: 400, margin: "24px auto", display: "block" }} />
              <ListView jokeList={jokeList} onDelete={remove} onUpdate={update} />
            </>
          )}
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});

Lists = withRoute(Lists, { authenticated: true });

//@@viewOn:exports
export { Lists };
export default Lists;
//@@viewOff:exports