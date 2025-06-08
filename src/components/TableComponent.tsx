import React, { useEffect, useState } from "react";
import { FormModel } from "../models/FormModel";
import { Button, Space, Table, Typography } from "antd";
import type { ColumnProps } from "antd/es/table";
import { Sort } from "iconsax-react";
import { colors } from "../constants/color";
import { render } from "@testing-library/react";
import { Resizable } from "re-resizable";

interface Props {
    forms: FormModel;
    isLoading: boolean;
    records: any[];
    onPageChange: (val: { page: number; pageSize: number }) => void;
    onAddNew: () => void;
    scrollHeight?: string;
    total: number;
    extraColumns: (item: any) => void;
}

const { Title } = Typography;

const TableComponent = (props: Props) => {
    const {
        forms,
        isLoading,
        records,
        onPageChange,
        onAddNew,
        scrollHeight,
        total,
        extraColumns,
    } = props;

    const [pageInfo, setPageInfo] = useState<{
        page: number;
        pageSize: number;
    }>({
        page: 1,
        pageSize: 10,
    });

    const [columns, setColumns] = useState<ColumnProps<any>[]>([]);

    useEffect(() => {
        onPageChange(pageInfo);
        setColumns(columns);
    }, [pageInfo]);

    useEffect(() => {
        if (forms && forms.formItems && forms.formItems.length > 0) {
            const items: any = [];
            forms.formItems.forEach((item) =>
                items.push({
                    key: item.key,
                    dataIndex: item.value,
                    title: item.label,
                    width: item.displayLenght,
                })
            );
            items.unshift({
                key: "index",
                title: "ID",
                dataIndex: "index",
                align: "center",
                width: 50,
            });

            if (extraColumns) {
                items.push({
                    key: "actions",
                    title: "Actions",
                    dataIndex: "",
                    fixed: "right",
                    align: "center",
                    render: (item: any) => extraColumns(item),
                    width: 100,
                });
            }

            setColumns(items);
        }
    }, [forms]);

    const title = () => (
        <div className="row">
            <div className="col">
                <Title level={5}>{forms.title}</Title>
            </div>
            <div className="col text-end">
                <Space>
                    <Button type="primary" onClick={onAddNew}>
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

    const renderTitle = (props: any) => {
        const { children, ...resProps } = props;
        return (
            <th {...resProps}>
                <Resizable
                    enable={{ right: true }}
                    onResizeStop={(_event, _direction, _elementRef, delta) => {
                        const item: any = columns.find(
                            (e) => e.title === children[1]
                        );
                        if (item) {
                            const items = [...columns];
                            const newWidth = item.width + delta.width;

                            const index = columns.findIndex(
                                (e) => e.key === item.key
                            );

                            if (index !== -1) {
                                items[index].width = newWidth;
                            }

                            setColumns(items);
                        }
                    }}
                >
                    {children}
                </Resizable>
            </th>
        );
    };

    return (
        <Table
            bordered
            pagination={{
                showSizeChanger: true,
                onShowSizeChange(current, size) {
                    setPageInfo({ ...pageInfo, pageSize: size });
                },
                total,
                onChange(page, pageSize) {
                    setPageInfo({ ...pageInfo, page });
                },
                showQuickJumper: true,
            }}
            scroll={{
                y: scrollHeight ? scrollHeight : "calc(100vh - 300px)",
            }}
            loading={isLoading}
            dataSource={records}
            columns={columns}
            title={title}
            components={{
                header: {
                    cell: renderTitle,
                },
            }}
        />
    );
};

export default TableComponent;
