export const endPoints = {
    login: 'adminservices/admin/api/v1/login',
    verifyOtp: 'adminservices/admin/api/v1/otpverify',
    resendOtp: 'adminservices/admin/api/v1/resendotp',
    
    // customer endpoints
    customerList: 'adminservices/customer/api/v1/customerlist',
    addCustomer: 'adminservices/customer/api/v1/addcustomer',
    editCustomer: 'adminservices/customer/api/v1/editcustomer',
    deleteCustomer: 'adminservices/customer/api/v1/deletecustomer',
    suspendCustomer: 'adminservices/customer/api/v1/suspendcustomer',
    cancelCustomerSubscription: 'adminservices/customer/api/v1/cancelsubscriptioncustomer',

    // voucher notification endpoints
    voucherList: 'voucherservices/voucher/api/v1/voucherlist',
    addVoucher: 'voucherservices/voucher/api/v1/addnewvoucher',
    editVoucher: 'voucherservices/voucher/api/v1/editvoucher',
    deleteVoucher: 'voucherservices/voucher/api/v1/deletevoucher',
    addCustomerGroup: 'adminservices/voucher/api/v1/addcustomergroup',
    editCustomerGroup: 'adminservices/voucher/api/v1/editcustomergroup',
    customerGroupList: 'adminservices/voucher/api/v1/customergrouplist',
    deleteCustomerGroup: 'adminservices/voucher/api/v1/deletecustomergroup',

    // subscription
    subscriptionPlansList: 'adminservices/subscription/api/v1/getplansdetailslist',
}