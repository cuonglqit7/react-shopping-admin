import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Typography } from "antd";
import { Login, SignUp } from "../screens";

const { Title } = Typography;

const AuthRouter = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col d-none d-md-block">
                    <div className="content-center flex-column ">
                        <img
                            src="https://res.cloudinary.com/dmcm1qaam/image/upload/v1748706681/logo_iiums1.png"
                            alt=""
                            width={300}
                            height={300}
                        />
                        <Title>Cuzz’s shoesshop</Title>
                    </div>
                </div>
                <div className="col content-center">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
};

export default AuthRouter;
