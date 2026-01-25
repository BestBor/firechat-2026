import { useAuthActions } from "@/hooks/use-auth-actions"
import {
    LayoutDashboard,
    MessageCircle,
    User,
    ListTodo,
    LogOut
} from "lucide-react"
import { NavLink } from "react-router"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const navigation = [
    {name: "Dashboard", href: "/admin", icon: LayoutDashboard},
    {name: "Chat", href: "/admin/chat", icon: MessageCircle},
    {name: "Profile", href: "/admin/profile", icon: User},
    {name: "Tasks", href: "/admin/tasks", icon: ListTodo},
]

const Navbar = () => {

    const { logout } = useAuthActions()

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <nav className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-6 overflow-x-auto">
          {/* Navigation Links */}
          <div className="flex gap-1 sm:gap-4 flex-1 overflow-x-auto">
            {
                navigation.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={
                            ({isActive}) => (
                                cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm sm:text-base font-medium",
                                    isActive 
                                        ? "bg-primary text-primary-foreground shadow-md" 
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )
                            )
                        }
                        end
                    >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="hidden sm:inline">{ item.name }</span>
                    </NavLink>
                ))
            }
          </div>
          
          {/* Logout Button */}
          <button
            onClick={logout}
            className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-all shadow-md hover:shadow-lg font-medium text-sm sm:text-base active:scale-95 flex-shrink-0"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
    </header>
  )
}
export default Navbar