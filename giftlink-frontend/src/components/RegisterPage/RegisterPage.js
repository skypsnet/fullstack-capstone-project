import React, {useState} from 'react';

const RegisterPage = ()=>{

    const [data, setData] = useState({
        firstName : "",
        lastName : "",
        email: "",
        password: ""
    });


    const handleRegister = async ()=>{
           console.log("Hola Mundo")
    }
     
    return(
        <div>
               <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="register-card p-4 border rounded">
                            <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                    {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="form label"> FirstName</label>
                        <input
                        id="firstName"
                        type="text"
                        className="form-control"
                        placeholder="Enter your firstName"
                        value={data.firstName}
                        onChange={(e) => setData({...setData, "firstName": e.target.value})}
                        />
                        <label htmlFor='lastName' className='form label'>LastName</label>
                        <input
                        id="lastName"
                        type='text'
                        className='form-control'
                        placeholder='Enter your lastName'
                        value={data.lastName}
                        onChange={(e)=> setData({...setData, "lastName": e.target.value})}
                        />
                        <label htmlFor='email' className='form label'>LastName</label>
                        <input
                        id="email"
                        type='email'
                        className='form-control'
                        placeholder='Enter your email'
                        value={data.lastName}
                        onChange={(e)=> setData({...setData, "email": e.target.value})}
                        />
                        <label htmlFor='lastName' className='form label'>LastName</label>
                        <input
                        id="password"
                        type='text'
                        className='form-control'
                        placeholder='Enter your password'
                        value={data.lastName}
                        onChange={(e)=> setData({...setData, "password": e.target.value})}
                        />
                    </div>
                             
                    {/* insert code here to create a button that performs the `handleRegister` function on click */}
                     
                       <button onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>
                         </div>
                    </div>
                </div>
        </div>    
    )
};

export default RegisterPage;