//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useState } from "uu5g05"; //useState for archive button
import { useAlertBus } from "uu5g05-elements";
import Tile from "./tile";
import Config from "./config/config.js";
//@@viewOff:imports

const ListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeList: PropTypes.array.isRequired,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onFilterList: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokeList: [],
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { addAlert } = useAlertBus();

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function handleDelete(event) {
      const joke = event.data;

      try {
        props.onDelete(joke);
        addAlert({
          message: `The list ${joke.name} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Error deleting list", error);
        showError("text", "List delete failed! You are not the owner of this list.", "text2");
      }
    }

    function handleUpdate(event) {
      try {
        props.onUpdate(event.data);
      } catch (error) {
        ListView.logger.error("Error archiving list", error);
        showError(error, "List archive failed!");
      }
    }
    /*function handleFilter(event) {
      try {
        props.onFilterList(event.data);
      } catch (error) {
        ListView.logger.error("Error filtering list", error);
        showError(error, "List filter failed!");
      }
    }*/
    /*function handleDetail(event){
        try {

        } catch (error) {
            showError(error, "Error loading detail");
        }
    }*/
    //@@viewOff:private
    

    //@@viewOn:render
    
    let a = 1;
    const arcfunc=()=>{
      a++;
      if (a%3){
        a++;
      }
    }
    const attrs = Utils.VisualComponent.getAttrs(props);

    //let showArchived=false;
    const [showArchived, setShowArchived]= useState();
    const jokeFList = props.jokeList.filter((joke => joke.averageRating !==0))
    if(showArchived==true){
    return (
      <div {...attrs}>
        <button onClick={()=>setShowArchived(true)}>Show Archived</button>
        <button onClick={()=>setShowArchived(false)}>Hide Archived</button>
        
        {props.jokeList.map((joke) => (
          
          <Tile
            key={joke.id}
            joke={joke}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            style={{ width: 640, margin: "24px auto" }}
          />
        ))}
      </div>
    );
    }else{
      return (
        <div {...attrs}>
          <button onClick={()=>setShowArchived(true)}>Show Archived</button>
          <button onClick={()=>setShowArchived(false)}>Hide Archived</button>
          
          {jokeFList.map((joke) => (
            
            <Tile
              key={joke.id}
              joke={joke}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              style={{ width: 640, margin: "24px auto" }}
            />
          ))}
        </div>
      );
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports