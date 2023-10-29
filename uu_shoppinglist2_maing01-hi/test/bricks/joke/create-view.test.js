import UuShoppinglist2 from "uu_shoppinglist2_maing01-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`UuShoppinglist2.Bricks.Joke.CreateView`, () => {
  testProperties(UuShoppinglist2.Bricks.Joke.CreateView, CONFIG);
});
