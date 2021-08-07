import "./messenger.css";
import Conversation from "../Components/conversation/Conversation";
import Message from "../Components/message/Message";
import ChatOnline from "../Components/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import {loadData} from '../utils/localStorage'
import axios from "axios";
import { io } from "socket.io-client";
import {useParams} from 'react-router-dom';

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [newConv, setNewConv] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  // const { user } = useContext();
  const {newUserId} = useParams();
  const user = loadData('data');

  console.log(user,"user")

  
  const scrollRef = useRef();
  useEffect(() => {
    const getNewUserConv = async () => {
      try {
        const res = await axios.post("/conversation", {
          senderId: user._id,
          receiverId: newUserId
        });
        console.log(currentChat)
        setNewConv(true)
      } catch (err) {
        console.log(err);
      }
    };
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversation/" + newUserId);
        if(res.data.length === 0){
          getNewUserConv();
        } else {
          res.data.forEach((item) => {
            if(item.members.includes(user._id)){
              handleCurrentChat(item)
            }
          })
          
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
    const getAllUsers = async () => {
      try {
        const res = await axios.get("/users");
        console.log("All Users" + res.data);
        setAllUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        allUsers?.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [allUsers, user._id]);

  useEffect(() => {
    
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversation/" + user._id);
        // console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations(user);
  }, [user._id, newConv]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCurrentChat = (c) => {
    setCurrentChat(c);
    const friendId = c.members.find((m) => m !== user._id);
    const getUser = async () => {
      try {
        const res = await axios("/users/find?userId=" + friendId);
        setCurrentUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <>
      {/* <Topbar /> */}
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for users" className="chatMenuInput" />
            {conversations.map((c) => (
              <div key = {c._id} onClick={() => handleCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  <div className = "chatTopBar">
                    <div className = "curUserImg"><img src="/images/noAvatar.png" alt="" /></div>
                    <span className = "curUserName">{currentUser?.name}</span>
                  </div>
                  {messages.map((m) => (
                    <div key = {m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
