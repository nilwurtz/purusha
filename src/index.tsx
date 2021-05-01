import { h, render } from "preact";

export const App = () => {
  return <div>modHeader activated.</div>;
};

render(<App />, document.getElementById("root") as Element);
