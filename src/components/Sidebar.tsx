import { Home, BookOpen, FileText, ClipboardList, History } from "lucide-react";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "AI Tutor", href: "/tutor", icon: BookOpen },
  { name: "Notes", href: "/notes", icon: FileText },
  { name: "Quizzes", href: "/quizzes", icon: ClipboardList },
  { name: "History", href: "/history", icon: History },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">ClassMate AI</h1>
            <p className="text-sm text-muted-foreground">Study Companion</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <p className="text-xs font-semibold text-muted-foreground mb-3 px-3">Learning Tools</p>
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};
