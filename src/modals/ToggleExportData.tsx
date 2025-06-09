import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    List,
    message,
    Modal,
    Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { FormModel } from "../models/FormModel";
import handleApi from "../apis/handleApi";
import { DateTime } from "../utils/dateTime";
import { handleExportExcel } from "../utils/handleExportExcel";

interface Props {
    vissble: boolean;
    onClose: () => void;
    api: string;
    name?: string;
}

const { RangePicker } = DatePicker;

const ToggleExportData = (props: Props) => {
    const { vissble, onClose, api, name } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [forms, setForms] = useState<FormModel>();
    const [isGetting, setIsGetting] = useState(false);
    const [checkedValue, setCheckedValue] = useState<string[]>([]);
    const [timeChecked, setTimeChecked] = useState<string>("range");
    const [dates, setDates] = useState({
        start: "",
        end: "",
    });

    useEffect(() => {
        if (vissble) {
            getForm();
        }
    }, [vissble]);

    const getForm = async () => {
        const url = `/${api}/get-form`;
        setIsGetting(true);
        try {
            const res: any = await handleApi(url);
            res.data && setForms(res.data);
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setIsGetting(false);
        }
    };

    const handleChangeCheckedValue = (val: string) => {
        const items = [...checkedValue];
        const index = items.findIndex((e) => e === val);

        if (index !== -1) {
            items.splice(index, 1);
        } else {
            items.push(val);
        }
        setCheckedValue(items);
    };

    const handleExport = async () => {
        let url = ``;
        if (timeChecked !== "all" && dates.start && dates.end) {
            if (
                new Date(dates.start).getTime() > new Date(dates.end).getTime()
            ) {
                message.error("Thời gian lỗi!");
            } else {
                url = `/${api}/get-export-data?start=${dates.start}&end=${dates.end}`;
            }
        } else {
            url = `/${api}/get-export-data`;
        }

        const data = checkedValue;

        if (Object.keys(data).length > 0) {
            setIsLoading(true);
            try {
                const res: any = await handleApi(url, data, "post");
                handleExportExcel(res.data, api);
            } catch (error: any) {
                message.error(error.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            message.error("Hãy chọn 1 cột mà bạn muốn lấy dữ liệu.");
        }
    };

    return (
        <Modal
            loading={isGetting}
            open={vissble}
            closable={!isLoading}
            onCancel={onClose}
            onOk={handleExport}
            okButtonProps={{
                loading: isLoading,
            }}
            title="Export to excel"
        >
            <div>
                <div>
                    <Checkbox
                        checked={timeChecked === "all"}
                        onChange={() =>
                            setTimeChecked(
                                timeChecked === "all" ? "range" : "all"
                            )
                        }
                    >
                        Get all
                    </Checkbox>
                </div>
                <div className="mt-2">
                    <Checkbox
                        checked={timeChecked === "range"}
                        onChange={() =>
                            setTimeChecked(
                                timeChecked === "all" ? "range" : "all"
                            )
                        }
                    >
                        Date range
                    </Checkbox>
                    <div className="mt-2">
                        <Space>
                            {timeChecked === "range" && (
                                <RangePicker
                                    onChange={(val: any) =>
                                        setDates(
                                            val && val[0] && val[1]
                                                ? {
                                                      start: `${DateTime.CalendarDate(
                                                          val[0]
                                                      )} 00:00:00`,
                                                      end: `${DateTime.CalendarDate(
                                                          val[1]
                                                      )} 00:00:00`,
                                                  }
                                                : {
                                                      start: "",
                                                      end: "",
                                                  }
                                        )
                                    }
                                />
                            )}
                        </Space>
                    </div>
                </div>
                {/* <Space>
                    <RangePicker />
                    <Button type="link">Export all</Button>
                </Space> */}
            </div>
            <Divider />
            <div className="mt-2">
                <List
                    dataSource={forms?.formItems}
                    renderItem={(item) => (
                        <List.Item key={item.key}>
                            <Checkbox
                                checked={checkedValue.includes(item.value)}
                                onChange={() =>
                                    handleChangeCheckedValue(item.value)
                                }
                            >
                                {item.label}
                            </Checkbox>
                        </List.Item>
                    )}
                />
            </div>
        </Modal>
    );
};

export default ToggleExportData;
