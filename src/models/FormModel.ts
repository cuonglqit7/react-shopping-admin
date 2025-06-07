import { SizeType } from "antd/es/config-provider/SizeContext";
import { FormLayout } from "antd/es/form/Form";

export interface FormModel {
    title: string;
    layout?: FormLayout;
    labelCol: number;
    wrapperCol: number;
    size?: SizeType;
    fileUpload: boolean;
    formItems: FormItemModel[];
}

export interface FormItemModel {
    key: string;
    value: string;
    label: string;
    required: boolean;
    message: string;
    placeholder: string;
    type:
        | "default"
        | "select"
        | "number"
        | "email"
        | "tel"
        | "file"
        | "checkbox";
    lockup_item: SelectModel[];
    default_value: string;
    displayLenght: number;
}

export interface SelectModel {
    label: string;
    value: string;
}
