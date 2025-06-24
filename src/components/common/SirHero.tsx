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
      <div className="flex flex-col items-center justify-center p-0">
        {image && (
          <div className="w-full p-0">
            <Image
              src={`/${image}`}
              alt="Hero Image"
              width={1024}
              height={338}
              priority
              className="h-auto w-full"
            />
          </div>
        )}
        <h1 className="title mt-3 text-center text-[44px]">{children}</h1>
      </div>
    </div>
  );
};

export default SirHero;
