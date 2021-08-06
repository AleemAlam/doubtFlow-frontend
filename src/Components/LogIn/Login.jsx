import { Button, TextField } from "@material-ui/core"
import React,{useState,useEffect} from "react"
import "../../Styles/Login.css"
import { loginruser } from "../../Redux/LoginAuth/action";
import { useDispatch} from "react-redux";

import Aos from "aos";

import "aos/dist/aos.css";
const Login = ()=>{
    const obj2 = {
        email: "",
        password: "",
       
      };
      const [query, setquery] = useState(obj2);
      const dispatch = useDispatch();
      const {email,password} = query
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        let val = type === "checkbox" ? checked : value;
        setquery({
          ...query,
          [name]: val,
        });
      };

      const handleLogin = () => {
        if (query.email !== "" && query.password !== "") {
          let payload = {
            email: query.email,
            password: query.password,
          };
          setquery(payload);
          dispatch(loginruser(payload));
        } else {
          if (query.email === "") {
            alert("Please Enter Email");
          } else if (query.password === "") {
            alert("Please Enter Password");
          }
        }
      };

      useEffect(() => {
        Aos.init({ duration: 2000 });
      });
    return(
        <div>
            <div>
                <div className="main-div-login" data-aos="fade-down">
                      <h1>Login</h1>

                      <div>
                                
                        <TextField  onChange={handleChange} label="Phone No" type="email" variant="outlined" size="small" 
                        value={email}
                        name="email" 
                        size="small"
                        onChange={handleChange} required/><br/><br/>

                        <TextField  onChange={handleChange} label="Password" type="password" variant="outlined" size="small" 
                        value={password}
                        name="password" 
                        size="small"
                        onChange={handleChange} required/><br/><br/>

                        <Button  variant="contained" color="primary" onClick={handleLogin }>LOGIN</Button>
                      </div>

                      <div className="img-div-login">
                      <img src="https://i.pinimg.com/originals/91/9e/b6/919eb6d857405fae1eff05e96ac355d6.png"/>

                      </div>
                </div>

            </div>
        </div>
    )
}

export {Login}