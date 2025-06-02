import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { removeAuth } from "../redux/reducers/authReducer";

function HomeScreen() {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(removeAuth({}));
    };
    return (
        <div className="text-danger">
            HomeScreen
            <Button onClick={handleLogout}>Log out</Button>
        </div>
    );
}

export default HomeScreen;
