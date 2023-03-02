import "./App.scss";
import Main from "./pages/Main";
import Header from "./components/Header/Header";
import Market from "./components/Market/Market";

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
