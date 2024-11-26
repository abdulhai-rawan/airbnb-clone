"use client";

import Categories from "./categories";
import Container from "@/components/container";
import Logo from "@/components/navbar/logo";
import Search from "@/components/navbar/search";
import UserMenu from "@/components/navbar/user-menu";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = () => {
  const user = useCurrentUser();
  console.log(user);
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>

      <Categories />
    </div>
  );
};

export default Navbar;
