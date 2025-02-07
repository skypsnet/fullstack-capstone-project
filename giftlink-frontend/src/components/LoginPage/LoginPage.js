import React, {useEffect, useState} from "react";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginPage = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [incorrect, setIncorrect] = useState("");
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const {setIsLoggedIn} = useAppContext();    

    useEffect(()=>{
        if(sessionStorage.getItem('auth-token')){
          navigate('/app')
        }
    },[navigate])

    console.log(email)

    const handleLogin = async (e) =>{
         e.preventDefault();
         try{
           const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`,{
            method: "POST",
            headers: {
              'content-type' : 'application/json',
              'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
           });

           const json = await response.json();

           if(json.authtoken){
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);
                setIsLoggedIn(true);
                navigate('/app');
           }else{
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                setIncorrect("Wrong password.Try Again.")
                setTimeout(()=>{
                setIncorrect("");
                }, 2000)
           }

         }catch(e){
            console.error("Internal error: ",e);
         }
    }

    return(
     <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
              <h2 className="text-center mb-4 font-weight-bold">Login</h2>
          {/* insert code here to create input elements for the variables email and  password */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="text"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="passsword"
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
          {/* insert code here to create a button that performs the `handleLogin` function on click */}
          <span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'12px'}}>{incorrect}</span>
                <button className="btn btn-primary w-100 mb-3" onClick={handleLogin} >Login</button>
                <p className="mt-4 text-center">
                    New here? <a href="/app/register" className="text-primary">Register Here</a>
                </p>
            </div>
          </div>
        </div>
      </div>   
    )

};

export default LoginPage;