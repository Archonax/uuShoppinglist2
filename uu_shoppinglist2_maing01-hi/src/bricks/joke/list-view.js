//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useRef, useLsi } from "uu5g05";
import importLsi from "../../lsi/import-lsi.js";
import { Button, Pending, useAlertBus, Grid } from "uu5g05-elements";
import Tile from "./tile2";
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
    const lsi = useLsi(importLsi,["UuShoppingList2.Bricks.Joke.ListView"]);
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
        ListView.logger.error("Error deleting item", error);
        showError(error, lsi.deleteFail);
        return;
      }

      addAlert({
        message: Utils.String.format(lsi.deleteDone,jokeDataObject.data.name),
        priority: "success",
        durationMs: 2000,
      });
    }

    async function handleUpdate(jokeDataObject) {
      try {
        await jokeDataObject.handlerMap.update();
      } catch (error) {
        ListView.logger.error("Error updating item", error);
        showError(error, lsi.updateFail);
      }
    }

    async function handleLoadNext() {
      try {
        await props.jokeDataList.handlerMap.loadNext({ pageInfo: { pageIndex: nextPageIndexRef.current } });
        nextPageIndexRef.current++;
      } catch (error) {
        ListView.logger.error("Error loading next page", error);
        showError(error, lsi.pageLoadFail);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const jokeList3 = props.jokeDataList.data.filter((item) => item !== undefined);// + props.jokeDataList.newData.filter((item)=>item!==undefined);
    const jokeList2 = props.jokeDataList.newData.filter((item) => item !== undefined);
    const jokeList = jokeList3.concat(jokeList2);
    return (
      <div {...attrs}>
        {jokeList.map((item) => (
          <Grid
          data={props.jokeDataList.data}
          onLoad={handleLoadNext}
          verticalGap={8}
          horizontalGap={8}
          tileHeight={300}
          tileMinWidth={400}
          tileMaxWidth={800}
          emptyState={lsi.noJokes}
        >
          <Tile
            key={item.data.id}
            jokeDataObject={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            className={Css.tile()}
          />
        </Grid>
          
        ))}
        <div className={Css.buttonArea()}>
          {props.jokeDataList.state !== "pending" && (
            <Button colorScheme="primary" onClick={handleLoadNext}>
              {lsi.loadNext}
            </Button>
          )}
          {props.jokeDataList.state === "pending" && <Pending />}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports