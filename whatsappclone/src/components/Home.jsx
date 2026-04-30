import { Link, Outlet } from "react-router-dom";

export default function Home(){
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="my-5 font-sans select-none text-2xl font-semibold mb-4">Welcome to WhatsApp</h1>
                <div className="flex flex-row gap-x-6">
                    <Link to="/register"><button className="w-30 my-2 rounded-3xl px-5 py-3 font-bold bg-green-200 text-green-900 hover:cursor-pointer hover:bg-green-300 transition duration-300 ease-in-out">Register</button></Link>
                    <Link to="/login"><button className="w-30 my-2 rounded-3xl px-5 py-3 font-bold bg-green-200 text-green-900 hover:cursor-pointer hover:bg-green-300 transition duration-300 ease-in-out">Login</button></Link>
                </div>
                <Outlet />
            </div>
        </>
    )
}