import React from "react";

import Fade from "@material-ui/core/Fade";
import { Button, makeStyles, Modal } from "@material-ui/core";

import "./modalc.css";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "2px solid purple",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: "white",
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();

  const token = useSelector((state)=> state.login.token)
  const idd = useSelector((state)=> state.login._id)
  const obj = {
    title:"title",
    hashtag:"hashtag",
    body:"body"
  }
  const [open, setOpen] = React.useState(false);

  const [data,setData] = useState(obj)

  const{title,hashtag,body} = data
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e)=>{
    const{name,value} = e.target

    setData({
      ...data,
      [name]:value
    })
  }

  const handleSubmit = ()=>{
    console.log(data);
    if (data.title !== "" && data.body !== "") {
    
   
  
      
      ///// post request
      axios
        .post("http://localhost:8080/question", {
          "title": data.title,
          "tags":data.hashtag.split(","),
          "question":data.body,
          "creator":idd
      },
        {
          headers: {'Authorization': `Bearer ${token}`}
        }
        )

        .then(function (response) {
          console.log(response);
        })
        .catch((err)=>console.log(err.message))
        ////
   
        setOpen(false)
    } else {
      if (data.title === "") {
        alert("Please Enter title");
      } else if (data.body === "") {
        alert("Please Enter body");
      }
    }
  }
 

  return (
    <div>
      <Button
 
        target="_blank"
        data-aos="fade-down"
        onClick={handleOpen}
        variant="contained" color="primary" 
        size="large"
        style={{width:"190%",marginLeft:"240px"}}
        
        
      >
        Ask Question
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper} style={{ textAlign: "Center" }}>
            <h2 id="transition-modal-title" style={{ color: "gray" }} >
              Ask Question
            </h2>
            <div>
              <TextField
              onChange={handleChange}
                value={title}
                name="title"
                type="search"
                variant="outlined"
                placeholder="Write Title"
                className="input-nilp"
                size="small"
                required
              />
              <br />
              <br />
              <TextField
                onChange={handleChange}
                value={hashtag}
                name="hashtag"
                size="small"
                type="search"
                variant="outlined"
              
                placeholder="eg. #java,#react"
                className="input-nilp"
                required
              />
              <TextField
                onChange={handleChange}
                value={body}
                name="body"
                style={{ marginTop: "30px" }}
                className="input-nilp2"
                placeholder="Placeholder"
                multiline
                variant="outlined"
                required
              />
              <br />
              <Button
                style={{ width: "60%" }}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
