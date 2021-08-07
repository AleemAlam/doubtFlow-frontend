import React, { useState } from "react";
import "../../Styles/Commentp.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import axios from "axios";
import useAxios from "../../Hooks/axioshook";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Aos from "aos";

import "aos/dist/aos.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Commentp = ({match}) => {
  const [data, setData] = useState("");
  const [comments,setComments] = useState([])
  const[question,setQuestion] = useState("")
  const{id} = useParams()

  console.log(id,"allem")
    // const { response, loading, error } = useAxios({ url: `/question/${qstID}` });

    const token = useSelector((state)=> state.login.token)

    const username =  useSelector((state)=> state.login.name)

    const userid = useSelector((state)=> state.login._id)
    console.log(token,username,userid,"token")


  const [query, setQuery] = useState([]);

  const [flag,setFlag] = useState(false) 
   const handleAdd = () => {
    console.log(data,"hi0");
    setFlag(!flag)
    axios
      .post(`http://localhost:8080/comment/${id}`, {
        content: data,
      },
      {
        headers: {'Authorization': `Bearer ${token}`}
      }
      )
      .then(function (response) {
        
    getdata();
        console.log(response,"hi");
      })
      .catch(function (error) {
        console.log(error);
      });
   
    getquestion()
  };

  const getdata = () => {
    axios.get(`http://localhost:8080/comment/${id}`)
      .then(function (response) {
        // handle success
        console.log(response.data.comments);
        setComments(response.data.comments)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
   
  };

  const getquestion = ()=>{
    axios.get(`http://localhost:8080/question/${id}`)
    .then(function (response) {
      // handle success
      console.log(response.data.question.title,"lll")
      setQuestion(response.data.question.title);
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  }

  
  useEffect(() => {
    getquestion()
    getdata();
  },[flag]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });
  return (
    <div style={{ display: "flex" }} >
      <div className="profile-infooo" data-aos="slide-right" >
        <h2>
          {username}{" "}
          <img
            src="data:image/png;base64,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"
            class="pq6dq46dp"
          />
        </h2>

        <p>i am a student....</p>

        <div
          style={{ textAlign: "left", marginLeft: "20px", marginTop: "30px" }}
        >
          <p style={{ color: "gray", fontWeight: "bold" }}> Popular Tags</p>
          <Button
            style={{ marginTop: "10px" }}
            variant="outlined"
            color="primary"
            size="small"
          >
            JavaScript
          </Button>
          <Button
            style={{ marginTop: "10px", marginLeft: "10px" }}
            size="small"
            variant="outlined"
            color="primary"
          >
            React
          </Button>
          <br />
          <Button
            style={{ marginTop: "10px" }}
            variant="outlined"
            color="primary"
            size="small"
          >
            HTML
          </Button>
          <Button
            style={{ marginTop: "10px", marginLeft: "10px" }}
            size="small"
            variant="outlined"
            color="primary"
          >
            CSS
          </Button>
          <br />
          <Button
            style={{ marginTop: "10px" }}
            variant="outlined"
            color="primary"
            size="small"
          >
            HTML5
          </Button>
          <Button
            style={{ marginTop: "10px", marginLeft: "10px" }}
            size="small"
            variant="outlined"
            color="primary"
          >
            Node
          </Button>
          <br />
          <Button
            style={{ marginTop: "10px" }}
            variant="outlined"
            color="primary"
            size="small"
          >
            MongoDB
          </Button>
          <Button
            style={{ marginTop: "10px", marginLeft: "10px" }}
            variant="outlined"
            color="primary"
            size="small"
          >
            Redux
          </Button>
        </div>
        <div
          style={{ textAlign: "left", marginLeft: "20px", marginTop: "30px" }}
        >
          <h3>Still in dought ?</h3>

          <p style={{ color: "gray", fontWeight: "bold" }}>
            Join{" "}
            <Button
              style={{ marginTop: "10px", marginLeft: "10px" }}
              variant="outlined"
              color="primary"
              size="small"
            >
              Expert Room
            </Button>
          </p>
        </div>
      </div>
      <div className="Main-commentp-div" data-aos="fade-left">
        <div>
          <h3>{<div>{question}</div>}</h3>
        </div>
        <span style={{color:"gray",fontWeight:"bold"}}> Answers : </span>
        <hr />
        <div className="answer-commentp">
          {comments?.map((item) => (
            <div className="">
              <a style={{fontSize:"18px"}}><br />
                {item.content}
                <br />  <br />
                <Link style={{position:"absolute",right:"21px",fontSize:"15.8px"}} to={`/messenger/${item._id}`}>-{item._id}</Link>
                {/* <a style={{ color: "gray", fontWeight: "bold" }}>
                  
                </a> */}
              </a>
              <br />
              <hr />
            </div>
          ))}
        </div>
        <br />
        <div>
          <TextField
            label="Add Your Answer here "
            placeholder="Placeholder"
            multiline
            variant="outlined"
            onChange={(e) => setData(e.target.value)}
            className="textare-comments"
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "7px", marginLeft: "4px" }}
            onClick={handleAdd}
          >
            Add Comment
          </Button>
        </div>
        <br/>  <br/>
      </div>
    </div>
  );
};

export { Commentp };
