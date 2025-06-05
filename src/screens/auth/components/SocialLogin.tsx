import { Button, message } from "antd";
import React, { use, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase/firebaseConfig";
import handleApi from "../../../apis/handleApi";
import { addAuth } from "../../../redux/reducers/authReducer";
import { localDataNames } from "../../../constants/appInfor";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
// provider.setCustomParameters({
//     login_hint: "lequoccuong207@gmail.com",
// });

interface Props {
    isRemember?: boolean;
}

const SocialLogin = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { isRemember } = props;

    const dispatch = useDispatch();

    const handleLoginWithGoogle = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);

            if (result) {
                const user = result.user;
                if (user) {
                    const data = {
                        name: user.displayName,
                        email: user.email,
                        photo_url: user.photoURL,
                    };

                    const api = `/auth/login-google`;

                    try {
                        const res: any = await handleApi(api, data, "post");

                        message.success(res.message);
                        dispatch(addAuth(res.data));
                        if (isRemember) {
                            localStorage.setItem(
                                localDataNames.authData,
                                JSON.stringify(res.data)
                            );
                        }
                    } catch (error: any) {
                        console.log(error.message);
                        message.error(error.message);
                    }
                }
            } else {
                console.log("Can't not login with google.");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            loading={isLoading}
            onClick={handleLoginWithGoogle}
            className="w-100 mt-4"
            size="large"
        >
            <img
                width="24"
                height="24"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
            />
            Google
        </Button>
    );
};

export default SocialLogin;
