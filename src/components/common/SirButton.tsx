"use client";
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
        className={cn(
          "font-inter button-blur-gradient absolute top-0 -left-0.5 flex h-[40px] w-[164px] flex-row items-center justify-center gap-2 rounded-md p-2 text-[16px] leading-9 font-semibold text-black shadow-md",
          className,
        )}
        onClick={() => onClick && onClick()}
      >
        {label}
      </button>
    </div>
  );
};

export default SirButton;
