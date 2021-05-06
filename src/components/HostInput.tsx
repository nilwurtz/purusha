import { FunctionComponent, h } from "preact";
import { Input } from "./Input";

type Props = {
  value?: string;
  savedValue: boolean;
  onChange?: h.JSX.GenericEventHandler<HTMLInputElement>;
  onDelete?: () => void;
  onSave?: () => void;
};

export const HostInput: FunctionComponent<Props> = (props) => {
  return (
    <div className="host-input">
      <Input
        type="input"
        value={props.value}
        onChange={props.onChange}
        placeholder="Add new host."
      />
      <div className="host-buttons">
        <button className="btn-blue" onClick={props.onSave}>
          save
        </button>
        {props.savedValue && (
          <button className="btn-blue" onClick={props.onDelete}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};
