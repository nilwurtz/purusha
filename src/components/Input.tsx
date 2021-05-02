import { FunctionalComponent, h } from "preact";

type Props = h.JSX.HTMLAttributes<HTMLInputElement>;

export const Input: FunctionalComponent<Props> = (props) => {
  return <input {...props} onChange={props.onChange} />;
};
