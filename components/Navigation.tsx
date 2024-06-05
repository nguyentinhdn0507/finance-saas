"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import NavButton from "./NavButton";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia("(max-width: 1024px)", false);
  const pathName = usePathname();
  const router = useRouter();
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant={"outline"}
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none
             focus-visible:ring-offset-0 
            focus-visible:ring-transparent  outline-none  
            text-white focus:bg-white/30 transition
                "
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((item) => (
              <Button
                key={item.href}
                variant={item.href === pathName ? "secondary" : "ghost"}
                onClick={() => {
                  onClick(item.href);
                }}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((item) => (
        <NavButton
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={pathName === item.href}
        />
      ))}
    </nav>
  );
}
