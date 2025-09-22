import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-card">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex-1 flex justify-start"></div>
          <Logo />
          <div className="flex-1 flex justify-end">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
