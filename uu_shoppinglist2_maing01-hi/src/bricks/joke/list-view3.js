//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useRef, useState } from "uu5g05";
import { Button, Pending, useAlertBus } from "uu5g05-elements";
import Tile from "./tile";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  tile: () => Config.Css.css({ marginBottom: 24 }),
  buttonArea: () => Config.Css.css({ textAlign: "center", marginBottom: 24 }),
};
//@@viewOff:css

const ListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataList: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { addAlert } = useAlertBus();
    const nextPageIndexRef = useRef(1);

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    async function handleDelete(jokeDataObject) {
      try {
        await jokeDataObject.handlerMap.delete();
      } catch (error) {
        ListView.logger.error("Error deleting list", error);
        showError(error, "List delete failed!");
        return;
      }

      addAlert({
        message: `The list ${jokeDataObject.data.name} has been deleted.`,
        priority: "success",
        durationMs: 2000,
      });
    }

    async function handleUpdate(jokeDataObject) {
      try {
        await jokeDataObject.handlerMap.update();
      } catch (error) {
        ListView.logger.error("Error updating list", error);
        showError(error, "List update failed!");
      }
    }

    async function handleLoadNext() {
      try {
        await props.jokeDataList.handlerMap.loadNext({ pageInfo: { pageIndex: nextPageIndexRef.current } });
        nextPageIndexRef.current++;
      } catch (error) {
        ListView.logger.error("Error loading next page", error);
        showError(error, "Page loading failed!");
      }
    }
    //@@viewOff:private
//@@viewOn:render
const attrs = Utils.VisualComponent.getAttrs(props);
let a = 1;
const arcfunc=()=>{
  a++;
  if (a%3){
    a++;
  }
}
const jokeList = props.jokeDataList.data.filter((item) => item !== undefined);
//let showArchived=false;
const [showArchived, setShowArchived]= useState();
const jokeFList = props.jokeDataList.data.filter((item) => (item!==undefined)&&(item.data.averageRating !==0));
if(showArchived==true){
return (
  <div {...attrs}>
    <button onClick={()=>setShowArchived(true)}>Show Archived</button>
    <button onClick={()=>setShowArchived(false)}>Hide Archived</button>
    
    {jokeList.map((item) => (
          <Tile
            key={item.data.id}
            jokeDataObject={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            className={Css.tile()}
          />
        ))}
  </div>
);
}else{
  return (
    <div {...attrs}>
      <button onClick={()=>setShowArchived(true)}>Show Archived</button>
      <button onClick={()=>setShowArchived(false)}>Hide Archived</button>
      
      {jokeFList.map((item) => (
          <Tile
            key={item.data.id}
            jokeDataObject={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            className={Css.tile()}
          />
        ))}
      <div className={Css.buttonArea()}>
          {props.jokeDataList.state !== "pending" && (
            <Button colorScheme="primary" onClick={handleLoadNext}>
              Load next 3 lists
            </Button>
          )}
          {props.jokeDataList.state === "pending" && <Pending />}
        </div>
    </div>
  );
}
//@@viewOff:render
    //@@viewOn:render
    /*const attrs = Utils.VisualComponent.getAttrs(props);
    const jokeList = props.jokeDataList.data.filter((item) => item !== undefined);

    return (
      <div {...attrs}>
        {jokeList.map((item) => (
          <Tile
            key={item.data.id}
            jokeDataObject={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            className={Css.tile()}
          />
        ))}
        <div className={Css.buttonArea()}>
          {props.jokeDataList.state !== "pending" && (
            <Button colorScheme="primary" onClick={handleLoadNext}>
              Load next 3 jokes
            </Button>
          )}
          {props.jokeDataList.state === "pending" && <Pending />}
        </div>
      </div>
    );
    //@@viewOff:render*/
  },
});

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports