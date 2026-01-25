import { Button } from "@/components/ui/button"
import { useAuthActions } from "@/hooks/use-auth-actions"
import { useUser } from "reactfire"

const DashboardPage = () => {
  const {data: user} = useUser()
  const { logout } = useAuthActions()

  // Get initials from displayName
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  const initials = getInitials(user?.displayName)

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Profile Card */}
        <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-6 sm:p-8 shadow-sm space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <span className="text-2xl sm:text-3xl font-bold text-primary-foreground">
                {initials}
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-3 sm:space-y-4 text-center">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground break-words">
                {user?.displayName || "User"}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-all">
                {user?.email || "No email provided"}
              </p>
            </div>

            {/* Info Items */}
            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3 text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">Display Name</span>
                <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {user?.displayName || "Not set"}
                </span>
              </div>
              <div className="border-t border-border"></div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">Email</span>
                <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {user?.email || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 sm:pt-4">
            <button
              onClick={logout}
              className="w-full px-4 py-2 sm:py-2.5 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md hover:shadow-lg transition-all font-medium active:scale-95 text-sm sm:text-base"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-4 sm:mt-6 text-xs text-muted-foreground px-4">
          <p>You're all set! Enjoy your conversations.</p>
        </div>
      </div>
    </div>
  )
}
export default DashboardPage