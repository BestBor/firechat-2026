import { toast } from "sonner"
import { Button } from "./ui/button"
import { CardFooter } from "./ui/card"
import { useAuthActions } from "@/hooks/use-auth-actions"

import { Mail } from "lucide-react"
import { Link } from "react-router"

interface Props{
    type: "login" | "register"
    loading: boolean
}

const CardFooterAuth = ({type, loading}: Props) => {

    const isLogIn = type === "login"

    const {loginWithGoogle} = useAuthActions()

    const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle()
    if (result.success){
      console.log("login succesful")
    } else {
      console.error("login failed", result.error)
      toast.error("Login Failed")
    }
  }

  return (
    <CardFooter className="flex flex-col items-center gap-4">
      <Button
        onClick={handleLoginWithGoogle}
        className="w-full"
        disabled={loading}
        variant={"outline"}
      >
        <Mail className="mr-2" />
        {isLogIn ? "Login with Google" : "Register with Google"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isLogIn ? "Don't have an account? " : "Already have an account? "}
        <Link
          to={isLogIn ? "/auth/register" : "/auth/login"}
          className="font-normal text-primary hover:underline"
        >
          {isLogIn ? "Register" : "Sign in"}
        </Link>
      </p>
    </CardFooter>
  );
}
export default CardFooterAuth