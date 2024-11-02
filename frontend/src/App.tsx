import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="signin" element={<LoginForm />} />
      {/* error page */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
