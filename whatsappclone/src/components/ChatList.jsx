import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function ChatList(props) {
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [searchName, setSearchName] = useState("");
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [lastMessages, setLastMessages] = useState({});

    const params = useParams();

    function handleChatClick(id) {
        props.setSelectedChat(id);
        setSelectedChatId(id);
    }

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(`http://localhost:3001/api/getUsers/${params.id}`);
                let chatList = response.data;
                chatList = chatList.filter((cl) => cl.name.toLowerCase().includes(searchName.toLowerCase()));
                setUsers(chatList);
                setErrorMsg("");
            } 
            catch (error){
                setErrorMsg(error.response?.data?.message || "Failed to load users");
            }
        }
        fetchUsers();
    },[params.id,searchName,lastMessages]);


    useEffect(() => {
        if (users.length === 0) return;

        async function fetchLastMessages() {
            try {
                const temp = {};
                await Promise.all(
                    users.map(async (u) => {
                        const chatRes = await axios.post("http://localhost:3001/api/getChat", {
                            senderId: params.id,
                            receiverId: u._id,
                        });
                        const chatList = chatRes.data;
                        if (chatList.length > 0) {
                            const last = chatList[chatList.length - 1];
                            temp[u._id] = {
                                message: last.message,
                                time: last.time,
                            };
                        }
                    })
                );
                setLastMessages(temp);
            } 
            catch (err){
                console.error("Failed to fetch last messages", err);
            }
        }
        fetchLastMessages();
    }, [users, params.id]);

    return (
        <div className="flex flex-col bg-white h-screen overflow-hidden w-110 border-r border-gray-300">
            <h1 className="select-none font-sans m-4 font-semibold text-2xl text-green-600">WhatsApp</h1>
            <input value={searchName} onChange={(e) => setSearchName(e.target.value)} type="text" className="mb-2 font-sans flex mx-auto pl-5 p-1 h-9 w-100 rounded-2xl bg-gray-100 focus:outline-none focus:ring-1 focus:ring-green-600" placeholder="Search or start a new chat"/>
            <div className="select-none flex flex-col flex-1 overflow-y-auto my-2">
                {users.length !== 0 ? (
                    users.map((user) => (
                        <div key={user._id} onClick={() => handleChatClick(user._id)} className={user._id === selectedChatId ? "mx-3 flex flex-row rounded-xl bg-gray-100 mt-1" : "mx-3 mt-1 flex flex-row rounded-xl hover:cursor-pointer hover:bg-gray-100"}>
                            <div className="flex items-center justify-center font-bold text-xl w-12 h-12 my-4 ml-4 font-sans rounded-full border border-gray-400">
                                <FaUser />
                            </div>
                            <div className="font-sans flex flex-col">
                                <div className="flex flex-row items-center mt-4 px-4">
                                    <h1 className="font-sans w-60 truncate">{user.name}</h1>
                                    <h1 className="text-sm text-gray-500">
                                        {lastMessages[user._id]?.time ? new Date(lastMessages[user._id].time).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit",}) : ""}
                                    </h1>
                                </div>
                                <div className="flex items-center pl-4">
                                    <h1 className="text-sm font-sans truncate w-80">{lastMessages[user._id]?.message || ""}</h1>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="font-sans flex justify-center items-center h-screen text-gray-500">
                        {errorMsg || "No users found"}
                    </h1>
                )}
            </div>
        </div>
    );
}