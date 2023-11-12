//@@viewOn:imports
import { createComponent, Utils, useState } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

const initialJokeList = [
  {
    id: Utils.String.generateId(),
    name: "List 1",
    text: "Groceries",
    averageRating: 5,
    uuIdentityName: "John Smith",
    sys: { cts: "2022-03-17T09:48:38.990Z" },
  },
  {
    id: Utils.String.generateId(),
    name: "List 2",
    text: "Dishes",
    averageRating: 5,
    uuIdentityName: "Harry Potter",
    sys: { cts: "2022-02-14T10:48:38.990Z" },
  },
  {
    id: Utils.String.generateId(),
    name: "List 3",
    text: "Hygiene",
    //imageUrl: "https://www.kancelarske-potreby-menzl.cz/_foto/vy_1530704252-sanpell750.jpeg",
    averageRating: 5,
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
        if(joke.uuIdentityName=="Gerald of Rivia"){
            setJokeList((prevJokeList) => prevJokeList.filter((item) => item.id !== joke.id));
        }else{
            Owner=("test");
        }
    }
    /*function removearc(joke){
      {props.jokeList.map((joke) => (
        if(joke.averageRating==5){
          setJokeList((prevJokeList) => prevJokeList.filter((item) => item.id !== joke.id));
        }
      ))
    }*/
    function create(values) {
      const joke = {
        ...values,
        id: Utils.String.generateId(),
        averageRating: 5, // <0, 5>
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
      var avr = 0;
      if (joke.averageRating==0) avr=5;
      const joke2 = {
        name: joke.name,
        id: joke.id,
        averageRating: avr,  // <0, 5>
        text: joke.text,
        uuIdentityName: joke.uuIdentityName,
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