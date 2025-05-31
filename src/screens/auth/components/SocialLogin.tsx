import { Button } from "antd";
import React from "react";

const SocialLogin = () => {
    return (
        <Button className="w-100 mt-4" size="large">
            <img
                width="24"
                height="24"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
            />
            Google
        </Button>
    );
};

export default SocialLogin;
