import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

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

export function hasEmptyString(obj) {
  return Object.values(obj).every((value) => value === "");
}

export function isNumber(value) {
  return !isNaN(value);
}

export function isEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

export function decodeToken(token) {
  try {
    if (token?.token) {
      return jwtDecode(token?.token);
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
export function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) {
      return true; // Token is invalid or doesn't have an expiration date
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // Token decoding failed
  }
}