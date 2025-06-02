import React from "react";
import { Layout, Menu, MenuProps, Typography } from "antd";
import {
    Box1,
    Chart1,
    Element3,
    Home2,
    ProfileCircle,
    Setting,
} from "iconsax-react";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

const SiderComponent = () => {
    const items: MenuItem[] = [
        {
            key: "dashboard",
            label: (
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    Dashboard
                </Link>
            ),
            icon: <Home2 size={20} />,
        },
        {
            key: "inventory",
            label: (
                <Link to={"/inventory"} style={{ textDecoration: "none" }}>
                    Inventory
                </Link>
            ),
            icon: <Element3 size={20} />,
        },
        {
            key: "Report",
            label: (
                <Link to={"/report"} style={{ textDecoration: "none" }}>
                    Report
                </Link>
            ),
            icon: <Chart1 size={20} />,
        },
        {
            key: "Suppliers",
            label: (
                <Link to={"/suppliers"} style={{ textDecoration: "none" }}>
                    Suppliers
                </Link>
            ),
            icon: <ProfileCircle size={20} />,
        },
        {
            key: "Orders",
            label: (
                <Link to={"/orders"} style={{ textDecoration: "none" }}>
                    Orders
                </Link>
            ),
            icon: <Box1 size={20} />,
        },
        {
            key: "Manage Store",
            label: (
                <Link to={"/manage-store"} style={{ textDecoration: "none" }}>
                    Manage Store
                </Link>
            ),
            icon: <Setting size={20} />,
        },
    ];
    return (
        <Sider theme="light" style={{ height: "100vh" }}>
            <div className="mt-2 mb-2 text-center">
                <img
                    src="https://res.cloudinary.com/dmcm1qaam/image/upload/v1748706681/logo_iiums1.png"
                    alt=""
                    width={50}
                    height={50}
                />
                <Title
                    level={5}
                    style={{
                        fontWeight: "bold",
                    }}
                >
                    Cuzz’s shoesshop
                </Title>
            </div>
            <Menu items={items}></Menu>
        </Sider>
    );
};

export default SiderComponent;
