import "./App.scss";
import Main from "./pages/Main";
import Header from "./components/Header/Header";
import Market from "./components/Market/Market";
import Modal from "./components/Modal/Modal";
import Positions from "./components/Positions/Positions";

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <Market />
        <Positions />
      </Main>
    </div>
  );
}

export default App;
