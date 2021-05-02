import { h } from "preact";
import { Input } from "./components/Input";
import { Root } from "./components/Root";

export const App = () => {
  const target = "http://hogehoge.com";
  return (
    <Root>
      <Input onChange={(e) => console.log(e)} />
    </Root>
  );
};
