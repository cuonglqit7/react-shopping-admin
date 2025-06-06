import { Avatar, Button, Form, message, Modal, Typography } from "antd";
import { User } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import handleApi from "../apis/handleApi";
import { colors } from "../constants/color";
import { SupplierModel } from "../models/supplierModel";
import { replaceNameFile } from "../utils/replaceNameFile";
import { uploadFileCloudinary } from "../utils/uploadFile";
import { FormItemModel, FormModel } from "../models/FormModel";
import FormItem from "../components/FormItem";

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
    const [isGetting, setIsGetting] = useState(false);
    const [formData, setFormData] = useState<FormModel>();

    useEffect(() => {
        getFormData();
    }, [visible]);

    useEffect(() => {
        if (supplier) {
            form.setFieldsValue(supplier);

            setIsTasking(supplier.isTasking === 1);
        }
    }, [supplier]);

    const addNewSupplier = async (values: any) => {
        setIsLoading(true);

        const data: any = {};
        const api = `/supplier/${supplier ? `update?id=${supplier._id}` : ""}`;

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
            const res: any = await handleApi(
                api,
                data,
                supplier ? "put" : "post"
            );

            message.success(res.message);
            !supplier && onAddNew(res.data);
            hanldeClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getFormData = async () => {
        setIsGetting(true);
        const api = `/supplier/get-form`;
        try {
            const res: any = await handleApi(api);

            res.data && setFormData(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsGetting(false);
        }
    };

    const hanldeClose = () => {
        form.resetFields();
        onClose();
    };
    return (
        <Modal
            loading={isGetting}
            closable={!isLoading}
            open={visible}
            onCancel={hanldeClose}
            title={supplier ? "Edit supplier" : "New supplier"}
            okText={supplier ? "Update supplier" : "Add supplier"}
            cancelText="Discard"
            onOk={() => form.submit()}
            okButtonProps={{ loading: isLoading }}
        >
            {formData && (
                <Form
                    disabled={isLoading}
                    onFinish={addNewSupplier}
                    layout={formData.layout}
                    form={form}
                    labelCol={{ span: formData.labelCol }}
                    wrapperCol={{ span: formData.wrapperCol }}
                    size={formData.size}
                >
                    {formData.fileUpload ? (
                        <>
                            <div className="d-none">
                                <input
                                    type="file"
                                    name=""
                                    accept="image/*"
                                    id="inpFile"
                                    ref={inpRef}
                                    onChange={(val: any) =>
                                        setFile(val.target.files[0])
                                    }
                                />
                            </div>
                            <label
                                htmlFor="inpFile"
                                className="d-flex align-items-center p-2 mb-3 justify-content-center gap-4"
                            >
                                {file ? (
                                    <Avatar
                                        size={80}
                                        src={URL.createObjectURL(file)}
                                    />
                                ) : supplier ? (
                                    <Avatar
                                        size={80}
                                        src={supplier.photo_url}
                                    />
                                ) : (
                                    <Avatar
                                        style={{
                                            backgroundColor: "white",
                                            border: "1px dashed #5D6679",
                                        }}
                                        size={80}
                                        icon={
                                            <User
                                                size={60}
                                                color={colors.gray600}
                                            />
                                        }
                                    />
                                )}
                                <div className="ml-3 text-center">
                                    <Paragraph className="text-muted m-0 mb-2">
                                        Drag image here
                                    </Paragraph>
                                    <Paragraph className="text-muted mb-0">
                                        Or
                                    </Paragraph>
                                    <Button
                                        onClick={() => inpRef.current?.click()}
                                        type="link"
                                    >
                                        Browse image
                                    </Button>
                                </div>
                            </label>
                        </>
                    ) : (
                        <></>
                    )}

                    {formData.formItems.map((item: FormItemModel) => (
                        <FormItem item={item} />
                    ))}
                </Form>
            )}
        </Modal>
    );
};

export default ToggleSupplier;
