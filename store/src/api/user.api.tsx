import {endPoints} from '../constants/endPoint';
import {getApiCall, postApiCall} from '../services/crud.service';

async function makeUserLoginApi(
  email: string,
  password: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.login, {
      email,
      password
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function verifyUserOtpApi(
  admin_id: string,
  otp: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.verifyOtp, {
      admin_id,
      otp
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function resendOtpApi(
  admin_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.resendOtp, {
      admin_id
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function customerListApi(): Promise<any> {
  try {
    const result = await postApiCall(endPoints.customerList, { });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addCustomerApi(
  first_name: string,
  last_name: string,
  address: string,
  state_name: string,
  city: string, 
  country: string, 
  zipcode: string, 
  phone_no: string, 
  email: string,
  authentication: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addCustomer, {
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
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function editCustomerApi(
  first_name: string,
  last_name: string,
  address: string,
  state_name: string,
  city: string,
  country: string,
  zipcode: string,
  phone_no: string,
  email: string,
  authentication: string,
  record_id: string,
  status: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.editCustomer, {
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
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteCustomerApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteCustomer, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function suspendCustomerApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.suspendCustomer, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function cancelCustomerSubscriptionApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.cancelCustomerSubscription, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function voucherListApi(): Promise<any> {
  try {
    const result = await postApiCall(endPoints.voucherList, {});
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const userApis = {
  makeUserLoginApi,
  verifyUserOtpApi,
  resendOtpApi,
  customerListApi,
  addCustomerApi,
  editCustomerApi,
  deleteCustomerApi,
  suspendCustomerApi,
  cancelCustomerSubscriptionApi,
  voucherListApi,
};
