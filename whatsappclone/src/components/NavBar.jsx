import { useState } from "react";
import { BsChatSquareText } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function ChatList(){

    const [clicked,setClicked] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-gray-100 min-h-screen w-15 border-r border-gray-300">
                <div className="flex flex-col mt-5 gap-y-5 justify-center items-center text-2xl">
                    <div className={!clicked ? "bg-gray-300 p-2 rounded-xl hover:cursor-pointer" : "hover:bg-gray-300 p-2 rounded-xl hover:cursor-pointer"}>
                        <BsChatSquareText  />
                    </div>
                    <div className={clicked ? "bg-gray-300 p-1 rounded-lg hover:cursor-pointer" : "hover:bg-gray-300 p-1 rounded-lg hover:cursor-pointer"} onClick={() => setClicked(true)}>
                        <LuLogOut  />
                    </div>
                </div>
                {
                    clicked && 
                    <div className="fixed inset-0 z-50 flex flex-col justify-center backdrop-blur-sm items-center">
                        <div className="select-none font-sans bg-gray-100 border border-gray-400 shadow-xl shadow-gray-400 p-4 w-80 rounded-xl ">
                            <p className="text-2xl font-semibold">Log out?</p>
                            <div className="flex justify-center gap-x-6">
                                <button onClick={() => {setClicked(false)}} className="bg-green-300 w-25 rounded-3xl mt-4 p-2 hover:cursor-pointer">Cancel</button>
                                <button onClick={() => {navigate("/login")}} className="text-white bg-red-500 rounded-3xl w-25 mt-4 p-1 hover:cursor-pointer">Log out</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}