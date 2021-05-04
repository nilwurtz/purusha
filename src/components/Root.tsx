import { FunctionComponent, h } from "preact";

export const Root: FunctionComponent = (props) => {
  return <div className="app-root">{props.children}</div>;
};
