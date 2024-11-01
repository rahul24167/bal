import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="signin" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
