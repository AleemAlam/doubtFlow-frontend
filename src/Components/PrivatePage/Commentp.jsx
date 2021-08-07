import React from "react"
import "../../Styles/Commentp.css"

const Commentp = ()=>{
    return(
        <div style={{display:"flex"}}>
         

            <div className="profile-infooo">
                <h2>Nilesh Kokate</h2>

            </div>
             <div className="Main-commentp-div">

                <div>
                    <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ?</h2>
                </div>
                <a href="">  Answers : </a><hr/>
                <div className="answer-commentp">
                    <a>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy  <a style={{color:"gray",fontWeight:"bold"}}> : by User</a></a><br/><hr/>
                    
                </div>

            </div>

           

        </div>
    )
}

export {Commentp}