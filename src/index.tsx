import { h, render } from "preact";
import { App } from "./App";

const app = document.createElement("div");
document.body.appendChild(app);

render(<App />, app);
