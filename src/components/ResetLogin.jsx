import React, { useState, useEffect } from 'react'
import AxiosService from '../common/ApiService'
import UseLogout from './Hooks/UseLogout'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ResetLogin() {
    const [email, setEmail] = useState("");
    const [emailRes, setEmailRes] = useState('');
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate();
    const logout = UseLogout();

    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  useEffect(()=>{
    clearError();
  },[email]);
  const clearError = () => {
    setEmailRes('');
  }
    const handleResetPassword = async(e)=> {
      e.preventDefault();

    clearError();
    // Email Verification
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
    setSubmit(true);
        try {
            const res = await AxiosService.post(`/user/reset-password`, 
            {email});
            setEmail("")
            if(res.status === 200){
                toast.success(res.data.message);
                navigate('/forgotpassword/:id/:token')
            }
        } catch (error) {
            toast.error("Error occured")
            logout();
        }
        setSubmit(false);
    }
  return <>
       <div className="container-fluid">
        <div className="row g-0 justify-content-center align-items-center">
        <div className="col-md-8 col-lg-6">
        <div className="login d-flex align-items-center p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 text-center ps-4">
              <h3 className="login-heading mb-4">Password Reset Login</h3>
            </div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} required/>
                </Form.Group>
                {emailRes && <p className="text-danger">{emailRes}</p>}

                <div className='col-md-9 text-center'>
                <Button variant="primary" onClick= {(e)=>handleResetPassword(e)} disabled={submit} >
                  Send Mail
                </Button>
                <br />
                <br />
                <Button variant="primary" onClick= {()=>navigate('/login')}>
                  Back
                </Button>

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

export default ResetLogin