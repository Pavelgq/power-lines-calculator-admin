import * as XLSX from 'xlsx/xlsx.mjs';
import { ClientDataInterface } from "../interfaces/client.interface";
import { ActionFullInterface } from '../interfaces/action.interface';

export const formatePhone = (phone: string) => {
  const cleaned = `${phone}`.replace(/\D/g, "");
  const match = cleaned.match(/^(8|\+7|)?(\d{3})(\d{3})(\d{4})$/);
  let number;
  if (match) {
    const intlCode = "+7 ";
    number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return number;
};

export const firstUpperChar = (str: string) => {
  if (str === ' ') {
    return str
  }
  return str.trim()[0].toUpperCase() + str.trim().substring(1);
}
  

export const saveToExcel = (data: ClientDataInterface[], sheetName = 'Data') => {
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
  // Generate buffer
  const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  // Binary string
  const bin = XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, "usersData.xlsx");
};
export const saveToExcelBySheet = (data: {data: {[key: string]: any}[], sheetName: string }[]) => {
  
  const workBook = XLSX.utils.book_new();

  data.forEach(sheet => {
    const workSheet = XLSX.utils.json_to_sheet(sheet.data);
    XLSX.utils.book_append_sheet(workBook, workSheet, sheet.sheetName);
  })
  // Generate buffer
  const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  // Binary string
  const bin = XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, "actionData.xlsx");
};
