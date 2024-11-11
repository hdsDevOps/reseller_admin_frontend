export interface User {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  userType: string;
}


const UserListData: User[] = [

  {
      fname: 'Robert',
      lname: 'Clive',
      email: 'robertClive@domain.co.in',
      phone: '(123) 465 - 7890',
      userType: 'Admin',
    },
  {
      fname: 'Robert',
      lname: 'Blive',
      email: 'robertClive@domain.co.in',
      phone: '(123) 674 - 7890',
      userType: 'Sub-admin',
    },
  {
      fname: 'Robert',
      lname: 'Slive',
      email: 'robertClive@domain.co.in',
      phone: '(123) 465 - 7890',
      userType: 'Account',
    },
  {
      fname: 'Robert',
      lname: 'Qlive',
      email: 'robertClive@domain.co.in',
      phone: '(123) 465 - 7890',
      userType: 'Admin',
    },
    // Add more user data here as needed
  ];

  export default UserListData;