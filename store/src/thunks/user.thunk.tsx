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

export const logOutThunk = createAsyncThunk(
  "users/logOut",
  async () => {
    return await userApis.logOutApi();
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
  async ({first_name, last_name, address, state_name, city, country, zipcode, phone_no, email, authentication, record_id, status, account_status}: any) => {
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
      status,
      account_status
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

export const declineCustomerSubscriptionThunk = createAsyncThunk(
  "users/declineCustomerSubscription",
  async ({record_id}: any) => {
    return await userApis.declineCustomerSubscriptionApi(record_id);
  }
);

export const updateCustomerPasswordThunk = createAsyncThunk(
  "users/updateCustomerPassword",
  async ({record_id, password}: any) => {
    return await userApis.updateCustomerPasswordApi(record_id, password);
  }
);

export const getCountryListThunk = createAsyncThunk(
  "users/getCountryList",
  async () => {
    return await userApis.getCountryListAPi();
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
  async ({group_name, start_date}:any) => {
    return await userApis.getCustomerGroupListApi(group_name, start_date);
  }
);

export const deleteCustomerGroupThunk = createAsyncThunk(
  "users/deleteCustomerGroup",
  async ({record_id}: any) => {
    return await userApis.deleteCustomerGroupApi(record_id);
  }
);

export const addNotificationTemplateThunk = createAsyncThunk(
  "users/addNotificationTemplate",
  async ({template_heading}: any) => {
    return await userApis.addNotificationTemplateApi(template_heading);
  }
);

export const getNotificationTemplateThunk = createAsyncThunk(
  "users/getNotificationTemplate",
  async () => {
    return await userApis.getNotificationTemplateApi();
  }
);

export const updateNoficationTemplateContentThunk = createAsyncThunk(
  "users/updateNoficationTemplateContent",
  async ({record_id, template_content}: any) => {
    return await userApis.updateNoficationTemplateContentApi(record_id, template_content);
  }
);

export const getSubscriptonPlansListThunk = createAsyncThunk(
  "users/getSubscriptonPlansList",
  async () => {
    return await userApis.subscriptionPlansListApi();
  }
);

export const getPaymentMethodsListThunk = createAsyncThunk(
  "users/getPaymentMethodsList",
  async () => {
    return await userApis.getPaymentMethodsListApi();
  }
);

export const updatePaymentMethodStatusThunk = createAsyncThunk(
  "users/updatePaymentMethodStatus",
  async ({record_id, status}: any) => {
    return await userApis.updatePaymentMethodStatusApi(record_id, status);
  }
);

export const getBannerListThunk = createAsyncThunk(
  "users/getBannerList",
  async () => {
    return await userApis.getBannerListApi();
  }
);

export const addBannerThunk = createAsyncThunk(
  "users/addBanner",
  async ({title, description, video_url, button_title, button_url, background_image, show_video_status, show_promotion_status, currency_details}: any) => {
    return await userApis.addBannerApi(title, description, video_url, button_title, button_url, background_image, show_video_status, show_promotion_status, currency_details);
  }
);

export const editBannerThunk = createAsyncThunk(
  "users/editBanner",
  async ({record_id, title, description, video_url, button_title, button_url, background_image, show_video_status, show_promotion_status, currency_details, active}: any) => {
    return await userApis.editBannerApi(record_id, title, description, video_url, button_title, button_url, background_image, show_video_status, show_promotion_status, currency_details, active);
  }
);

export const deleteBannerThunk = createAsyncThunk(
  "users/deleteBanner",
  async ({record_id}: any) => {
    return await userApis.deleteBannerApi(record_id);
  }
);

export const getPromotionsListThunk = createAsyncThunk(
  "users/getPromotionsList",
  async () => {
    return await userApis.getPromotionsListApi();
  }
);

export const addPromotionThunk = createAsyncThunk(
  "users/addPromotion",
  async ({code, start_date, end_date, html_template}: any) => {
    return await userApis.addPromotionApi(code, start_date, end_date, html_template);
  }
);

export const editPromotionThunk = createAsyncThunk(
  "users/editPromotion",
  async ({record_id, code, start_date, end_date, html_template}: any) => {
    return await userApis.editPromotionApi(record_id, code, start_date, end_date, html_template);
  }
);

export const deletetPromotionThunk = createAsyncThunk(
  "users/deletePromotion",
  async ({record_id}: any) => {
    return await userApis.deletePromotionApi(record_id);
  }
);

export const getAboutUsThunk = createAsyncThunk(
  "users/getAboutUs",
  async () => {
    return await userApis.getAboutUsApi();
  }
);

export const updateAboutUsThunk = createAsyncThunk(
  "users/updateAboutUs",
  async ({heading_section, block1, block2}: any) => {
    return await userApis.udpateAboutUsApi(heading_section, block1, block2);
  }
);

export const getContactUsThunk = createAsyncThunk(
  "users/getContactUs",
  async () => {
    return await userApis.getContactUsApi();
  }
);

export const updateContactUsThunk = createAsyncThunk(
  "users/updateContactUs",
  async ({content_description, phone_no, email, address}: any) => {
    return await userApis.udpateContactUsApi(content_description, phone_no, email, address);
  }
);

export const getResourcesThunk = createAsyncThunk(
  "users/getResources",
  async () => {
    return await userApis.getResourcesApi();
  }
);

export const updateResourcesThunk = createAsyncThunk(
  "users/updateResources",
  async ({connect, create, Access, contact}: any) => {
    return await userApis.udpateResourcesApi(connect, create, Access, contact);
  }
);

export const getFooterThunk = createAsyncThunk(
  "users/getFooter",
  async () => {
    return await userApis.getFooterApi();
  }
);

export const getMenuThunk = createAsyncThunk(
  "users/getMenu",
  async () => {
    return await userApis.getMenuApi();
  }
);

export const updateMenuThunk = createAsyncThunk(
  "users/updateMenu",
  async ({menu1, menu2, menu3, menu4, menu5, menu6}: any) => {
    return await userApis.udpateMenuApi(menu1, menu2, menu3, menu4, menu5, menu6);
  }
);

export const getSeoDataThunk = createAsyncThunk(
  "users/getSeoData",
  async () => {
    return await userApis.getSeoDataApi();
  }
);

export const updateSeoDataThunk = createAsyncThunk(
  "users/updateSeoData",
  async ({title, desc, alt_image, image_path, keywords, urllink}: any) => {
    return await userApis.udpateSeoDataApi(title, desc, alt_image, image_path, keywords, urllink);
  }
);

export const uploadImageThunk = createAsyncThunk(
  "users/uploadImage",
  async ({image}: any) => {
    return await userApis.uploadImageApi(image);
  }
);

export const getFaqsThunk = createAsyncThunk(
  "users/getFaqs",
  async () => {
    return await userApis.getFaqsApi();
  }
);

export const addFaqThunk = createAsyncThunk(
  "users/addFaqData",
  async ({question, answer, order}: any) => {
    return await userApis.addFaqsApi(question, answer, order);
  }
);

export const updateFaqThunk = createAsyncThunk(
  "users/updateFaqData",
  async ({question, answer, order, record_id}: any) => {
    return await userApis.updateFaqsApi(question, answer, order, record_id);
  }
);

export const deleteFaqThunk = createAsyncThunk(
  "users/deleteFaqData",
  async ({record_id}: any) => {
    return await userApis.deleteFaqsApi(record_id);
  }
);

export const getPlanAndPriceThunk = createAsyncThunk(
  "users/getPlanAndPrice",
  async () => {
    return await userApis.getPlanAndPriceApi();
  }
);