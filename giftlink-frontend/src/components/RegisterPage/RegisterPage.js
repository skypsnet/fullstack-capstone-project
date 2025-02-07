import React, {useState} from 'react';
import {urlConfig} from '../../config'
import {useAppContext} from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'

const RegisterPage = ()=>{

    const [showerr, setShowerr] = useState("");
    const navigate = useNavigate();
    const {setIsLoggedIn, isLoggedIn} = useAppContext(); 
    console.log(`La variable setIsLoggedInd: ${isLoggedIn}`)

    const [data, setData] = useState({
        firstName : "",
        lastName : "",
        email: "",
        password: ""
    });


    const handleRegister = async ()=>{
           try{
             const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password
                })
             })

             const json = await response.json();
             if(json.authtoken){
               
                sessionStorage.setItem('auth-token',json.authtoken)
                sessionStorage.setItem('name',data.firstName)
                sessionStorage.setItem('email',json.email)

                setIsLoggedIn(true);
                navigate('/app');
                
             }

             if(json.error){
                setShowerr(json.error);
             }

           }catch(e){
             console.log("Error fetching details: "+e.message)
           }
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
                        onChange={(e) => setData({...data, "firstName": e.target.value})}
                        />
                        <label htmlFor='lastName' className='form label'>LastName</label>
                        <input
                        id="lastName"
                        type='text'
                        className='form-control'
                        placeholder='Enter your lastName'
                        value={data.lastName}
                        onChange={(e)=> setData({...data, "lastName": e.target.value})}
                        />
                        <label htmlFor='email' className='form label'>Email</label>
                        <input
                        id="email"
                        type='email'
                        className='form-control'
                        placeholder='Enter your email'
                        value={data.email}
                        onChange={(e)=> setData({...data, "email": e.target.value})}
                        />
                        <label htmlFor='lastName' className='form label'>Password</label>
                        <input
                        id="password"
                        type='text'
                        className='form-control'
                        placeholder='Enter your password'
                        value={data.password}
                        onChange={(e)=> setData({...data, "password": e.target.value})}
                        />
                    </div>
                             
                    {/* insert code here to create a button that performs the `handleRegister` function on click */}
                     
                     <div className='text-danger'>{showerr}</div>
                     
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