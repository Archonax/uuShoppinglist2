//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useLsi, ContentSizeProvider } from "uu5g05";
import { Form, FormText, FormSelect, FormFile, FormTextArea, SubmitButton, CancelButton } from "uu5g05-forms";
import { Grid } from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports
const Css = {
  controls: () =>
    Config.Css.css({
      display: "flex",
      gap: 8,
    }),
};
const CreateForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const lsi = useLsi(importLsi,["UuShoppingList2.Bricks.Joke.CreateForm"]);
    const { elementProps } = Utils.VisualComponent.splitProps(props);

    return (
      <ContentSizeProvider>
        <Form {...elementProps} onSubmit={props.onSubmit}>
          <Grid
            templateAreas={{
              xs: "name, categoryIdList, image, text, controls",
              m: "name name, categoryIdList image, text text, controls controls",
            }}
            templateColumns={{ m: "1fr 1fr" }}
            gap={8}
          >
            <Grid.Item gridArea="name">
              <FormText label={lsi.name} name="name" maxLength={255} required autoFocus />
            </Grid.Item>

            <Grid.Item gridArea="text">
              <FormTextArea label={lsi.text} name="text" maxLength={4000} rows={10} autoResize />
            </Grid.Item>

            <Grid.Item gridArea="controls" justifySelf="flex-end" className={Css.controls()}>
              <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
              <SubmitButton>{lsi.submit}</SubmitButton>
            </Grid.Item>
          </Grid>
        </Form>
      </ContentSizeProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateForm };
export default CreateForm;
//@@viewOff:exports