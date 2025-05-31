import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";

const { Title, Paragraph, Text } = Typography;

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [form] = Form.useForm();

    const handleLogin = (values: { email: string; password: string }) => {
        console.log(values);
    };
    return (
        <>
            <Card style={{ width: "60%" }}>
                <div className="text-center">
                    <Title>Create an account</Title>
                    <Paragraph>Start for 30 day free trial.</Paragraph>
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
                        <Input allowClear />
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
                        <Input allowClear maxLength={100} type="email" />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Must be at least 8 characters!",
                            },
                        ]}
                    >
                        <Input.Password maxLength={100} type="Password" />
                    </Form.Item>
                </Form>

                <div className="mt-4">
                    <Button
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
                        <Text>Already have an account?</Text>
                        <Link to={"/login"}>Login</Link>
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default SignUp;
