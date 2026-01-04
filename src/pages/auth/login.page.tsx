import { useAuthActions } from "../../hooks/use-auth-action"

const LoginPage = () => {

  const {loginWithGoogle} = useAuthActions()

  return (
    <>
      <h1>Login</h1>
      <button onClick={loginWithGoogle}>
        Login with Google
      </button>
    </>
  )
}
export default LoginPage