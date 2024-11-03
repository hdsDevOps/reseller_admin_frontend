export interface User {
  name: string;
  email: string;
  phone: string;
  userType: string;
}


const UserListData: User[] = [

  {
      name: 'Robert Clive',
      email: 'robertClive@domain.co.in',
      phone: '(123) 465 - 7890',
      userType: 'Admin',
    },
  {
      name: 'Robert Clive',
      email: 'robertClive@domain.co.in',
      phone: '(123) 674 - 7890',
      userType: 'Sub-admin',
    },
  {
      name: 'Robert Clive',
      email: 'robertClive@domain.co.in',
      phone: '(123) 465 - 7890',
      userType: 'Account',
    },
  {
      name: 'Robert Clive',
      email: 'robertClive@domain.co.in',
      phone: '(123) 465 - 7890',
      userType: 'Admin',
    },
    // Add more user data here as needed
  ];

  export default UserListData;