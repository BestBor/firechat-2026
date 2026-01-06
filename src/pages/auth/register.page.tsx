import CardFooterAuth from "@/components/card-footer-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthActions } from "@/hooks/use-auth-action"


const RegisterPage = () => {

  const { loading } = useAuthActions()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register your account using Email and Password or with Google
        </CardDescription>
      </CardHeader>
      <CardContent>
        Stuff...
      </CardContent>
      <CardFooterAuth
        type="register"
        loading={loading}
      />
    </Card>
  )
}
export default RegisterPage