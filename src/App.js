import "./App.css";
import Form from "./components/Form";
import logo from "./assets/MA-logo.png";

function App() {
  return (
    <div className="container">
      <header className="header">
        <img className="header__logo" src={logo} alt="logo" />
      </header>
      <Form />
    </div>
  );
}

export default App;
