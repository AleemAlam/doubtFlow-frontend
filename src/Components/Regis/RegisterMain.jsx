import { Button, TextField } from "@material-ui/core"
import React from "react"
import "../../Styles/Register.css"



const RegisterMain = ()=>{
    return(

        <div>

            <div className="Head-divv">

                <div className="Head-subdiv-register">

                </div>
                
                <div className="Head-divv2">

                    <h1 style={{color:"black"}}>Welcome</h1>

                <TextField id="outlined-search" label="Full Name" type="text" variant="outlined" size="small"/>
                <br/>     <br/>

                    
                <TextField id="outlined-search" label="Phone No" type="Number" variant="outlined" size="small" />
                <br/>     <br/>
                    
                <TextField id="outlined-search" label="Email" type="email" variant="outlined" size="small" />
                <br/>     <br/>
                <TextField id="outlined-search" label="Password" type="password" variant="outlined" size="small" />
                <br/>     <br/>
                    
              
                <Button variant="contained" color="primary">REGISTER</Button>

                </div>

            </div>

        </div>
    )
}

export {RegisterMain}