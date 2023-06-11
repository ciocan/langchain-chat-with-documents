import { signIn } from "next-auth/react"


function LoginButton() {
  return (<>
    Not signed in <br />
    <button onClick={() => signIn('google')}>Sign in</button>
  </>)
}


export default LoginButton