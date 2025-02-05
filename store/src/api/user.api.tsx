import {endPoints} from '../constants/endPoint';
import {getApiCall, postApiCall, uploadImageApiCall} from '../services/crud.service';

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

async function forgetPasswordOtpApi(
  email: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.forgetPasswordOtp, {
      email
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function forgetPasswordResendOtpApi(
  email: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.fogetPasswordResendOtp, {
      email
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function forgetPasswordVerifyOtpApi(
  email: string,
  otp: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.forgetPasswordVerifyOtp, {
      email,
      otp
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function forgetPasswordResetApi(
  email: string,
  otp: string,
  newpassword: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.forgetPasswordReset, {
      email,
      otp,
      newpassword
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function logOutApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.logOut);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function customerListApi(
  search_data: string,
  country: string,
  state_name: string,
  authentication: Boolean|string,
  license_usage: string|Number,
  subscription_date: object,
  renewal_date: object,
  domain: string,
  sortdata:object
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.customerList, {
      search_data,
      country,
      state_name,
      authentication,
      license_usage,
      subscription_date,
      renewal_date,
      domain,
      sortdata
    });
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addCustomerApi(
  first_name: string,
  last_name: string,
  address: string,
  state: string,
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
      state,
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
  state: string,
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
      state,
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

async function declineCustomerSubscriptionApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.declineCustomerSubscription, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateCustomerPasswordApi(
  record_id: string,
  password: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateCustomerPassword, {record_id, password});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getCountryListAPi(): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getCountryList, {});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getRegionListAPi(): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getRegionList, {});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function sendEmailToCustomerApi(
  email_ids: [],
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.sendEmailToCustomer, {email_ids, record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function voucherListApi(
  currency: string,
  voucher_code: string,
  start_date: string,
  end_date: string,
  sortdata:object
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.voucherList, {currency, voucher_code, start_date, end_date, sortdata});
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

async function sendVoucherEmailApi(
  record_id: string,
  customer_id: string,
  customer_type: number
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.sendVoucherEmail, {record_id, customer_id, customer_type});
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
  end_date: strinsortdatag, 
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

async function getCustomerGroupListApi(
  group_name: string,
  create_date: string,
  sortdata:object
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.customerGroupList, {group_name, create_date, sortdata});
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

async function getCustomerCountApi(
  country: string,
  state_name: string,
  plan: string,
  start_date: string,
  end_date: string,
  license_usage: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getCustomerCount, {country, state_name, plan, start_date, end_date, license_usage});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getCustomerDomainsListApi(
  search_text:string,
  customer_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getCustomerDomainsList, {search_text, customer_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getCustomerEmailsCountApi(
  customer_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getCustomerEmailsCount, {customer_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function logInAsCustomerApi(
  email:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.logInAsCustomer, {email});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addNotificationTemplateApi(
  template_heading: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addNotificationTemplate, {template_heading});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getNotificationTemplateApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getNotificationTemplate);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateNoficationTemplateContentApi(
  record_id: string,
  template_content: string,
  is_notification: Boolean
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateNoficationTemplateContent, {record_id, template_content, is_notification});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteNotificationTemplateApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteNotificationTemplate, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function sendTestEmailNotificationApi(
  email_ids: [],
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.sendTestEmailNotification, {email_ids, record_id});
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

async function getPaymentMethodsListApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.paymentMethodsList);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updatePaymentMethodStatusApi(
  record_id: string,
  status: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updatePaymentMethodStatus, {record_id, status});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getBannerListApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.bannerList);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addBannerApi(
  title: string,
  description: string,
  video_url: string,
  button_title: string,
  button_url: string,
  background_image: File,
  show_video_status: boolean,
  show_promotion_status: boolean, 
  currency_details: [],
  promotion_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addBanner, {title, description, video_url, button_title, button_url, background_image, show_video_status, show_promotion_status, currency_details, promotion_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function editBannerApi(
  record_id: string,
  title: string,
  description: string,
  video_url: string,
  button_title: string,
  button_url: string,
  background_image: File,
  show_video_status: boolean,
  show_promotion_status: boolean, 
  currency_details: [],
  active: boolean,
  promotion_id:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.editBanner, {record_id, title, description, video_url, button_title, button_url, background_image, show_video_status, show_promotion_status, currency_details, active, promotion_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteBannerApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteBanner, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getPromotionsListApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.promotionsList);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addPromotionApi(
  code: string,
  start_date: Date,
  end_date: Date,
  html_template: string,
  discount:[]
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addPromotion, {code, start_date, end_date, html_template, discount});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function editPromotionApi(
  record_id: string,
  code: string,
  start_date: Date,
  end_date: Date,
  html_template: string,
  status: Boolean,
  discount: [],
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.editPromotion, {record_id, code, start_date, end_date, html_template, status, discount});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deletePromotionApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deletePromotion, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getAboutUsApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getAboutUs);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function udpateAboutUsApi(
  heading_section: string,
  block1: string,
  block2: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateAboutUs, {heading_section, block1, block2});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getResourcesApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getResources);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function udpateResourcesApi(
  connect: string,
  create: string,
  Access: string,
  contact: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateResources, {connect, create, Access, contact});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getContactUsApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getContactUs);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function udpateContactUsApi(
  content_description: string,
  phone_no: string,
  email: string,
  address: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateContactUs, {content_description, phone_no, email, address});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getFooterApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getFooter);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateFooterApi(
  marketing_section_data: string,
  website_section_data: string,
  contact_us_section_data: string,
  newsletter_section_data: string,
  social_section_data: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateFooter, {marketing_section_data, website_section_data, contact_us_section_data, newsletter_section_data, social_section_data});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getMenuApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getMenu);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function udpateMenuApi(
  menu1: string,
  menu2: string,
  menu3: string,
  menu4: string,
  menu5: string,
  menu6: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateMenu, {menu1, menu2, menu3, menu4, menu5, menu6});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getSeoDataApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getSeoData);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function udpateSeoDataApi(
  title: string,
  desc: [],
  alt_image: string,
  image_path: string,
  keywords: [],
  urllink: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateSeoData, {title, desc, alt_image, image_path, keywords, urllink});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function uploadImageApi(
  image: any
): Promise<any> {
  try {
    const result = await uploadImageApiCall(endPoints.uploadImage, image);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getFaqsApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getFaqs);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addFaqsApi(
  question: string,
  answer: string,
  order: number
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addFaq, {question, answer, order});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateFaqsApi(
  question: string,
  answer: string,
  order: number,
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateFaq, {question, answer, order, record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteFaqsApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteFaq, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getPlansAndPricesApi(
  last_order:Number|string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getPlansAndPrices, {last_order});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addPlanAndPriceApi(
  icon_image: string,
  services: string,
  top_features: [],
  trial_period: Number,
  plan_name: string,
  sticker_text: string,
  amount_details: [],
  sticker_exists: Boolean
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addPlanAndPrice, {icon_image, services, top_features, trial_period, plan_name, sticker_text, amount_details, sticker_exists});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function editPlanAndPriceApi(
  icon_image: string,
  services: string,
  top_features: [],
  trial_period: Number,
  plan_name: string,
  sticker_text: string,
  amount_details: [],
  sticker_exists: Boolean,
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.editPlanAndPrice, {icon_image, services, top_features, trial_period, plan_name, sticker_text, amount_details, sticker_exists, record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deletePlanAndPriceApi(
  record_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deletePlanAndPrice, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getBillingHistoryApi(
  start_date: string,
  end_date: string,
  domain: string,
  search_data: string,
  sortdata:object
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getBillingHistory, {start_date, end_date, domain, search_data, sortdata});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getCustomerSubscriptionDataApi(
  subscription_id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getCustomerSubscriptionData, {subscription_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getEmailLogsApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getEmailLogs);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getRolesApi(
  user_type:string,
  sortdata:object
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getRoles, {user_type, sortdata});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addRoleApi(
  role_name: string,
  description: string,
  permission: any
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addRole, {role_name, description, permission});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function editRoleApi(
  role_name: string,
  description: string,
  permission: any,
  id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.editRole, {role_name, description, permission, id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteRoleApi(
  id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteRole, {id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getUsersApi(
  role: string,
  searchdata: string,
  sortdata:object
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getUsers, {role, searchdata, sortdata});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function addUsersApi(
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  role: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.addUser, {first_name, last_name, email, phone, role});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateUsersApi(
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  role: string,
  id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateUser, {first_name, last_name, email, phone, role, id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function deleteUsersApi(
  id: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.deleteUser, {id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getAgreementApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getAgreement);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateAgreementApi(
  content: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateAgreement, {content});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getPrivacyPolicyApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getPrivacyPolicy);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updatePrivacyPolicyApi(
  content: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updatePrivacyPolicy, {content});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getTermsAndConditionsApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.getTermsAndConditions);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateTermsAndConditionsApi(
  content: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateTermsAndConditions, {content});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getAdminDetailsApi(
  userid: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getAdminDetails, {userid});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateAdminDetailsApi(
  userid: string,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  password: string,
  profile_pic: string,
  street_name: string,
  city: string,
  state_name: string,
  country: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateAdminDetails, {userid, first_name, last_name, email, phone, password, profile_pic, street_name, city, state_name, country});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getDefaultCurrencyApi(
  userid: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getDefaultCurrency, {userid});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateDefaultCurrencyApi(
  userid: string,
  defaultCurrency: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateDefaultCurrency, {userid, defaultCurrency});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getNotificationsApi(
  user_role: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getNotifications, {user_role});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function readNotificationsApi(
  record_id: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.readNotifications, {record_id});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getNotificationStatusApi(
  userid: string,
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getNotificationStatus, {userid});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function updateNotificationStatusApi(
  userid: string,
  status: Boolean
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.updateNotificationStatus, {userid, status});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function monthlyRevenueDataApi(currency:strinf): Promise<any> {
  try {
    const result = await postApiCall(endPoints.monthlyRevenueData, {currency});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function yearlySpendingStatisticsApi(): Promise<any> {
  try {
    const result = await postApiCall(endPoints.yearlySpendingStatistics, {});
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function hereMapSearchApi(address:object): Promise<any> {
  try {
    const result = await postApiCall(endPoints.hereMapSearch, address);
    return result;
  } catch (error: any) {
    throw error;
  }
};

async function getBase64ImageApi(
  url: string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.getBase64Image, {url});
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const userApis = {
  makeUserLoginApi,
  verifyUserOtpApi,
  resendOtpApi,
  forgetPasswordOtpApi,
  forgetPasswordResendOtpApi,
  forgetPasswordVerifyOtpApi,
  forgetPasswordResetApi,
  logOutApi,
  customerListApi,
  addCustomerApi,
  editCustomerApi,
  deleteCustomerApi,
  suspendCustomerApi,
  cancelCustomerSubscriptionApi,
  declineCustomerSubscriptionApi,
  updateCustomerPasswordApi,
  getCountryListAPi,
  getRegionListAPi,
  sendEmailToCustomerApi,
  voucherListApi,
  addVoucherApi,
  editVoucherApi,
  deleteVoucherApi,
  sendVoucherEmailApi,
  addCustomerGroupApi,
  editCustomerGroupApi,
  getCustomerGroupListApi,
  deleteCustomerGroupApi,
  getCustomerCountApi,
  getCustomerDomainsListApi,
  getCustomerEmailsCountApi,
  logInAsCustomerApi,
  addNotificationTemplateApi,
  getNotificationTemplateApi,
  updateNoficationTemplateContentApi,
  deleteNotificationTemplateApi,
  sendTestEmailNotificationApi,
  subscriptionPlansListApi,
  getPaymentMethodsListApi,
  updatePaymentMethodStatusApi,
  getBannerListApi,
  addBannerApi,
  editBannerApi,
  deleteBannerApi,
  getPromotionsListApi,
  addPromotionApi,
  editPromotionApi,
  deletePromotionApi,
  getAboutUsApi,
  udpateAboutUsApi,
  getResourcesApi,
  udpateResourcesApi,
  getContactUsApi,
  udpateContactUsApi,
  getFooterApi,
  updateFooterApi,
  getMenuApi,
  udpateMenuApi,
  getSeoDataApi,
  udpateSeoDataApi,
  uploadImageApi,
  getFaqsApi,
  addFaqsApi,
  updateFaqsApi,
  deleteFaqsApi,
  getPlansAndPricesApi,
  addPlanAndPriceApi,
  editPlanAndPriceApi,
  deletePlanAndPriceApi,
  getBillingHistoryApi,
  getCustomerSubscriptionDataApi,
  getEmailLogsApi,
  getRolesApi,
  addRoleApi,
  editRoleApi,
  deleteRoleApi,
  getUsersApi,
  addUsersApi,
  updateUsersApi,
  deleteUsersApi,
  getAgreementApi,
  updateAgreementApi,
  getPrivacyPolicyApi,
  updatePrivacyPolicyApi,
  getTermsAndConditionsApi,
  updateTermsAndConditionsApi,
  getAdminDetailsApi,
  updateAdminDetailsApi,
  getDefaultCurrencyApi,
  updateDefaultCurrencyApi,
  getNotificationsApi,
  readNotificationsApi,
  getNotificationStatusApi,
  updateNotificationStatusApi,
  monthlyRevenueDataApi,
  yearlySpendingStatisticsApi,
  hereMapSearchApi,
  getBase64ImageApi,
};
