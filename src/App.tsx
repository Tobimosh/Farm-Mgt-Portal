import "./App.css";
import { Route, Routes } from "react-router-dom";
import FarmRegistrationForm from "./components/FarmRegistrationForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FarmRegistrationForm />} />
      </Routes>
    </>
  );
}

export default App;
