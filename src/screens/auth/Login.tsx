import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
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
                    <Title>Log in to your account</Title>
                    <Paragraph>
                        Welcome back! Please enter your details.
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
                                message: "Pls enter your password!",
                            },
                        ]}
                    >
                        <Input.Password maxLength={100} type="Password" />
                    </Form.Item>
                </Form>

                <div className="row">
                    <div className="col">
                        <Checkbox
                            value={isRemember}
                            onChange={(e) => setIsRemember(e.target.checked)}
                        >
                            Remember for 30 days
                        </Checkbox>
                    </div>
                    <div className="col text-end">
                        <Link to="/">Forgot Password?</Link>
                    </div>
                </div>

                <div className="mt-4">
                    <Button
                        type="primary"
                        style={{
                            width: "100%",
                        }}
                        size="large"
                        onClick={() => form.submit()}
                    >
                        Login
                    </Button>
                </div>
                <SocialLogin />
                <div className="mt-4 text-center">
                    <Space>
                        <Text>Don't have an account?</Text>
                        <Link to={"/sign-up"}>Sign-up</Link>
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default Login;
