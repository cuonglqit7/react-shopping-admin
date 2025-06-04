import {
    Avatar,
    Button,
    Form,
    Input,
    message,
    Modal,
    Radio,
    Select,
    Typography,
} from "antd";
import { User } from "iconsax-react";
import React, { useRef, useState } from "react";
import { colors } from "../constants/color";
import handleApi from "../apis/handleApi";
import { uploadFileCloudinary } from "../utils/uploadFile";
import { replaceNameFile } from "../utils/replaceNameFile";
import { SupplierModel } from "../models/supplierModel";

interface Props {
    visible: boolean;
    onClose: () => void;
    onAddNew: (value: SupplierModel) => void;
    supplier?: SupplierModel;
}

const { Paragraph } = Typography;

const ToggleSupplier = (props: Props) => {
    const { visible, onClose, onAddNew, supplier } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isTasking, setIsTasking] = useState<boolean>();
    const [file, setFile] = useState<any>();
    const [form] = Form.useForm();
    const inpRef = useRef<HTMLInputElement>(null);

    const addNewSupplier = async (values: any) => {
        setIsLoading(true);

        const data: any = {};
        const api = `/supplier`;

        for (const i in values) {
            data[i] = values[i] ?? "";
        }

        data.price = values.price ? parseInt(values.price) : 0;
        data.isTasking = isTasking ? 1 : 0;

        if (file) {
            data.photo_url = await uploadFileCloudinary(file);
        }

        data.slug = replaceNameFile(values.name);

        try {
            const res: any = await handleApi(api, data, "post");
            console.log(res);

            message.success(res.message);
            onAddNew(res.data);
            hanldeClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const hanldeClose = () => {
        form.resetFields();
        onClose();
    };
    return (
        <Modal
            closable={!isLoading}
            open={visible}
            onCancel={hanldeClose}
            title="New supplier"
            okText="Add supplier"
            cancelText="Discard"
            onOk={() => form.submit()}
            okButtonProps={{ loading: isLoading }}
        >
            <Form
                disabled={isLoading}
                onFinish={addNewSupplier}
                layout="horizontal"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                size="large"
            >
                <div className="d-none">
                    <input
                        type="file"
                        name=""
                        accept="image/*"
                        id="inpFile"
                        ref={inpRef}
                        onChange={(val: any) => setFile(val.target.files[0])}
                    />
                </div>
                <label
                    htmlFor="inpFile"
                    className="d-flex align-items-center p-2 mb-3 justify-content-center gap-4"
                >
                    {file ? (
                        <Avatar size={80} src={URL.createObjectURL(file)} />
                    ) : (
                        <Avatar
                            style={{
                                backgroundColor: "white",
                                border: "1px dashed #5D6679",
                            }}
                            size={80}
                            icon={<User size={60} color={colors.gray600} />}
                        />
                    )}
                    <div className="ml-3 text-center">
                        <Paragraph className="text-muted m-0 mb-2">
                            Drag image here
                        </Paragraph>
                        <Paragraph className="text-muted mb-0">Or</Paragraph>
                        <Button
                            onClick={() => inpRef.current?.click()}
                            type="link"
                        >
                            Browse image
                        </Button>
                    </div>
                </label>
                <Form.Item
                    name={"name"}
                    label="Supplier name"
                    rules={[
                        {
                            required: true,
                            message: "Enter supplier name.",
                        },
                    ]}
                >
                    <Input placeholder="Enter supplier name" allowClear />
                </Form.Item>
                <Form.Item name={"product"} label="Product">
                    <Input placeholder="Enter product" allowClear />
                </Form.Item>
                <Form.Item name={"category"} label="Category">
                    <Select
                        options={[]}
                        placeholder="Select product category"
                    />
                </Form.Item>
                <Form.Item name={"price"} label="Buying Price">
                    <Input
                        placeholder="Enter buying price"
                        allowClear
                        type="number"
                    />
                </Form.Item>
                <Form.Item name={"contact"} label="Contact Number">
                    <Input placeholder="Enter contact number" allowClear />
                </Form.Item>
                <Form.Item label="Type">
                    <div className="mb-2">
                        <Button
                            size="middle"
                            onClick={() => setIsTasking(false)}
                            type={isTasking === false ? "primary" : "default"}
                        >
                            Not tasking return
                        </Button>
                    </div>
                    <div>
                        <Button
                            size="middle"
                            onClick={() => setIsTasking(true)}
                            type={isTasking ? "primary" : "default"}
                        >
                            Tasking return
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ToggleSupplier;
