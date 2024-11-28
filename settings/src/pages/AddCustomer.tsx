import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const AddCustomer: React.FC = () => {
  const { userAuthStatus = "" } = useAppSelector((state: any) => state.auth);

  return (
    <div>
      <main>
        <h2>Add Customer</h2>
        <p>
          This is your Customer where you can manage your account ={" "}
          {userAuthStatus}
        </p>
        <Link to="/customer">Customer</Link>
        <br />
        {/* <button onClick={onLogoutHandler}>Logout</button> */}
      </main>
    </div>
  );
};

export default AddCustomer;
