import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import handleApi from "../../apis/handleApi";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const [form] = Form.useForm();

    const handleLogin = async (values: { email: string; password: string }) => {
        setIsLoading(true);
        console.log(values);

        try {
            const res = await handleApi("/auth/login", values, "POST");
            console.log(res);
        } catch (error) {
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
                    />
                    <Title level={2}>Log in to your account</Title>
                    <Paragraph type="secondary">
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
                                message: "Pls enter your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="********"
                            maxLength={100}
                            type="Password"
                        />
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
                        <Text type="secondary">Don't have an account?</Text>
                        <Link to={"/sign-up"}>Sign-up</Link>
                    </Space>
                </div>
            </Card>
        </>
    );
};

export default Login;
