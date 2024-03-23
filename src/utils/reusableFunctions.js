import dayjs from "dayjs";


export function validateMobileNumber(mobileNumber) {
    const regex = /^[1-9]\d{9}$/;
    return regex.test(mobileNumber);
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const hasSpecialCharacters = (input) => {
  const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return regex.test(input);
};

export function isDateGreaterThanAge(dateString, age) {
  // Example date to check
  let isBefore = dayjs().isBefore(dateString, "year");
  if (!isBefore) {
    let currentAge = dayjs().diff(dateString, "year");
    return currentAge >= age;
  } else {
    return false;
  }

  // const date = new Date(dateString);
  // return date.getDate() > age;
}


export function hasEmptyString(obj){
  return Object.values(obj).every(value => value === "");
}