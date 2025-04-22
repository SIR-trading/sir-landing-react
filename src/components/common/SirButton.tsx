// components/common/SirButton.tsx
import React from "react";
import { cn } from "~/lib/utils";

type SirButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

const SirButton: React.FC<SirButtonProps> = ({ label, onClick, className }) => {
  return (
    <div className="relative order-0 h-[40px] w-[164px] flex-none grow-0">
      <div className="blur-gradient absolute top-0 -left-0.5 h-[40px] w-[164px] blur-[12px]"></div>
      <button
        className={cn("text-black leading-9 text-[16px] font-inter font-semibold absolute w-[164px] h-[40px] -left-0.5 top-0 shadow-md rounded-md flex flex-row justify-center items-center p-2 gap-2 button-blur-gradient", className)}
        onClick={() => onClick && onClick()}
      >
        {label}
      </button>
    </div>
  );
};

export default SirButton;