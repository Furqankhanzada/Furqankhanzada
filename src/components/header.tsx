import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import ToggleThemeMod from "@/components/toggle-theme-mod";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} target="_blank" href="https://www.upwork.com/fl/muhammadf447">
                Upwork
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex flex-1 justify-end">
          <ToggleThemeMod />
        </div>
      </div>
    </header>
  )
}
