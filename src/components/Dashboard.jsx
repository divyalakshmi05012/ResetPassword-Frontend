import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Dashboard(){
  let navigate = useNavigate()
  return (
    <>
      <div className="container-fluid">
        <div className="row g-0 justify-content-center align-items-center">
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center p-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 text-center">
                    <h1 className="login-heading mb-4">
                      Thanks a lot for your Visiting!
                    </h1>
                        <Button
                          variant="primary"
                          onClick={() => navigate("/")}
                        >
                          LogOut
                        </Button>
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

export default Dashboard;