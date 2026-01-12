import { Button } from "@/components/ui/button"
import { useAuthActions } from "@/hooks/use-auth-actions"
import { useUser } from "reactfire"

const DashboardPage = () => {
  const {data: user} = useUser()
  const { logout } = useAuthActions()

  return (
    <div className="">
      <h1>Dashboard Page</h1>
      <p>Welcome, {user!.displayName || "Guest"}!</p>
      <p>Email: {user!.email || "Not Provided"}</p>
      <Button variant={"destructive"} onClick={logout}>
        SignOut
      </Button>
    </div>
  )
}
export default DashboardPage