import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { NavLink, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
        <NavLink to="/" >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {/* we will add logo here instead of name*/}
              Bal
            </NavigationMenuLink>
          </NavLink>
          <NavLink to="/signup">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              SignUp
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
        <NavLink to="/signin">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              SignIn
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
