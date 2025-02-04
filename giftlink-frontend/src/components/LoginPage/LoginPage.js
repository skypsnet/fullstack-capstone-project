import React, {useState} from "react";



const LoginPage = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(email)

    const handleLogin = async () =>{
         console.log("email"+email+ "  password:"+password);
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