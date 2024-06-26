import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext);
    

    async function handleLoginSubmit(event) {
        event.preventDefault();
        try {
            const {data} = await axios.post('/login', {email, password})
            setUser(data)
            alert('Login successful')
            setRedirect(true)
        } catch (exception) {
            alert('Login failed')
            console.log(exception)
        }
        
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="your@email.com" 
                value={email} 
                onChange={event => setEmail(event.target.value)} />
                <input type="password" placeholder="password" 
                value={password} 
                onChange={event => setPassword(event.target.value)} />
                <button className="primary hover:bg-primaryhover focus:outline-none focus:ring mt-1">Login</button>
                <div className="text-center py-2 text-gray-500">
                    <span className="block">Don't have an account yet?</span>
                    <Link to="/register" className="block mt-1 underline text-black hover:text-blue-500 hover:underline">Register now</Link>
                </div>
            </form>
            </div>
        </div>
    )
}