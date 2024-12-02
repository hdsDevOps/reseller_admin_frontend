export const endPoints = {
    login: 'adminservices/admin/api/v1/login',
    verifyOtp: 'adminservices/admin/api/v1/otpverify',
    resendOtp: 'adminservices/admin/api/v1/resendotp',
    forgetPasswordOtp: 'adminservices/forgotpassword/api/v1/generateotp',
    fogetPasswordResendOtp: 'adminservices/forgotpassword/api/v1/resendotp',
    forgetPasswordVerifyOtp: 'adminservices/forgotpassword/api/v1/verifyotp',
    forgetPasswordReset: 'adminservices/forgotpassword/api/v1/resetpassword',
    logOut: 'adminservices/admin/api/v1/logout',
    
    // customer endpoints
    customerList: 'adminservices/customer/api/v1/customerlist',
    addCustomer: 'adminservices/customer/api/v1/addcustomer',
    editCustomer: 'adminservices/customer/api/v1/editcustomer',
    deleteCustomer: 'adminservices/customer/api/v1/deletecustomer',
    suspendCustomer: 'adminservices/customer/api/v1/suspendcustomer',
    cancelCustomerSubscription: 'adminservices/customer/api/v1/cancelsubscriptioncustomer',
    declineCustomerSubscription: 'adminservices/customer/api/v1/activecustomer',
    updateCustomerPassword: 'adminservices/customer/api/v1/resetcustomerpassword',
    getCountryList: 'adminservices/customer/api/v1/getcountry_list',

    // voucher notification endpoints
    voucherList: 'voucherservices/voucher/api/v1/voucherlist',
    addVoucher: 'voucherservices/voucher/api/v1/addnewvoucher',
    editVoucher: 'voucherservices/voucher/api/v1/editvoucher',
    deleteVoucher: 'voucherservices/voucher/api/v1/deletevoucher',
    addCustomerGroup: 'adminservices/voucher/api/v1/addcustomergroup',
    editCustomerGroup: 'adminservices/voucher/api/v1/editcustomergroup',
    customerGroupList: 'adminservices/voucher/api/v1/customergrouplist',
    deleteCustomerGroup: 'adminservices/voucher/api/v1/deletecustomergroup',
    sendVoucherEmail: 'voucherservices/voucher/api/v1/sendvochermail',

    // notification templates
    addNotificationTemplate: 'adminservices/notification/api/v1/addnotificationtemplatedetails',
    getNotificationTemplate: 'adminservices/notification/api/v1/getnotificationlist',
    updateNoficationTemplateContent: 'adminservices/notification/api/v1/updatenotificationtemplate',

    // subscription
    subscriptionPlansList: 'adminservices/subscription/api/v1/getplansdetailslist',

    // paymenthistory
    paymentMethodsList: 'adminservices/subscription/api/v1/getpaymentmethods',

    //cms
        // banners
        bannerList: 'adminservices/admin/api/v1/cmsgetbannerdata',
        addBanner: 'adminservices/admin/api/v1/cmsaddbannerdata',
        editBanner: 'adminservices/admin/api/v1/cmseditbannerdata',
        deleteBanner: 'adminservices/admin/api/v1/cmsdeletebannerdata',

        // promotions
        promotionsList: 'adminservices/admin/api/v1/cmsgetpromotiondata',
        addPromotion: 'adminservices/admin/api/v1/cmsaddpromotion',
        editPromotion: 'adminservices/admin/api/v1/cmsupdatepromotion',
        deletePromotion: 'adminservices/admin/api/v1/cmsdeletepromotion',

        // about us
        getAboutUs: 'adminservices/admin/api/v1/cmsgetaboutus',
        updateAboutUs: 'adminservices/admin/api/v1/cmsupdateaboutus',
}