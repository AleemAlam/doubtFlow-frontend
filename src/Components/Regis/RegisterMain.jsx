import { Button, TextField } from "@material-ui/core"
import React from "react"
import "../../Styles/Register.css"
import ComputerIcon from '@material-ui/icons/Computer';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
const RegisterMain = ()=>{
    return(

        <div>

            <div className="Head-divv">

                <div className="Head-subdiv-register">

                    <h2>Join the club</h2>
                    

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