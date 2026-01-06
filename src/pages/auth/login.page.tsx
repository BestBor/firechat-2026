import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CardFooterAuth from "@/components/card-footer-auth"
import { useAuthActions } from "@/hooks/use-auth-action"

const LoginPage = () => {

  const { loading } = useAuthActions()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login using Email and Password or with Google
        </CardDescription>
      </CardHeader>
      <CardContent>
        Stuff...
      </CardContent>
      <CardFooterAuth
        type="login"
        loading={loading}
      />
    </Card>
  )
}
export default LoginPage