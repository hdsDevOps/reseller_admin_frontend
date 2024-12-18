import React from "react";
import { useAppSelector } from "store/hooks";
const About: React.FC = () => {
  const { userAuthStatus = "" } = useAppSelector((state) => state.auth);
  return (
    <div>
      <main>
        <h2>Welcome to the About = {userAuthStatus}</h2>
        <p>This is your About where you can manage your account.</p>
      </main>
    </div>
  );
};

export default About;
