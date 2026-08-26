import React from "react";
import { Menu } from "lucide-react";

import { Button } from "../../atom/button/button";
import { SearchBar } from "../../molecule/search-bar/search-bar";

export interface HeaderProps {
  logo?: string;
  onMenuClick?: () => void;
  onLoginClick?: () => void;
}

export const Header = ({
  logo = "JEDA",
  onMenuClick,
  onLoginClick,
}: HeaderProps) => {
  return (
    <header
        className="
        sticky
        top-0
        z-50
        flex
        items-center
        gap-7.75
        h-21
        px-5.25
        border
        border-(--primary-hover)
        bg-(--primary-hover-bg)
      "
    >
      {/* MENU */}
      <button
        type="button"
        aria-label="Menu"
        onClick={onMenuClick}
        className="
          flex
          w-11.5
          h-11
          shrink-0
          items-center
          justify-center
          rounded-md
          bg-transparent
          text-(--primary)
          hover:bg-(--primary-hover-bg)
        "
      >
        <Menu size={24} strokeWidth={2} />
      </button>

      {/* LOGO */}
      <div
        className="
          shrink-0
          text-2xl
          font-bold
          text-(--primary)
        "
      >
        {logo}
      </div>

      {/* SEARCH */}
      <SearchBar />

      {/* LOGIN */}
      <Button
        variant="primary"
        onClick={onLoginClick}
      >
        Masuk
      </Button>
    </header>
  );
};
