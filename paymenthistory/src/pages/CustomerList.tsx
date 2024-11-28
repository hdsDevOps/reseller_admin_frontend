import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const CustomerList: React.FC = () => {
  const { userAuthStatus = "" } = useAppSelector((state:any) => state.auth);

  return (
    <div>
      <main>
        <h2>Customer List</h2>
        <p>This is your Customer where you can manage your account. Status = {userAuthStatus}</p>
        <Link to="/customer/addcustomer">Add Customer</Link>
      </main>
    </div>
  );
};

export default CustomerList;
