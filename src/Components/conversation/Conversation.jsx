import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser, recId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = recId ? recId : conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users/find?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="/images/noAvatar.png"
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}