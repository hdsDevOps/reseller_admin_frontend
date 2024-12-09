import React from "react";
import { useAppSelector } from "store/hooks";
export default function Footer() {
  const token = useAppSelector((state) => state.auth.token);
  return (
    <footer
      className=""
    >
      <div className="text-center">
        © 2024 Copyright:{token}
        <a className="text-dark" href="#">
          hordanso
        </a>
      </div>
    </footer>
  );
}
