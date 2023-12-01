//@@viewOn:imports
import { createComponent, Utils, useState } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const initialJokeList = [
  {
    id: Utils.String.generateId(),
    name: "carrot",
    text: "5 pcs",
    averageRating: 4,
    uuIdentityName: "John Smith",
    sys: { cts: "2022-03-17T09:48:38.990Z" },
  },
  {
    id: Utils.String.generateId(),
    name: "milk",
    text: "yes, milk",
    averageRating: 3,
    uuIdentityName: "Harry Potter",
    sys: { cts: "2022-02-14T10:48:38.990Z" },
  },
  {
    id: Utils.String.generateId(),
    name: "water",
    text: "mineral",
    imageUrl: "https://www.kancelarske-potreby-menzl.cz/_foto/vy_1530704252-sanpell750.jpeg",
    averageRating: 1,
    uuIdentityName: "Bart Simpson",
    sys: { cts: "2021-02-14T10:48:38.990Z" },
  },
];

/*const initialJokeList2 = [
  {
    id: Utils.String.generateId(),
    name: "User PH1",
    text: "user 1",
    averageRating: 4,
    uuIdentityName: "John Smith",
    sys: { cts: "2022-03-17T09:48:38.990Z" },
  },
  {
    id: Utils.String.generateId(),
    name: "User PH2",
    text: "user 2",
    averageRating: 3,
    uuIdentityName: "Harry Potter",
    sys: { cts: "2022-02-14T10:48:38.990Z" },
  },
];*/

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [jokeList, setJokeList] = useState(initialJokeList);
    
    function remove(joke) {
      setJokeList((prevJokeList) => prevJokeList.filter((item) => item.id !== joke.id));
    }

    function create(values) {
      const joke = {
        ...values,
        id: Utils.String.generateId(),
        averageRating: Math.round(Math.random() * 5), // <0, 5>
        uuIdentityName: "Gerald of Rivia",
        sys: {
          cts: new Date().toISOString(),
        },
      };

      setJokeList((prevJokeList) => [...prevJokeList, joke]);
      return joke;
    }

    function update(joke, values) {
      setJokeList((prevJokeList) => prevJokeList.filter((item) => item.id !== joke.id));
      const joke2 = {
        name: joke.name,
        id: joke.id,
        averageRating: 0, // <0, 5>
        uuIdentityName: "Done",
        sys: {
          cts: new Date().toISOString(),
        },
      };
      setJokeList((prevJokeList) => [...prevJokeList, joke2]);
      return joke2;
    }
    //@@viewOff:private

    //@@viewOn:render
    const value = { jokeList, remove, update, create };
    
    return typeof props.children === "function" ? props.children(value) : props.children;
    
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports