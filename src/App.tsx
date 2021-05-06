import { h } from "preact";
import { useState } from "preact/hooks";
import { AppTitle } from "./components/AppTitle";
import { HostInput } from "./components/HostInput";
import { Root } from "./components/Root";
import { UserAgentInput } from "./components/UserAgentInput";
import { useHosts } from "./hooks/useHosts";
import { useUserAgent } from "./hooks/useUserAgent";

export const App = () => {
  const [hosts, dispatch, _] = useHosts();
  const [userAgent, setUserAgent] = useUserAgent();
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
      <AppTitle />
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
      <UserAgentInput
        value={userAgent}
        onInput={(e) => setUserAgent((e.target as HTMLInputElement).value)}
      />
    </Root>
  );
};
