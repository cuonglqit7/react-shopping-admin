import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addAuth,
    authSelector,
    authState,
} from "../redux/reducers/authReducer";
import { localDataNames } from "../constants/appInfor";
import { Spin } from "antd";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";

const Routers = () => {
    const [isLoading, setIsLoading] = useState(false);

    const auth: authState = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = localStorage.getItem(localDataNames.authData);

        res && dispatch(addAuth(JSON.parse(res)));
    };

    return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <MainRouter />;
};

export default Routers;
