import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [nama, setNama] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(nama, username, email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Selamat Datang</h3>
      
      <label>Nama</label>
      <input 
        type="text" 
        onChange={(e) => setNama(e.target.value)} 
        value={nama} 
      />
      <label>Username</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>Email</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Daftar</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup