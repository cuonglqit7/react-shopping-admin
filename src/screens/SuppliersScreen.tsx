import React, { useState } from "react";
import { Button, Space, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Filter, Sort } from "iconsax-react";
import { colors } from "../constants/color";
import { ToggleSupplier } from "../modals";
import { SupplierModel } from "../models/supplierModel";

const { Title } = Typography;

const SuppliersScreen = () => {
    const [isVisibleAddNewModelSupplier, setIsVisibleAddNewModelSupplier] =
        useState(false);
    const columnProps: ColumnProps<SupplierModel>[] = [{}];

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
            <Table columns={columnProps} dataSource={[]} title={title} />
            <ToggleSupplier
                visible={isVisibleAddNewModelSupplier}
                onClose={() => setIsVisibleAddNewModelSupplier(false)}
                onAddNew={(value) => console.log(value)}
            />
        </div>
    );
};

export default SuppliersScreen;
