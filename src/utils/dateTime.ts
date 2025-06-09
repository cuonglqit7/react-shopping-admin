import { add0ToNumber } from "./add0ToNumber";

export class DateTime {
    static CalendarDate = (val: any) => {
        const date = new Date(val);

        return `${date.getFullYear()}-${add0ToNumber(
            date.getMonth() + 1
        )}-${add0ToNumber(date.getDate())}`;
    };
}
