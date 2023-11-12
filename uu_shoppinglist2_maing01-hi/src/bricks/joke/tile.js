//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Text, Line, Button, DateTime } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports
function arc(joke){
  if (joke.averageRating<1){
    return "ARCHIVED LIST";
  } else if (joke.averageRating>=1) {
    return "";
  }
}
const navigateHome = () => {
  // 👇️ navigate to /
  navigate('/jokes');
};
const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string,
      imageUrl: PropTypes.string,
      averageRating: PropTypes.number,
      uuIdentityName: PropTypes.string.isRequired,
      sys: PropTypes.shape({
        cts: PropTypes.string,
      }),
    }).isRequired,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onUpdate: () => {},
    onDelete: () => {},
    onDetail: () => {},
  },
  //@@viewOff:defaultProps
  
  render(props) {
    //@@viewOn:private
    function handleDelete(event) {
      props.onDelete(new Utils.Event(props.joke, event));
    }

    function handleUpdate(event) {
      props.onUpdate(new Utils.Event(props.joke, event));
    }

    function handleDetail(event) {
      props.onDetail(new Utils.Event(props.joke, event))
    }
    //@@viewOff:private

    //@@viewOn:render
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <Box {...elementProps}>
        <Text category="interface" segment="title" type="minor" colorScheme="building">
          {props.joke.name}
        </Text>
        <div>
          <Text category="interface" segment="content" type="medium" colorScheme="building">
            {props.joke.text}
          </Text>
        </div>
        <div>
          <img src={props.joke.imageUrl} />
        </div>
        <Line significance="subdued" />
        <div>
          <Text category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
            {props.joke.uuIdentityName}
          </Text>
        </div>
        <div>
          <Text category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
            <DateTime value={props.joke.sys.cts} />
          </Text>
        </div>
        
        <Box significance="distinct">
          <Text category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
            {arc(props.joke)}
          </Text>
          <Button icon="mdi-check" onClick={handleUpdate} significance="subdued" tooltip="Archive" />
          <Button icon="mdi-delete" onClick={handleDelete} significance="subdued" tooltip="Delete" />
          <a href="/jokes">Detail</a>
        </Box>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports