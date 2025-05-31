import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, SignUp } from "../screens";

const AuthRouter = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col d-none d-md-block">
                    <img src="" alt="" />
                    <h1>asdsadsad</h1>
                </div>
                <div className="col content-center">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
};

export default AuthRouter;
