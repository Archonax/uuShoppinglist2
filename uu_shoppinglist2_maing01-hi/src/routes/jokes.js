//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { RouteController } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import ListProvider from "../bricks/joke/list-provider3";
import ListTitle from "../bricks/joke/list-title";
import ListView from "../bricks/joke/list-view";
import CreateView from "../bricks/joke/create-view";
import { withRoute } from "uu_plus4u5g02-app";
//@@viewOff:imports



/*function NameComponent() {
  const replaceHeaderText = () => {
      const newText = document.getElementById("inputField").value;
      document.getElementById("headerText").textContent = newText;
  };

  return (
      <div>
          <h1 id="headerText">Original List Name</h1>
          <input type="text" id="inputField" placeholder="Enter new list name" />
          <button onClick={replaceHeaderText}>Rename List</button>
      </div>
  );
}
function removeWords(inputList, textToRemove) {
  // Split the inputList into an array of words using a comma as the delimiter
  const words = inputList.split(',').map(word => word.trim());

  // Use filter to remove words that match the text exactly
  const filteredWords = words.filter(word => word !== textToRemove);

  // Join the filtered words back into a comma-separated string
  const result = filteredWords.join(', ');

  return result;
}
function UsersComponent(){
  const addUser = () => {
    const newText = document.getElementById("inputField2").value;
    document.getElementById("userList").textContent += ", ";
    document.getElementById("userList").textContent += newText;
};
const removeUser = () => {
  const allUsers = document.getElementById("userList").textContent;
  const removeText = document.getElementById("inputField3").value;
  const newText2 = removeWords(allUsers, removeText);
  document.getElementById("userList").textContent = newText2;
};
const leaveList = () => {
  alert('With this button, you will be able to leave the list once login functionality is complete.');
}
return (
    <div>
        <h2 id="userList">Users: You</h2>
        <input type="text" id="inputField2" placeholder="Enter user name" />
        <button onClick={addUser}>Invite</button>
        <input type="text" id="inputField3" placeholder="Enter user name" />
        <button onClick={removeUser}>Kick</button>
        <button onClick={leaveList}>Leave</button>
    </div>
);
}*/
//@@viewOn:css
const Css = {
  container: () => Config.Css.css({ maxWidth: 640, margin: "0px auto" }),
  createView: () => Config.Css.css({ margin: "24px 0px" }),
};
//@@viewOff:css

let Jokes = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Jokes",
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
Jokes = withRoute(Jokes, { authenticated: true });
//@@viewOn:exports
export { Jokes };
export default Jokes;
//@@viewOff:exports