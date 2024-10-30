import { BrowserRouter } from "react-router-dom";
import { LandingPage } from "./components/LandingPage"
import { LoginForm } from "./components/login-form"
import { SignupForm } from "./components/signup-form";
import { Navbar } from "./components/navbar";
 
function App() {
  return (
    <>
    {/* <LandingPage/> */}
    <Navbar></Navbar>

    <BrowserRouter>
    {/* <Routes>
      <Route path=""/>
    </Routes> */}
    <SignupForm/>
    <LoginForm/>
    </BrowserRouter>
    </>
  )
}


export default App