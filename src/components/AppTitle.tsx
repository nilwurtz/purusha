import { h } from "preact";
import { config } from "../config";

export const AppTitle = () => {
  return (
    <header className="app-title">
      <div>{config.name}</div>
    </header>
  );
};
