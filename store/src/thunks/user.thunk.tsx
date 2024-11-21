import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApis } from "../api/user.api";

export const getUserAuthTokenFromLSThunk = createAsyncThunk(
  "users/getUserAuthTokenFromLS",
  async () => {
    return localStorage.getItem("LS_KEY_AUTH_TOKEN");
  },
);

export const setUserAuthTokenToLSThunk = createAsyncThunk(
  "users/setUserAuthTokenToLS",
  async (token: string) => {
    return localStorage.setItem("LS_KEY_AUTH_TOKEN", token);
  },
);

export const removeUserAuthTokenFromLSThunk = createAsyncThunk(
  "users/removeUserAuthTokenFromLS",
  async () => {
    return localStorage.removeItem("LS_KEY_AUTH_TOKEN");
  },
);

export const makeUserLoginThunk = createAsyncThunk(
  "users/makeUserLogin",
  async ({ email, password }: any) => {
    return await userApis.makeUserLoginApi(
      email,
      password
    );
  }
);

export const verifyUserOtpThunk = createAsyncThunk(
  "users/verifyUserOtp",
  async ({ admin_id, otp }: any) => {
    return await userApis.verifyUserOtpApi(
      admin_id,
      otp
    );
  }
);

export const resendUserOtpThunk = createAsyncThunk(
  "users/resendUserOtp",
  async ({ admin_id }: any) => {
    return await userApis.resendOtpApi(
      admin_id
    );
  }
);

export const getCustomerListThunk = createAsyncThunk(
  "users/resendUserOtp",
  async () => {
    return await userApis.customerListApi();
  }
);