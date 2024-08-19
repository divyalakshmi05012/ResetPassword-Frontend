import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AxiosService from '../common/ApiService'
// import UseLogout from './Hooks/UseLogout'

function SignIn() {
    let navigate = useNavigate()
    // let logout = UseLogout()
    let [email, setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [emailRes, setEmailRes] = useState('');
    let [pswdRes, setPswdRes] = useState('');
    let [submit, setSubmit] = useState(false);
  
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  
    useEffect(()=>{
      clearError();
    },[email,password]);
  
    let clearError = () => {
      setEmailRes('');
      setPswdRes('');
    }
  let handleLogin = async(e)=>{
    e.preventDefault();
    clearError();

    // Check if email or password is empty

    if(email.trim() === ''){
      setEmailRes("Please fill the email field");
      return;
    }
    else if(!emailPattern.test(email)){
      setEmailRes(
        "Email should be in correct format"
      )
      return;
    }

    if(password.trim() === ''){
      setPswdRes("Please fill the password field");
      return;
    }
    else if(password.length < 3){
      setPswdRes(
        "Password should be at least greater than 3 characters, Make Strong password!"
      )
      return;
    }
    setSubmit(true);

    try {
      let res = await AxiosService.post(`/user/login`,{
        email,
        password
      });
      setEmail(''),
      setPassword('');

      if(res.status === 200)
      {
        toast.success("Login Successfully")
        sessionStorage.setItem('token', res.data.token)
        // sessionStorage.setItem('userData',JSON.stringify(res.data.userData))

        if(res.data.userData){
          navigate('/dashboard')
        }
        
        else{
          console.log("Incorrect Email or Password")
        }
      }
    } catch (error) {
      console.error(error);
        toast.error("An error occurred while logging in");
        setSubmit(false)
    }
  }

  return <>
  <div className="container-fluid">
  <div className="row g-0 justify-content-center align-items-center">
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 text-center ps-4">
                <h2 className="login-hd">Welcome To Login Page</h2> <br/>
              <h3 className="login-heading mb-4">Let&apos;s Login Your Page!</h3>
            </div>
              {/* <!-- Sign In Form --> */}
              <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} required/>
      </Form.Group>
      {emailRes && <p className="text-danger">{emailRes}</p>}

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
      </Form.Group>
      {pswdRes && <p className="text-danger">{pswdRes}</p>}

      <div className='col-md-9 text-center'>
      <Button variant="primary" onClick= {(e)=>handleLogin(e)} disabled={submit}>
        Login In
      </Button>
      <br/>
      <br/>

      <Button variant="primary" onClick= {()=>navigate('/resetmail')}>
        Forgot Password
      </Button>
      <br />
      <br />
      Don&apos;t have an account yet? <Link to={'/signup'}>Signup</Link>

      </div>
              </Form>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </>
}

export default SignIn