import FormProfile from "@/components/profile/form-profile"
import { useUser } from "reactfire"

const ProfilePage = () => {

   const { data: user } = useUser()

   if (!user) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
   }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Edit Profile</h1>
            <p className="text-sm text-muted-foreground">Update your profile information</p>
          </div>
          <FormProfile user={user} />
        </div>
      </div>
    </div>
  )
}
export default ProfilePage