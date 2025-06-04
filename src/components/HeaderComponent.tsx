import { Avatar, Button, Input, Layout, Space } from "antd";
import { NotificationBing, SearchNormal, SearchNormal1 } from "iconsax-react";
import React from "react";

const HeaderComponent = () => {
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
                    <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6VhXB2tcqYOWyKBgwUzMt-GJRmcnUX0vvA&s"
                        size={40}
                    />
                </Space>
            </div>
        </div>
    );
};

export default HeaderComponent;
