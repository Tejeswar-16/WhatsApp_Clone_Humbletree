import ChatList from "./components/ChatList"
import NavBar from "./components/NavBar"
import Messages from "./components/Messages"
import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Register from "./components/Register"
import Home from "./components/Home"
import Login from "./components/Login"

function App() {

  const [selectedChat,setSelectedChat] = useState(null);
  const [lastMessages,setLastMessages] = useState({});

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        
        <Route path="/chat/:id" element={
          <div className='flex flex-row h-screen overflow-hidden'>
            <div className="bg-gray-100 h-full w-15 border-r border-gray-300">
              <NavBar />
            </div>
            <div className="bg-white h-full w-110">
              <ChatList setSelectedChat={setSelectedChat} lastMessages={lastMessages}/>
            </div>
            <div className="bg-gray-100 h-full flex-1 border-r border-gray-300 overflow-hidden">
              <Messages selectedChat={selectedChat} setLastMessages={setLastMessages}/>
            </div>
          </div>
        }></Route>
      </Routes>
    </>
  )
}

export default App
