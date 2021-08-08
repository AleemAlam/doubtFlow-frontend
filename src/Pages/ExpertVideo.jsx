import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";


const socket = io("https://warm-wildwood-81069.herokuapp.com");


function ExpertVideoCall() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const history = useHistory();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);
  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };
  const username = useSelector((state) => state.login.name);
  console.log(username,"vv")
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
    // history.push("/questions");
  };

  return (
    <div style={{backgroundColor:"#282828",height:"100vh"}}>
      <br/>
      <h1 style={{ textAlign: "center", color: "#fff",margin:"0" }}>Expert Calling.....☎️</h1> <br/>
      <div className="container">
        <div className="video-container" style={{display:"flex",justifyContent:"space-around",margin:"auto",padding:"10px"}}>
          <div className="video">
            {stream && (
              <div>
                <h3 style={{color:"gray"}}>{ username }</h3>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "470px",border:"2px solid gray",height:"350px" }}
              />
                </div>
            )}
          </div>
          <div className="video">
           
            {callAccepted && !callEnded ? (
               <div>
                 <h3 style={{color:"gray"}}>EXPERT</h3>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{width: "470px",border:"2px solid gray",height:"350px"  }}
              />
                 </div>
            ) : null}
          </div>
        </div>
        <br/>
        <div className="myId">
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "20px",color:"whitesmoke",backgroundColor:"white"}}
          />
          <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AssignmentIcon fontSize="large" />}
            >
              Copy ID
            </Button>
          </CopyToClipboard>

          <TextField
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            style={{backgroundColor:"white"}}
          />
          <div className="call-button" >
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall} style={{border:"2px solid red"}}>
                End Call
              </Button>
            ) : (
              <IconButton
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
                style={{border:"2px solid gray"}}
              >
                <PhoneIcon fontSize="large" />
              </IconButton>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ExpertVideoCall;
