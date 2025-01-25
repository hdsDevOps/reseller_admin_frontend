import { format } from "date-fns";
import React from "react";
import { useAppSelector } from "store/hooks";
export default function Footer() {
  const year = format(new Date(), "yyyy");
  return (
    <footer
      className="text-center bg-[#E3EFE5] border w-full font-inter font-normal text-[10px] text-[#848484] absolute left-0 right-0 bottom-0 z-[-1]"
    >
      <a>© {year} HORDANSO WORKSPACE. All rights reserved</a>
    </footer>
  );
}
