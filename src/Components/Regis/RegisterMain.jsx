import { Button, TextField} from "@material-ui/core"
import React,{useState } from "react"
import "../../Styles/Register.css"
import ComputerIcon from '@material-ui/icons/Computer';
import { useDispatch } from "react-redux";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { registeruser } from "../../Redux/Register/action";

const RegisterMain = ()=>{

    const obj1 = {
        name2: "",
        number: "",
        email: "",
        password: "",
       
      };
      const [query, setQuery] = useState(obj1);
      const {name2,number,email,password} = query;

      const dispatch = useDispatch();
      const handleChange= (e) => {
        const { name, value} = e.target;
    

        console.log(name)
        console.log(name,value,e)
      
        setQuery({
          ...query,
          [name]: value,
        });
      };

      const handleRegister = () => {

        console.log(query)
        if (query.name2 !== "" && query.number !== "" && query.email !== "" && query.password !== "") {
            let payload = {
              name:query.name2 ,
              email: query.email ,
              number:query.number,
              password: query.password ,
             
            };
            setQuery(payload);
            dispatch(registeruser(payload));
          } else {
            if (query.name2  === "") {
              alert("Please Enter Full Name");
            } else if (query.email === "") {
              alert("Please Enter Your Email");
            }
            else if (query.password === "") {
                alert("Please Enter Your Password");
              }
              else if ( query.stay=== "") {
                alert("Please Enter Your Email");
            }
          }

      }
    return(

        <div>

            <div className="Head-divv">

                <div className="Head-subdiv-register">

                    <h2>Join the club</h2>
                    2,number2,email,password

                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus.
                    </p>

                    <div >
                        <div>
                        <h3><ComputerIcon  /> Community </h3><p>At vero eos et accusamus et</p>
                        </div>

                        <div>
                        <h3><HelpOutlineIcon /> Doubt search</h3><p>At vero eos et accusamus et.</p>
                        </div>
                    </div>


                </div>
                
                <div className="Head-divv2">

                    <h1 style={{color:"black"}}>Welcome</h1>

                <TextField 
        
                label="Full Name" 
                type="search"
                variant="outlined"
                size="small"
                value={name2}
                name="name2"   onChange={handleChange} />
              
                <br/>     <br/>

                    
                <TextField  onChange={handleChange} label="Phone No" type="Number" variant="outlined" size="small" 
                value={number}
                name="number" 
           
                onChange={handleChange} required/>
          
                <br/>     <br/>
                    
                <TextField onChange={handleChange} label="Email" type="email" variant="outlined" size="small" required  
                 value={email}
                name="email"/>
                 onChange={handleChange}
                <br/>     <br/>
                <TextField  onChange={handleChange} label="Password" type="password" variant="outlined" size="small"
                value={password}
                name="password"/>
                onChange={handleChange}
                <br/>     <br/>
                    
              
                <Button variant="contained" color="primary" onClick={handleRegister }>REGISTER</Button>

                </div>

            </div>

        </div>
    )
}

export {RegisterMain}