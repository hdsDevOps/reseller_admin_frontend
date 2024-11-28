export interface User {
  permissions: string[];
  userType: string;
}


const RoleData: User[] = [
  {
    permissions: [
      'Dashboard',
      'Domain',
      'Email',
      'Vouchers',
    ],
    userType: 'Admin',
  },
  {
    permissions: [
      'Billing History',
      'Payment Subscription',
      'Payment Method',
      'My Staff',
    ],
    userType: 'Sub-admin',
  },
];

export default RoleData;
