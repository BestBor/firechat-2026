import { useAuth, useUser } from "reactfire"

const DashboardPage = () => {

  const auth = useAuth()
  const {data: user} = useUser()

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {user?.displayName || "Guest"}!</p>
      <p>Email: {user?.email || "Not Provided"}</p>
      <button onClick={() => {
        auth.signOut()
      }}>
        SignOut
      </button>
    </div>
  )
}
export default DashboardPage