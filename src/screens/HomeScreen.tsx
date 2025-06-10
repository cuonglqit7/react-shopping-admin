import { Coin } from "iconsax-react";
import { StatisticComponent } from "../components";
import { StatisticModel } from "../models/StatisticModel";
import { colors } from "../constants/color";

function HomeScreen() {
    const salesData: StatisticModel[] = [
        {
            key: "sales",
            description: "Sales",
            color: "",
            icon: <Coin size={32} color={colors.primary} />,
            value: 1,
            valueType: "curency",
        },
        {
            key: "revenue",
            description: "Revenue",
            color: "#817AF3",
            icon: <Coin size={32} color={colors.primary} />,
            value: 18300,
            valueType: "curency",
        },
        {
            key: "profit",
            description: "Profit",
            color: "#DBA362",
            icon: <Coin size={32} color={colors.primary} />,
            value: 868,
            valueType: "curency",
        },
        {
            key: "cost",
            description: "Cost",
            color: "#58D365",
            icon: <Coin size={32} color={colors.primary} />,
            value: 17432,
            valueType: "curency",
        },
    ];
    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    <StatisticComponent
                        title="Sales Overview"
                        datas={salesData}
                    />
                </div>
                <div className="col-md-4">
                    {/* <StatisticComponent title="Inventory Summary">
                        asdsad
                    </StatisticComponent> */}
                </div>
            </div>
        </>
    );
}

export default HomeScreen;
