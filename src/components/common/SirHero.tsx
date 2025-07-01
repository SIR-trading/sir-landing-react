// components/common/SirHero.tsx
import React from "react";
import Image from "next/image";

type SirHeroProps = {
  image?: string;
  children: React.ReactNode;
};

const SirHero: React.FC<SirHeroProps> = ({ image, children }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-0 py-10">
        <h1 className="title w-full text-center text-[40px]">{children}</h1>
        {image && (
          <div className="w-full rounded-xl p-4 dark:bg-transparent">
            <Image
              src={`/${image}.svg`}
              alt="Hero Image"
              width={1024}
              height={338}
              priority
              className="hidden h-auto w-full dark:block"
            />{" "}
            <Image
              src={`/${image}-light.svg`}
              alt="Hero Image"
              width={1024}
              height={338}
              priority
              className="h-auto w-full dark:hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SirHero;
