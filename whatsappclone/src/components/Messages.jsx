import { useEffect, useState, useRef } from "react";
import { BsChatSquareText } from "react-icons/bs";
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";

export default function ChatList(props){

    const [user,setUser] = useState(null);
    const [message,setMessage] = useState("");
    const [chat,setChat] = useState([]);
    const [senderName,setSenderName] = useState("");

    const params = useParams();
    const senderId = params.id;
    const receiverId = props.selectedChat;
    const chatRef = useRef();

    // SCROLL TO END
    useEffect(() => {
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
    },[chat]);

    // TO GET THE RECEIVER
    useEffect(() => {
        async function getUser(){
            try{
                if (!props.selectedChat) return;
                const response = await axios.get(`http://localhost:3001/api/getUserById/${props.selectedChat}`);
                setUser(response.data);
            }
            catch(error){
                alert(error);
            }
        }
        getUser();
    },[props.selectedChat]);

    // TO GET THE SENDER NAME
    useEffect(() => {
        async function getSender(){
            try{
                const response = await axios.get(`http://localhost:3001/api/getUserById/${params.id}`);
                setSenderName(response.data.name);
            }
            catch(error){
                alert(error);
            }
        }
        getSender();
    },[params.id]);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            console.log(senderName);
            const response = await axios.post("http://localhost:3001/api/sendMessage",{senderId,receiverId,senderName,message});
            getChat();
        }
        catch(error){
            alert(error);
        }
        finally{
            setMessage("");
        }
    }

    // TO GET THE CHAT PERTAINING TO THAT RECEIVER
    async function getChat(){
        try{
            const response = await axios.post("http://localhost:3001/api/getChat",{senderId,receiverId});
            setChat(response.data);
            const chatList = response.data;
            if (chatList.length > 0){
                const last = chatList[chatList.length - 1]
                props.setLastMessages(prev => ({...prev, [receiverId]:{message:last.message,time:last.time}}));
            }
        }
        catch(error){
            alert(error);
        }
    }
    useEffect(() => {
        getChat();
    },[senderId,receiverId]);

    return (
        <>
            <div className="bg-[#F2EFE9] h-full bg-[url('/doodle.png')] bg-repeat">
                {
                    
                    props.selectedChat === null ? 
                        <div className="select-none flex justify-center items-center h-screen">
                            <div className="bg-white w-100 h-100 rounded-3xl">
                                <div className="flex flex-col justify-center items-center">
                                    <img className="mt-5 mb-7" src="/whatsappwindows.png"></img>
                                    <h1 className="font-semibold text-2xl">Download WhatsApp for</h1>
                                    <h1 className="font-semibold text-2xl mb-3">Windows</h1>
                                    <p className="text-gray-600">Get extra features like voice and video calling,</p>
                                    <p className="text-gray-600 mb-5">screen sharing and more.</p>
                                    <button onClick={() => window.location.href="https://www.whatsapp.com/download/desktop?lang=en"} className="rounded-3xl px-5 py-3 font-bold bg-green-200 text-green-900 hover:cursor-pointer hover:bg-green-300">Download</button>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="flex flex-col h-full">
                            <div className="flex flex-row items-center justify-between bg-white">
                                <div  className="flex items-center gap-x-4">
                                    <div className="flex items-center justify-center font-bold text-xl w-12 h-12 my-4 ml-4 font-sans rounded-full border border-gray-400">
                                        <FaUser />
                                    </div>
                                    <div className="flex items-center justify-center font-bold text-xl h-12 font-sans">
                                        <h1 className="font-semibold text-2xl">{user && user.name}</h1>
                                    </div>
                                </div>
                                <div className="text-2xl cursor-pointer pr-5">
                                    <IoSearchSharp />
                                </div>
                            </div>

                            <div ref={chatRef} className="flex-1 overflow-y-auto p-4">
                                {
                                    chat &&
                                        chat.map((c,index) => (
                                            <div key={index} className={c.senderId === params.id ? "flex justify-end mb-2" : "flex justify-start mb-2"}>
                                                <div className="flex flex-col max-w-[60%]">
                                                    <div className={c.senderId === params.id ? "relative px-3 py-2 pb-5 min-w-[60px] rounded-2xl break-words bg-[#D9FDD3] rounded-br-none" : "relative px-3 py-2 pb-5 min-w-[60px] rounded-2xl break-words bg-white text-black rounded-bl-none"}>{c.message}
                                                        <span className="absolute bottom-1 right-2 text-[10px] text-gray-500">
                                                            {new Date(c.time).toLocaleTimeString([], {
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                                })}
                                                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>

                            <div className="bg-white shadow-xl rounded-full mx-4 mb-4 px-4 py-2 flex items-center gap-x-3">
                                <form className="flex items-center gap-x-3 w-full" onSubmit={(e) => handleSubmit(e)}>
                                    <input required value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 p-2 text-lg rounded-xl focus:outline-none" type="text" placeholder="Type a message"/>
                                    <button type="submit"><IoSend className="text-2xl text-green-600 cursor-pointer" /></button>
                                </form>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}