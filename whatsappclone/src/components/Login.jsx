import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [alertMessage,setAlertMessage] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3001/api/login',{email,password});
            navigate(`/chat/${response.data.user._id}`);
        }
        catch(error){
            if (!error.response)
                setAlertMessage("Network Error: Check if backend is running");
            else
                setAlertMessage(error.response.data.message);
        }
        finally{
            setEmail("");
            setPassword("");
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center my-10">
                <div className="flex flex-col justify-center items-center rounded-xl shadow-xl shadow-gray-400 bg-gray-100 p-5 border border-gray-300">
                    <img src="/icon.png" width={100} height={100} alt="icon"></img>
                    <h1 className="font-sans select-none text-2xl font-semibold mb-4">Login</h1>
                    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-2">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="w-70 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 p-2 rounded-lg" placeholder="Email"/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className="w-70 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 p-2 rounded-lg" placeholder="Password"/>
                        <button type="submit" className="my-2 rounded-3xl px-5 py-3 font-bold bg-green-200 text-green-900 hover:cursor-pointer hover:bg-green-300 transition duration-300 ease-in-out">Login</button>
                    </form>
                </div>
                {
                    alertMessage !== "" && 
                    <div className="fixed inset-0 z-50 flex flex-col justify-center backdrop-blur-sm items-center">
                        <div className="select-none font-sans bg-gray-100 border border-gray-400 shadow-xl shadow-gray-400 p-4 w-80 rounded-xl ">
                            <p className="text-xl font-semibold text-center">{alertMessage}</p>
                            <div className="flex justify-center gap-x-6">
                                <button onClick={() => {setAlertMessage("")}} className="bg-green-300 w-25 rounded-3xl mt-4 p-2 hover:cursor-pointer">OK</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}