import {
    Button,
    message,
    Modal,
    Space,
    Table,
    Tooltip,
    Typography,
} from "antd";
import { ColumnProps } from "antd/es/table";
import { Edit, Sort, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import handleApi from "../apis/handleApi";
import { colors } from "../constants/color";
import { ToggleSupplier } from "../modals";
import { SupplierModel } from "../models/supplierModel";

const { Title, Text } = Typography;
const { confirm } = Modal;

const SuppliersScreen = () => {
    const [isVisibleAddNewModelSupplier, setIsVisibleAddNewModelSupplier] =
        useState(false);
    const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [supplierSelected, setSupplierSelected] = useState<SupplierModel>();
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState<number>(10);
    const columnProps: ColumnProps<SupplierModel>[] = [
        {
            title: "ID",
            dataIndex: "_id",
            render: (_: any, __: any, index: number) => {
                return (page - 1) * pageSize + index + 1;
            },
            align: "center",
        },
        {
            key: "name",
            dataIndex: "name",
            title: "Supplier name",
        },
        {
            key: "product",
            dataIndex: "product",
            title: "Product",
        },
        {
            key: "email",
            dataIndex: "email",
            title: "Email",
        },
        {
            key: "contact",
            dataIndex: "contact",
            title: "Contact",
        },
        {
            key: "type",
            dataIndex: "isTasking",
            title: "Type",
            render: (isTascking: boolean) => (
                <Text type={isTascking ? "success" : "warning"}>
                    {isTascking ? "Tasking return" : "Not tasking return"}
                </Text>
            ),
        },
        {
            key: "active",
            dataIndex: "active",
            title: "On the way",
            render: (num) => num ?? "-",
        },
        {
            key: "buttonContainer",
            dataIndex: "",
            title: "Actions",
            render: (item: SupplierModel) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button
                            type="text"
                            onClick={() => {
                                setSupplierSelected(item);
                                setIsVisibleAddNewModelSupplier(true);
                            }}
                            icon={<Edit className="text-info" size={20} />}
                        ></Button>
                    </Tooltip>
                    <Tooltip title="Move to trash">
                        <Button
                            type="text"
                            onClick={() =>
                                confirm({
                                    title: "confirm",
                                    content:
                                        "Bạn có chắc muốn xóa supplier này?",
                                    onOk: () => removeSupplier(item._id),
                                })
                            }
                            icon={<Trash className="text-danger" size={20} />}
                        ></Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getSuppliers();
    }, [page, pageSize]);

    const getSuppliers = async () => {
        setIsLoading(true);
        const api = `/supplier?page=${page}&pageSize=${pageSize}`;
        try {
            const res: any = await handleApi(api);

            res.data && setSuppliers(res.data.items);
            setTotal(res.data.total);
        } catch (error: any) {
            console.log(error);
            message.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const removeSupplier = async (id: string) => {
        try {
            // const api = `/supplier/update?id=${id}`;
            // const res: any = await handleApi(api, { isDeleted: true }, "put");

            const res: any = await handleApi(
                `/supplier/remove?id=${id}`,
                undefined,
                "delete"
            );

            getSuppliers();
            message.success(res.message);
        } catch (error: any) {
            console.log(error.message);
            message.error(error.message);
        }
    };

    // const hanldeAddDemoData = () => {
    //     demoData.forEach(async (item) => {
    //         const data = {
    //             name: item.name,
    //             product: item.product,
    //             email: item.email,
    //             active: item.active,
    //             categories: "",
    //             price: item.price,
    //             contact: item.contact,
    //             isTasking: item.isTasking,
    //             slug: item.slug,
    //         };

    //         const api = `/supplier`;
    //         try {
    //             await handleApi(api, data, "post");
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     });
    // };

    const title = () => (
        <div className="row">
            <div className="col">
                <Title level={5}>Suppliers</Title>
            </div>
            <div className="col text-end">
                <Space>
                    <Button
                        type="primary"
                        onClick={() => setIsVisibleAddNewModelSupplier(true)}
                    >
                        Add Product
                    </Button>
                    <Button icon={<Sort size={20} color={colors.gray600} />}>
                        Filters
                    </Button>
                    <Button>Download all</Button>
                </Space>
            </div>
        </div>
    );
    return (
        <div>
            <Table
                rowKey="_id"
                pagination={{
                    showSizeChanger: true,
                    onShowSizeChange(current, size) {
                        setPageSize(size);
                    },
                    total,
                    onChange(page, pageSize) {
                        setPage(page);
                    },
                }}
                scroll={{
                    y: "calc(100vh - 300px)",
                }}
                loading={isLoading}
                columns={columnProps}
                dataSource={suppliers}
                title={title}
            />
            <ToggleSupplier
                visible={isVisibleAddNewModelSupplier}
                onClose={() => {
                    supplierSelected && getSuppliers();
                    setIsVisibleAddNewModelSupplier(false);
                    setSupplierSelected(undefined);
                }}
                onAddNew={(value) => setSuppliers([...suppliers, value])}
                supplier={supplierSelected}
            />
        </div>
    );
};

export default SuppliersScreen;
