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
}

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
}

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
}

async function customerListApi(): Promise<any> {
  try {
    const result = await postApiCall(endPoints.customerList, { });
    return result;
  } catch (error: any) {
    throw error;
  }
}

export const userApis = {
  makeUserLoginApi,
  verifyUserOtpApi,
  resendOtpApi,
  customerListApi,
};
