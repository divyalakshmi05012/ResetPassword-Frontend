import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  return (
    <>
      <div className="container-fluid">
        <div className="row g-0 justify-content-center align-items-center">
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center p-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 text-center">
                    <img
                      src="https://images.designtrends.com/wp-content/uploads/2017/04/Vector-Welcome-Banner.jpg"
                      alt="Welcome Image"
                      width="100%"
                    />
                    <h2>Let's Join Our family</h2>
                    <br />

                    <div>
                      <div className="d-grid">
                        <p>Already your a user please Login!</p>
                      </div>

                      <Button
                        variant="primary"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Button>

                      <br />
                      <br />
                      <div className="d-grid">
                        <p>New User please SignUp to create your Account!</p>
                      </div>

                      <Button
                        variant="primary"
                        onClick={() => navigate("/signup")}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;