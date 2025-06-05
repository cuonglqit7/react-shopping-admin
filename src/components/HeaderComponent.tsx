import { Avatar, Button, Dropdown, Input, MenuProps, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, removeAuth } from "../redux/reducers/authReducer";
import { auth } from "../firebase/firebaseConfig";
import { NotificationBing, SearchNormal1 } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
    const user = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items: MenuProps["items"] = [
        {
            key: "logout",
            label: "Log out",
            onClick: async () => {
                auth.signOut();
                dispatch(removeAuth({}));
                localStorage.clear();
                navigate("/");
            },
        },
    ];
    return (
        <div className="p-4 ms-1 row bg-white">
            <div className="col">
                <Input
                    size="large"
                    placeholder="Search product, supplier, order"
                    style={{
                        borderRadius: 5,
                        width: "50%",
                    }}
                    prefix={<SearchNormal1 className="text-muted" size={20} />}
                />
            </div>
            <div className="col text-end">
                <Space>
                    <Button
                        type="text"
                        icon={<NotificationBing size={20} color="#5D6679" />}
                    />
                    <Dropdown menu={{ items }}>
                        <Avatar src={user.photo_url} size={40} />
                    </Dropdown>
                </Space>
            </div>
        </div>
    );
};

export default HeaderComponent;
