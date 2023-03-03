import "./App.scss";
import Main from "./pages/Main";
import Header from "./components/Header/Header";
import Market from "./components/Market/Market";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <Market />
      </Main>
    </div>
  );
}

export default App;
