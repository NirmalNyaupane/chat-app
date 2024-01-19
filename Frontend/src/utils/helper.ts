import { ApiFailureError } from "@/types/generics/ApiGenericsType";
import { AxiosError } from "axios";
import { differenceInYears, differenceInMonths, differenceInWeeks, differenceInDays, differenceInHours, differenceInSeconds, differenceInMinutes, min } from 'date-fns'
const showError = (error: AxiosError<ApiFailureError<any>>) => {
  return error.response?.data?.error?.length > 0
    ? error.response?.data?.error[0]
    : error.response?.data.message
      ? error?.response?.data?.message
      : error.message;
};


const firstCharacterOfFullName = (fullName: string) => {
  if (!fullName) return null;
  const firstCharacter = fullName.split(" ").map((name) => name.charAt(0));
  return firstCharacter.join("");
}


const findDifferenceTime = (pastDate: string) => {
  const year = differenceInYears(new Date(pastDate), new Date());
  if (year > 1) return year + "years";

  const month = differenceInMonths(new Date(pastDate), new Date());
  if (month > 1) return month + "monts";

  const week = differenceInWeeks(new Date(pastDate), new Date());
  if (week > 1) return week + "weeks"
  const days = differenceInDays(new Date(pastDate), new Date())
  if (days > 1) return days + "days"
  const hour = differenceInHours(Date.now(), Date.parse(pastDate))
  if (hour > 1) return hour + "hours";
  const minute = differenceInMinutes(new Date(pastDate), new Date());
  if (minute > 1) return minute + "minutes"

  console.log("hour", new Date(pastDate))
  return "now"
}
export { showError, firstCharacterOfFullName, findDifferenceTime };
