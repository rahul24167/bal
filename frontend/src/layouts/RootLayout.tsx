import { NavLink, Outlet } from "react-router-dom";
import { Dumbbell } from "lucide-react";
import Auth from "@/components/Auth";
function RootLayout() {
  return (
    <>
      <header className=" sticky top-0 px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-md">
        <div>
          <NavLink className="flex items-center gap-2" to="/">
            <Dumbbell className="h-6 w-6" />
            
          </NavLink>
        </div>
        <span className="font-extrabold ml-4">
        <NavLink className="flex items-center gap-2" to="/">Bal</NavLink></span>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {/* Authentication signin /sign up and logout */}
          <Auth/>
          <NavLink
            className="text-sm font-medium hover:underline underline-offset-4"
            to="about"
          >
            About
          </NavLink>
          <NavLink
            className="text-sm font-medium hover:underline underline-offset-4"
            to="contact"
          >
            Contact
          </NavLink>
        </nav>
      </header>
      <Outlet />
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 FitTrack. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <NavLink
            className="text-xs hover:underline underline-offset-4"
            to="terms"
          >
            Terms of Service
          </NavLink>
          <NavLink
            className="text-xs hover:underline underline-offset-4"
            to="privacy"
          >
            Privacy
          </NavLink>
        </nav>
      </footer>
    </>
  );
}

export default RootLayout;
