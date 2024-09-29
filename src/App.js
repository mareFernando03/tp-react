import "./App.css";
import { CAppBar } from "./components/CAppBar";
import { CDynamicTabs } from "./components/CDynamicTabs";

function App() {
  return (
    <div className="App-body">
      <CAppBar />
      <CDynamicTabs />
    </div>
  );
}

export default App;
