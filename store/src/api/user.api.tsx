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

async function addVoucherApi(
  voucher_code: string,
  start_date: string,
  end_date: string,
  discount_rate: number,
  template_details: string,
  currency: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addVoucher, {voucher_code, start_date, end_date, discount_rate, template_details, currency});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function editVoucherApi(
  voucher_code: string,
  start_date: string,
  end_date: string,
  discount_rate: number,
  template_details: string,
  currency: string,
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.editVoucher, {voucher_code, start_date, end_date, discount_rate, template_details, currency, record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteVoucherApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteVoucher, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addCustomerGroupApi(
  group_name: string,
  country: string,
  region: string,
  plan: string,
  start_date: string,
  end_date: string, 
  license_usage: string, 
  no_customer: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addCustomerGroup, {group_name, country, region, plan, start_date, end_date, license_usage, no_customer});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function editCustomerGroupApi(
  group_name: string,
  country: string,
  region: string,
  plan: string,
  start_date: string,
  end_date: string, 
  license_usage: string, 
  no_customer: string,
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.editCustomerGroup, {group_name, country, region, plan, start_date, end_date, license_usage, no_customer, record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getCustomerGroupListApi(): Promise<any> {
  try {
    const result = await postApiCall(endPoints.customerGroupList, {});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteCustomerGroupApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteCustomerGroup, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function subscriptionPlansListApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.subscriptionPlansList);
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
  addVoucherApi,
  editVoucherApi,
  deleteVoucherApi,
  addCustomerGroupApi,
  editCustomerGroupApi,
  getCustomerGroupListApi,
  deleteCustomerGroupApi,
  subscriptionPlansListApi,
};
