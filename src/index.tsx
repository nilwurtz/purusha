import { h, render } from "preact";

export const App = () => {
  return <div>modHeader activated.</div>;
};

const app = document.createElement("div");
document.body.appendChild(app);

render(<App />, app);
