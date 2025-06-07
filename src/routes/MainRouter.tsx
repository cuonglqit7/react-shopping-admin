import React from "react";
import { Affix, Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
    HomeScreen,
    InventoryScreen,
    ManageStoreScreen,
    OrderScreen,
    ReportScreen,
    SuppliersScreen,
} from "../screens";
import { SiderComponent } from "../components";
import HeaderComponent from "../components/HeaderComponent";

const { Content, Footer } = Layout;

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Affix offsetTop={0}>
                    <SiderComponent />
                </Affix>
                <Layout>
                    <Affix offsetTop={0}>
                        <HeaderComponent />
                    </Affix>
                    <Content className="mt-2 mb-2 container">
                        <Routes>
                            <Route path="/" element={<HomeScreen />}></Route>
                            <Route
                                path="/inventory"
                                element={<InventoryScreen />}
                            ></Route>
                            <Route
                                path="/report"
                                element={<ReportScreen />}
                            ></Route>
                            <Route
                                path="/suppliers"
                                element={<SuppliersScreen />}
                            ></Route>
                            <Route
                                path="/orders"
                                element={<OrderScreen />}
                            ></Route>
                            <Route
                                path="/manage-store"
                                element={<ManageStoreScreen />}
                            ></Route>
                        </Routes>
                    </Content>
                    {/* <Footer /> */}
                </Layout>
            </Layout>
        </BrowserRouter>
    );
};

export default MainRouter;
