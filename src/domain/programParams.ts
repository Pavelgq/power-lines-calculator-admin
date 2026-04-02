/** Параметры программ расчёта: общие для UI и экспорта в Excel. */

export const sheldMainParams = {
  param1: "Напряжение",
  param1Dim: "кВ",
  param2: "Длина линии",
  param2Dim: "м",
  param3: "",
  param4: "",
};

export const cableMainParams = {
  param1: "Напряжение",
  param1Dim: "кВ",
  param2: "Длина линии",
  param2Dim: "м",
  param3: "",
  param4: "",
};

export const pipeMainParams = {
  param1: "Диаметр кабеля",
  param1Dim: "мм",
  param2: "Число кабелей в трубе",
  param2Dim: "",
  param3: "Тип кабеля",
  param4: "Способ прокладки",
};

export const ProgramParams = [pipeMainParams, sheldMainParams, cableMainParams];
