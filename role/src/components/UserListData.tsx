export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
}


const UserListData: User[] = [

  {
      first_name: 'Robert',
      last_name: 'Clive',
      email: 'robertClive@hordanso.com',
      phone: '+0 123 456 7890',
      role: 'Admin',
    },
  {
      first_name: 'Robert',
      last_name: 'Blive',
      email: 'robertClive@hordanso.com',
      phone: '+0 123 456 7890',
      role: 'Super Admin',
    },
  {
      first_name: 'Robert',
      last_name: 'Slive',
      email: 'robertClive@hordanso.com',
      phone: '+0 123 456 7890',
      role: 'Super Admin',
    },
  {
      first_name: 'Robert',
      last_name: 'Qlive',
      email: 'robertClive@hordanso.com',
      phone: '+0 123 456 7890',
      role: 'Admin',
    },
    // Add more user data here as needed
  ];

  export default UserListData;