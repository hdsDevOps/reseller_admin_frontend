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

export const forgetPasswordOtpThunk = createAsyncThunk(
  "users/forgetPasswordOtp",
  async ({ email}: any) => {
    return await userApis.forgetPasswordOtpApi(
      email
    );
  }
);

export const forgetPasswordResendOtpThunk = createAsyncThunk(
  "users/forgetPasswordResendOtp",
  async ({ email}: any) => {
    return await userApis.forgetPasswordResendOtpApi(
      email
    );
  }
);

export const forgetPasswordVerifyOtpThunk = createAsyncThunk(
  "users/forgetPasswordVerifyOtp",
  async ({ email, otp }: any) => {
    return await userApis.forgetPasswordVerifyOtpApi(
      email,
      otp
    );
  }
);

export const forgetPasswordResetThunk = createAsyncThunk(
  "users/forgetPasswordReset",
  async ({ email, otp, newpassword }: any) => {
    return await userApis.forgetPasswordResetApi(
      email,
      otp,
      newpassword
    );
  }
);

export const getCustomerListThunk = createAsyncThunk(
  "users/getCustomerList",
  async ({
    search_data,
    country,
    state_name,
    authentication,
    license_usage,
    subscritption_date,
    renewal_date
  }: any) => {
    return await userApis.customerListApi(
      search_data,
      country,
      state_name,
      authentication,
      license_usage,
      subscritption_date,
      renewal_date
    );
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

export const updateCustomerPasswordThunk = createAsyncThunk(
  "users/updateCustomerPassword",
  async ({record_id, password}: any) => {
    return await userApis.updateCustomerPasswordApi(record_id, password);
  }
);

export const vocuherListThunk = createAsyncThunk(
  "users/vocuherList",
  async () => {
    return await userApis.voucherListApi();
  }
);

export const addVoucherThunk = createAsyncThunk(
  "users/addVocuher",
  async ({voucher_code, start_date, end_date, discount_rate, template_details, currency}: any) => {
    return await userApis.addVoucherApi(
      voucher_code,
      start_date,
      end_date,
      discount_rate,
      template_details,
      currency
    );
  }
);

export const editVoucherThunk = createAsyncThunk(
  "users/editVocuher",
  async ({voucher_code, start_date, end_date, discount_rate, template_details, currency, record_id}: any) => {
    return await userApis.editVoucherApi(
      voucher_code,
      start_date,
      end_date,
      discount_rate,
      template_details,
      currency,
      record_id
    );
  }
);

export const deleteVoucherThunk = createAsyncThunk(
  "users/deleteVocuher",
  async ({record_id}: {record_id: string}) => {
    return await userApis.deleteVoucherApi(record_id);
  }
);

export const sendVoucherEmailThunk = createAsyncThunk(
  "users/sendVocuherEmail",
  async ({record_id, customer_id, customer_type}: any) => {
    return await userApis.sendVoucherEmailApi(record_id, customer_id, customer_type);
  }
);

export const addCustomerGroupThunk = createAsyncThunk(
  "users/addCustomerGroup",
  async ({group_name, country, region, plan, start_date, end_date, license_usage, no_customer}: any) => {
    return await userApis.addCustomerGroupApi(
      group_name,
      country,
      region,
      plan,
      start_date,
      end_date,
      license_usage,
      no_customer
    );
  }
);

export const editCustomerGroupThunk = createAsyncThunk(
  "users/editCustomerGroup",
  async ({group_name, country, region, plan, start_date, end_date, license_usage, no_customer, record_id}: any) => {
    return await userApis.editCustomerGroupApi(
      group_name,
      country,
      region,
      plan,
      start_date,
      end_date,
      license_usage,
      no_customer,
      record_id
    );
  }
);

export const getCustomerGroupListThunk = createAsyncThunk(
  "users/getCustomerGroupList",
  async () => {
    return await userApis.getCustomerGroupListApi();
  }
);

export const deleteCustomerGroupThunk = createAsyncThunk(
  "users/deleteCustomerGroup",
  async ({record_id}: any) => {
    return await userApis.deleteCustomerGroupApi(record_id);
  }
);

export const getSubscriptonPlansListThunk = createAsyncThunk(
  "users/getSubscriptonPlansList",
  async () => {
    return await userApis.subscriptionPlansListApi();
  }
);