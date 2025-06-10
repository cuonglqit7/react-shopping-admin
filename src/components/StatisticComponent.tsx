import { Card, Space, Typography } from "antd";
import { ReactNode } from "react";
import { colors } from "../constants/color";
import { StatisticModel } from "../models/StatisticModel";

interface Props {
    title: string;
    datas: StatisticModel[];
}

const { Title, Text } = Typography;

const StatisticComponent = (props: Props) => {
    const { title, datas } = props;
    return (
        <Card className="mt-2 mb-4">
            <Title
                style={{
                    color: colors.grey800,
                    fontWeight: "500",
                    fontSize: 18,
                }}
            >
                {title}
                <div className="row ">
                    {datas.map((item: StatisticModel, index) => (
                        <div
                            className="col"
                            key={item.key}
                            style={{
                                borderRight: `${
                                    index < datas.length - 1 ? 1 : 0
                                }px solid #e0e0e0`,
                            }}
                        >
                            <div className="text-center">{item.icon}</div>
                            <Space>
                                <Title className="m-0" level={5}>
                                    {item.value}
                                </Title>
                                <Text>{item.description}</Text>
                            </Space>
                        </div>
                    ))}
                </div>
            </Title>
        </Card>
    );
};

export default StatisticComponent;
