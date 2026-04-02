import moment from "moment";
import { saveAs } from "file-saver";
import { ActionFullInterface } from "../interfaces/action.interface";
import { ClientDataInterface } from "../interfaces/client.interface";
import { ProgramParams } from "../domain/programParams";
import { saveToExcel } from "./format";

function parseActionParams(raw: string | undefined): {
  param1?: string;
  param2?: string;
  param3?: string;
  param4?: string;
} | null {
  if (!raw || raw.length <= 1) {
    return null;
  }
  try {
    return JSON.parse(raw) as {
      param1?: string;
      param2?: string;
      param3?: string;
      param4?: string;
    };
  } catch {
    return null;
  }
}

export function exportClientsToExcel(clientsPayload: ClientDataInterface[]): void {
  const newData = clientsPayload
    .filter((el) => !el.request)
    .map((el, index) => ({
      id: index + 1,
      Имя: el.first_name,
      Фамилия: el.last_name,
      Компания: el.company,
      Должность: el.office_position,
      Телефон: el.phone_number,
      "e-main": el.email,
      Дата: moment(el.creation_date).format("DD MMMM YYYY"),
      Время: moment(el.creation_date).format("HH:mm"),
      Ключ: el.client_key ?? "",
      "Срок дейсвия ключа": el.valid_until
        ? moment(el.valid_until).format("DD MMMM YYYY")
        : "",
    }));

  saveToExcel(newData);
}

export function exportActionsToExcel(
  rows: (ActionFullInterface & {
    first_name: string;
    last_name: string;
    company: string;
  })[],
  programType: number
): void {
  const sheetNames = ["Все данные", "Труба", "Экран", "Кабель"] as const;
  const fileNames = ["all", "pipe", "ekran", "cable"] as const;
  const safeIndex = Math.min(
    Math.max(programType, 0),
    sheetNames.length - 1
  );

  const newData = rows.map((el, index) => {
    const paramsJson = parseActionParams(el.params);
    const param1 = paramsJson?.param1 || "";
    const param2 = paramsJson?.param2 || "";
    const param3 = paramsJson?.param3 || "";
    const param4 = paramsJson?.param4 || "";
    const programNumber = Math.min(
      Math.max(Number(el.program_type) - 1, 0),
      ProgramParams.length - 1
    );
    const defs = ProgramParams[programNumber];
    const paramsTemplate1 =
      el.params && `${defs.param1}: ${param1}${defs.param1Dim}`;
    const paramsTemplate2 =
      el.params && `${defs.param2}: ${param2}${defs.param2Dim}`;
    const paramsTemplate3 =
      el.params && param3 && `${defs.param3}: ${param3}`;
    const paramsTemplate4 =
      el.params && param4 && `${defs.param4}: ${param4}`;
    return {
      id: index + 1,
      Имя: el.first_name,
      Фамилия: el.last_name,
      Компания: el.company,
      Дата: moment(el.date).format("DD MMMM YYYY"),
      Время: moment(el.date).format("HH:mm"),
      "Использованный код": el.accept_key,
      Программа: String(el.program_type ?? ""),
      Параметр1: paramsTemplate1,
      Параметр2: paramsTemplate2,
      ...(paramsTemplate3 ? { Параметр3: paramsTemplate3 } : {}),
      ...(paramsTemplate4 ? { Параметр4: paramsTemplate4 } : {}),
    };
  });

  saveToExcel(newData, sheetNames[safeIndex], fileNames[safeIndex]);
}

export function downloadActionFileBlob(data: unknown, path: string): void {
  const blob = new Blob([JSON.stringify(data)], {
    type: "text/plain;charset=utf-8",
  });
  const base = path.split(".")[0];
  saveAs(blob, `${base}.txt`);
}
