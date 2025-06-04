import { storage } from "../firebase/firebaseConfig";
import { replaceNameFile } from "./replaceNameFile";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadFileFirebase = async (file: any) => {
    const fileName = replaceNameFile(file.name);

    const storageRef = ref(storage, `images/${fileName}`);

    const res = await uploadBytes(storageRef, file);

    if (res) {
        if (res.metadata.size === file.size) {
            return getDownloadURL(storageRef);
        } else {
            return "Uploading firebase";
        }
    } else {
        return "Error Upload firebase.";
    }
};

export const uploadFileCloudinary = async (file: any) => {
    const rawName = file.name.split(".").slice(0, -1).join(".");
    const fileName = replaceNameFile(rawName);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "react_shopping_ml_default");
    formData.append("public_id", fileName);

    const resUploadImage = await fetch(
        "https://api.cloudinary.com/v1_1/dmcm1qaam/image/upload",
        {
            method: "POST",
            body: formData,
        }
    );

    if (resUploadImage) {
        const payload: any = await resUploadImage.json();

        return payload.url;
    } else {
        return "Uploading cloudinary";
    }
};
