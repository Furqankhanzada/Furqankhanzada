import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import ToggleThemeMod from "@/components/toggle-theme-mod";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "https://www.upwork.com/fl/muhammadf447", label: "Upwork", external: true },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-14 w-full max-w-[1400px] items-center px-6 sm:px-8">
        {links.map(({ href, label, external }) => (
          <Link
            key={href}
            href={href}
            className={buttonVariants({ variant: "ghost" })}
            {...(external && { target: "_blank", rel: "noreferrer" })}
          >
            {label}
          </Link>
        ))}
        <div className="ml-auto">
          <ToggleThemeMod />
        </div>
      </nav>
    </header>
  );
}
