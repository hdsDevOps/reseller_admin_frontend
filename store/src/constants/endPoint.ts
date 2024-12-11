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
    getRegionList: 'adminservices/customer/api/v1/getregion_list',
    sendEmailToCustomer: 'adminservices/notification/api/v1/sendmailtocustomer',

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
    sendTestEmailNotification: 'adminservices/notification/api/v1/sendtestemailnotification',

    // subscription
    subscriptionPlansList: 'adminservices/subscription/api/v1/getplansdetailslist',

    // paymenthistory
    paymentMethodsList: 'adminservices/subscription/api/v1/getpaymentmethods',
    updatePaymentMethodStatus: 'adminservices/subscription/api/v1/updatepaymentmethodstatus',

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

        // resources
        getResources: 'adminservices/admin/api/v1/cmsgetresourcedata',
        updateResources: 'adminservices/admin/api/v1/cmsupdateresourcedata',

        // contact us
        getContactUs: 'adminservices/admin/api/v1/cmsgetcontactus',
        updateContactUs: 'adminservices/admin/api/v1/cmsupdatecontactus',

        // footer
        getFooter: 'adminservices/admin/api/v1/cmsgetfooter',
        updateFooter: 'adminservices/admin/api/v1/cmsupdatefooterdata',

        // menu
        getMenu: 'adminservices/admin/api/v1/cmsgetheader',
        updateMenu: 'adminservices/admin/api/v1/cmsupdateheader',

        // seo
        getSeoData: 'adminservices/admin/api/v1/cmsgetseodata',
        updateSeoData: 'adminservices/admin/api/v1/cmsupdateseodata',

    // image upload
    uploadImage: 'adminservices/admin/api/v1/uploadimage',

    // faqs
    getFaqs: 'adminservices/admin/api/v1/faqlist',
    addFaq: 'adminservices/admin/api/v1/addfaq',
    updateFaq: 'adminservices/admin/api/v1/editfaq',
    deleteFaq: 'adminservices/admin/api/v1/deletefaq',

    // plan & price
    getPlansAndPrices: 'adminservices/subscription/api/v1/getplansdetailslist',
    addPlanAndPrice: 'adminservices/subscription/api/v1/addnewplandetails',
    editPlanAndPrice: 'adminservices/subscription/api/v1/editnewplandetails',
    deletePlanAndPrice: 'adminservices/subscription/api/v1/deleteplandetails',

    // billing history
    getBillingHistory: 'subscriptionservices/billing/api/v1/billinghistory',

    //email log
    getEmailLogs: 'adminservices/notification/api/v1/emaillog',

    //role management
        //role
        getRoles: 'adminservices/users/api/v1/listrole',
        addRole: 'adminservices/users/api/v1/addrole',
        editRole: 'adminservices/users/api/v1/editrole',
        deleteRole: 'adminservices/users/api/v1/deleterole',

        //users
        getUsers: 'adminservices/users/api/v1/listusers',
        addUser: 'adminservices/users/api/v1/addusers',
        updateUser: 'adminservices/users/api/v1/editusers',
        deleteUser: 'adminservices/users/api/v1/deleteusers',

    // settings
    getAgreement: 'adminservices/admin/api/v1/customer_agreement',
    updateAgreement: 'adminservices/admin/api/v1/updateagreement',
    getPrivacyPolicy: 'adminservices/admin/api/v1/privacy_policy',
    updatePrivacyPolicy: 'adminservices/admin/api/v1/updatepolicy',
    getTermsAndConditions: '/adminservices/admin/api/v1/getterms',
    updateTermsAndConditions: 'adminservices/admin/api/v1/updateterms',
    
    //profile
    getAdminDetails: 'adminservices/admin/api/v1/getdetails',

    getDefaultCurrency: 'adminservices/admin/api/v1/getcurrency_default',
    updateDefaultCurrency: 'adminservices/admin/api/v1/update_defaultgetcurrency',
}