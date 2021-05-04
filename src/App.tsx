import { h } from "preact";
import { useState } from "preact/hooks";
import { HostInput } from "./components/HostInput";
import { Root } from "./components/Root";
import { useHosts } from "./hooks/useHosts";

export const App = () => {
  const [hosts, dispatch, load] = useHosts();
  const [state, setState] = useState("");

  const onChange = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const { value } = e.target as HTMLInputElement;
    setState(value);
  };

  return (
    <Root>
      <div className="host-inputs">
        {hosts.map((host, index) => (
          <HostInput
            key={index}
            savedValue
            value={host}
            onDelete={() => dispatch({ type: "DELETE", index })}
          />
        ))}
        <HostInput
          value={state}
          savedValue={false}
          onChange={onChange}
          onSave={() => dispatch({ type: "ADD", value: state })}
        />
      </div>
    </Root>
  );
};
