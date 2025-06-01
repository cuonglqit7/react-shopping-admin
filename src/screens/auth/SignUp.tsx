import { Button, Card, Form, Input, Space, Typography, App } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import handleApi from "../../apis/handleApi";

const { Title, Paragraph, Text } = Typography;

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [form] = Form.useForm();
    const { message } = App.useApp();

    const handleLogin = async (values: { email: string; password: string }) => {
        setIsLoading(true);
        console.log(values);

        try {
            const res = await handleApi("/auth/register", values, "POST");
            console.log(res);
        } catch (error: any) {
            console.log(error);
            message.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Card style={{ minWidth: "70%" }}>
                <div className="text-center">
                    <img
                        src="https://res.cloudinary.com/dmcm1qaam/image/upload/v1748706681/logo_iiums1.png"
                        alt=""
                        width={48}
                        height={48}
                    />
                    <Title level={2}>Create an account</Title>
                    <Paragraph type="secondary">
                        Start your 30 day free trial.
                    </Paragraph>
                </div>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleLogin}
                    // disabled
                    size="large"
                >
                    <Form.Item
                        name={"name"}
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Pls enter your name!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your name" allowClear />
                    </Form.Item>
                    <Form.Item
                        name={"email"}
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Pls enter your email!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your email"
                            allowClear
                            maxLength={100}
                            type="email"
                        />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Pls enter your password.",
                            },
                            () => ({
                                validator: (_, value) => {
                                    if (value.length < 8) {
                                        return Promise.reject(
                                            new Error(
                                                "Must be at least 8 characters!"
                                            )
                                        );
                                    } else {
                                        return Promise.resolve();
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Create a password"
                            maxLength={100}
                            type="Password"
                        />
                    </Form.Item>
                </Form>

                <div className="mt-4">
                    <Button
                        loading={isLoading}
                        type="primary"
                        style={{
                            width: "100%",
                        }}
                        size="large"
                        onClick={() => form.submit()}
                    >
                        Get started
                    </Button>
                </div>
                <SocialLogin />
                <div className="mt-4 text-center">
                    <Space>
                        <Text type="secondary">Already have an account?</Text>
                        <Link to={"/login"}>Login</Link>
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default SignUp;
