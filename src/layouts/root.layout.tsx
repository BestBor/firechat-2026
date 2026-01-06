import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <h1 className="text-center"></h1>
      <Toaster
        position="top-right"
        richColors
      />
    </div>
  )
}
export default RootLayout