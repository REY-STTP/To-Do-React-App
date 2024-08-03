import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(usernameOrEmail, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Selamat Datang</h3>
      
      <label>Username atau Email</label>
      <input 
        type="text" 
        onChange={(e) => setUsernameOrEmail(e.target.value)} 
        value={usernameOrEmail} 
      />
      <label>Password</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Masuk</button>
      
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login