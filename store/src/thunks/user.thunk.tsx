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
  "users/getCustomerList",
  async () => {
    return await userApis.customerListApi();
  }
);

export const addCustomerThunk = createAsyncThunk(
  "users/editCustomer",
  async ({first_name, last_name, address, state_name, city, country, zipcode, phone_no, email, authentication}: any) => {
    return await userApis.addCustomerApi(
      first_name,
      last_name,
      address,
      state_name,
      city,
      country,
      zipcode,
      phone_no,
      email,
      authentication
    );
  }
);

export const editCustomerThunk = createAsyncThunk(
  "users/editCustomer",
  async ({first_name, last_name, address, state_name, city, country, zipcode, phone_no, email, authentication, record_id, status}: any) => {
    return await userApis.editCustomerApi(
      first_name,
      last_name,
      address,
      state_name,
      city,
      country,
      zipcode,
      phone_no,
      email,
      authentication,
      record_id,
      status
    );
  }
);

export const deleteCustomerThunk = createAsyncThunk(
  "users/deleteCustomer",
  async ({record_id}: any) => {
    return await userApis.deleteCustomerApi(record_id);
  }
);

export const suspendCustomerThunk = createAsyncThunk(
  "users/suspendCustomer",
  async ({record_id}: any) => {
    return await userApis.suspendCustomerApi(record_id);
  }
);

export const cancelCustomerSubscriptionThunk = createAsyncThunk(
  "users/cancelCustomerSubscription",
  async ({record_id}: any) => {
    return await userApis.cancelCustomerSubscriptionApi(record_id);
  }
);

export const vocuherListThunk = createAsyncThunk(
  "users/vocuherList",
  async () => {
    return await userApis.voucherListApi();
  }
);