import React, { useState, useEffect } from "react";
import AxiosService from "../common/ApiService";
import UseLogout from "./Hooks/UseLogout";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameRes, setNameRes] = useState("");
  const [emailRes, setEmailRes] = useState("");
  const [pswdRes, setPswdRes] = useState("");
  const [confirmPswdRes, setConfirmPswdRes] = useState("");
  const [submit, setSubmit] = useState(false);
  const logout = UseLogout();
  const navigate = useNavigate();

  let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  useEffect(() => {
    clearError();
  }, [name, password, confirmPassword, email]);

  const clearError = () => {
    setNameRes("");
    setEmailRes("");
    setPswdRes("");
    setConfirmPswdRes("");
  };
  const handleSignUp = async (e) => {
    e.preventDefault();

    clearError();
    if (name.trim() === "") {
      setNameRes("Please fill this input field");
      return;
    } else if (name.length < 3) {
      setNameRes("Name should be at least 3 characters long!");
      return;
    }
    // Email Verification
    if (email.trim() === "") {
      setEmailRes("Please fill the email field");
      return;
    } else if (!emailPattern.test(email)) {
      setEmailRes("Email should be in correct format");
      return;
    }
    // Password Verification
    if (password.trim() === "") {
      setPswdRes("Please fill the password field");
      return;
    } else if (password.length < 3) {
      setPswdRes(
        "Password should be at least greater than 3 characters, Make Strong password!"
      );
      return;
    }
    // Confirm Password Verification
    if (confirmPassword.trim() === "") {
      setConfirmPswdRes("Please fill the confirm password field");
      return;
    } else if (password !== confirmPassword) {
      setConfirmPswdRes("Password doesn't match with confirm password");
      return;
    }
    setSubmit(true);
    try {
      const response = await AxiosService.post("/user/signup", {
        name,
        email,
        password,
        confirmPassword,
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      if (response.status === 201) {
        toast.success("User Created Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
    }
    setSubmit(false);
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row g-0 justify-content-center align-items-center">
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center p-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 text-center ps-4">
                    <h3 className="login-heading mb-4">
                      Let&apos;s Create Your Account
                    </h3>
                  </div>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {nameRes && <p className="text-danger">{nameRes}</p>}

                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {emailRes && <p className="text-danger">{emailRes}</p>}

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {pswdRes && <p className="text-danger">{pswdRes}</p>}

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {confirmPswdRes && (
                      <p className="text-danger">{confirmPswdRes}</p>
                    )}

                    <div className="col-md-9 text-center">
                      <Button
                        variant="primary"
                        onClick={(e) => handleSignUp(e)}
                        disabled={submit} >
                        Sign Up
                      </Button>
                      <br />
                      <br />
                      Already a Member? <Link to={"/login"}>Login</Link>
                    </div>
                  </Form>

                  {/* <form>

                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingEmail" placeholder="Enter Your Email Id"  onChange={(e)=>setEmail(e.target.value)}/>
                  <label htmlFor="floatingEmail">Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Enter Your Password"  onChange={(e)=>setPassword(e.target.value)}/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid">
                  <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" onClick={handleSignUp}>Sign Up</button>
                </div>

                <div className="d-grid">
                Already a Member? <Link to={'/login'}>Login</Link>
                </div>


              </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;