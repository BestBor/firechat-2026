import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router"
import { useSigninCheck, useUser } from "reactfire"

const AdminLayout = () => {

  const {status, data:signInCheckResult, hasEmitted} = useSigninCheck()

  console.log({
    status,
    signInCheckResult,
    hasEmitted
  });

  // show loading while verifying logged status
  if (status === "loading") {
    return <div>Loading...</div>
  }

  // redirect if not authenticated
  if (status === "success" && !signInCheckResult.signedIn) {
    return <Navigate to={"/auth/login"} replace />
  }

  return (
    <Suspense fallback={<div>Loading User...</div>}>
      <AuthenticatedLayout />
    </Suspense>
  )
}
export default AdminLayout

const AuthenticatedLayout = () => {
  useUser({ suspense: true })
  
  return (
    <div>
      <Navbar/>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  )
}