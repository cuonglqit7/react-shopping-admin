import { Button, message, Modal, Space, Tooltip } from "antd";
import { Edit, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import handleApi from "../apis/handleApi";
import TableComponent from "../components/TableComponent";
import { ToggleExportData, ToggleSupplier } from "../modals";
import { FormModel } from "../models/FormModel";
import { SupplierModel } from "../models/supplierModel";

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
    const [forms, setForms] = useState<FormModel>();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getSuppliers();
    }, [page, pageSize]);

    const getData = async () => {
        setIsLoading(true);
        try {
            // await getSuppliers();
            await getForms();
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getForms = async () => {
        const api = `/supplier/get-form`;
        const res: any = await handleApi(api);

        res.data && setForms(res.data);
    };

    const getSuppliers = async () => {
        setIsLoading(true);
        const api = `/supplier?page=${page}&pageSize=${pageSize}`;
        try {
            const res: any = await handleApi(api);

            const items: SupplierModel[] = [];

            res.data &&
                res.data.items.forEach((item: any, index: number) =>
                    items.push({
                        index: (page - 1) * pageSize + (index + 1),
                        ...item,
                    })
                );

            setSuppliers(items);
            setTotal(res.data.total);
        } catch (error: any) {
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

            await getSuppliers();
            message.error(res.message);
        } catch (error: any) {
            message.error(error.message);
        }
    };

    return (
        <div>
            {forms && (
                <TableComponent
                    api="supplier"
                    forms={forms}
                    records={suppliers}
                    isLoading={isLoading}
                    total={total}
                    onPageChange={(val) => {
                        setPage(val.page);
                        setPageSize(val.pageSize);
                    }}
                    onAddNew={() => setIsVisibleAddNewModelSupplier(true)}
                    extraColumns={(item: any) => (
                        <Space>
                            <Tooltip title="Edit">
                                <Button
                                    type="text"
                                    onClick={() => {
                                        setSupplierSelected(item);
                                        setIsVisibleAddNewModelSupplier(true);
                                    }}
                                    icon={
                                        <Edit className="text-info" size={20} />
                                    }
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
                                            onOk: () =>
                                                removeSupplier(item._id),
                                        })
                                    }
                                    icon={
                                        <Trash
                                            className="text-danger"
                                            size={20}
                                        />
                                    }
                                ></Button>
                            </Tooltip>
                        </Space>
                    )}
                />
            )}
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
