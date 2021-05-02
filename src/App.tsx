import { h } from "preact";
import { Input } from "./components/Input";
import { Root } from "./components/Root";
import { useHosts } from "./hooks/useHosts";

export const App = () => {
  const [hosts, dispatch, load] = useHosts();
  return (
    <Root>
      <button onClick={() => load()}>Reload</button>
      {hosts}
    </Root>
  );
};
