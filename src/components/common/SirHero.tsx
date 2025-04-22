// components/common/SirHero.tsx
import React from 'react';
import Image from 'next/image';

type SirHeroProps = {
  image?: string;
  children: React.ReactNode;
};

const SirHero: React.FC<SirHeroProps> = ({ image, children }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-0">
        {image && (
          <div className="p-0 w-full md:w-[760px]">
            <Image
              src={`/${image}`}
              alt="Hero Image"
              width={760}
              height={400}
              priority
              className="w-full h-auto"
            />
          </div>
        )}
        <h1 className="text-4xl title text-center mt-3">
          {children}
        </h1>
      </div>
    </div>
  );
};

export default SirHero;