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

  const addNewHost = () => {
    dispatch({ type: "ADD", value: state });
    setState("");
  };

  return (
    <Root>
      <div className="host-inputs">
        {hosts.length >= 0 &&
          hosts.map((host, index) => (
            <HostInput
              key={index}
              savedValue
              value={host}
              onChange={(e) =>
                dispatch({
                  type: "EDIT",
                  index,
                  value: (e.target as HTMLInputElement).value,
                })
              }
              onDelete={() => dispatch({ type: "DELETE", index })}
            />
          ))}
        <HostInput
          value={state}
          savedValue={false}
          onChange={onChange}
          onSave={addNewHost}
        />
      </div>
    </Root>
  );
};
