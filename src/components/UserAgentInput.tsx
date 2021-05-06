import { FunctionComponent, h } from "preact";
import { JSXInternal } from "preact/src/jsx";

type Props = JSXInternal.HTMLAttributes<HTMLTextAreaElement>;

export const UserAgentInput: FunctionComponent<Props> = (props) => {
  return (
    <div className="user-agent">
      <label>User-Agent String</label>
      <textarea className="user-agent-input" {...props} rows={2} />
    </div>
  );
};
