import moment from "moment";

export const stableSort = <T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const isNumber = (data: string) =>
  Number.isInteger(Number(data)) ? Number(data) : data;

export const checkTimeInterval = (time: string, interval: string): boolean => {
  if (!time && interval !== "all") {
    return false;
  }
  switch (interval) {
    case "all":
      console.log(
        time,
        interval,
        moment(time).format(),
        moment().subtract(1, "years").format(),
        moment(time).isAfter(moment().subtract(1, "year"))
      );
      return true;
    case "day":
      if (moment(time).isAfter(moment().subtract(1, "days"))) {
        return true;
      }
      break;
    case "week":
      if (moment(time).isAfter(moment().subtract(7, "days"))) {
        return true;
      }
      break;
    case "month":
      if (moment(time).isAfter(moment().subtract(1, "months"))) {
        return true;
      }
      break;
    case "quarter":
      if (moment(time).isAfter(moment().subtract(3, "months"))) {
        return true;
      }
      break;
    case "year":
      if (moment(time).isAfter(moment().subtract(1, "years"))) {
        return true;
      }
      break;
    default:
      break;
  }

  return false;
};
