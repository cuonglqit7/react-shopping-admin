import { utils, writeFile } from "xlsx";

export const handleExportExcel = async (data: any[], name?: string) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, `${name ? name : `forms.title${Date.now()}`}.xlsx`);
};
