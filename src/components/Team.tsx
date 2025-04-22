// components/common/Team.tsx
import React from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  link: string;
  avatar: string;
  core?: boolean;
}

const Team: React.FC = () => {
  const coreTeamMembers: TeamMember[] = [
    {
      name: "Xatarrer",
      role: "Founder  / Smart contract dev",
      link: "https://x.com/Xatarrer",
      avatar: "team-avatars/xatarrer.jpg",
      core: true
    },
    {
      name: "Realtarpcity",
      role: "Fronted dev",
      link: "https://x.com/tarpley_travis",
      avatar: "team-avatars/tarp.jpg",
      core: true
    },
    {
      name: "Abstrucked",
      role: "Fronted dev",
      link: "https://x.com/abstrucked",
      avatar: "team-avatars/abstrucked.jpg",
      core: true
    },
    {
      name: "MrLivingstream",
      role: "UX/UI designer",
      link: "https://x.com/MrLivingstream",
      avatar: "team-avatars/MrLivingstream.jpg",
      core: true
    },
  ];

  // const minorTeamMembers = [
  //   {name: "Crashnaut", role: "Community manager", link: "https://x.com/crashnaut", avatar: "team-avatars/crashnaut.jpg"},
  //   {name: "0xjohn", role: "Frontend dev", link: "https://x.com/0xjooohn", avatar: "team-avatars/0xjohn.jpg"},
  //   {name: "Pau", role: "Ambassador", link: "https://x.com/PauChan23", avatar: "team-avatars/pau.jpg"},
  // ]

  const thanksTo: TeamMember[] = [
    {
      name: "@no_side666",
      role: "Smart contract analyst",
      link: "https://x.com/no_side666",
      avatar: "team-avatars/no_side666.jpg"
    }
    // ,
    // {
    //   name: "@tokenfox",
    //   role: "Smart contract analyst",
    //   link: "https://x.com/tokenfox1",
    //   avatar: "team-avatars/tokenfox.jpg"
    // },
  ];

  const goto = (link: string) => {
    window.open(link, "_blank");
  };

  const Avatar = ({ size, src, alt }: { size: string, src: string, alt: string }) => {
    const sizeMap: Record<string, number> = {
      '3xl': 100,
      '4xl': 120
    };

    const avatarSize = sizeMap[size] || 100;

    return (
        <Image
            src={`/${src}`}
            width={avatarSize}
            height={avatarSize}
            alt={alt}
            className="rounded-full"
        />
    );
  };

  return (
      <div className="flex flex-col items-center justify-center gap-y-0">
        <div className="flex flex-row items-start justify-center gap-6 flex-wrap p-1">
          {coreTeamMembers.map((member) => (
              <div
                  key={member.name}
                  className="flex flex-col items-center justify-center p-1 gap-2 flex-wrap cursor-pointer w-[150px]"
                  onClick={() => goto(member.link)}
              >
                <Avatar size={member.core ? '4xl' : '3xl'} src={member.avatar} alt={member.name} />
                <div className={`font-bold ${member.core ? 'text-[24px]' : 'text-[18px]'}`}>{member.name}</div>
                <div>{member.role}</div>
              </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-end justify-center gap-1 flex-wrap p-6">
          <div className="flex flex-col items-baseline justify-center p-0 h-full">
            <h2 className="mb-3 sir-text-shadow text-center w-full section-header text-rob-roy-300">
              A special thanks to
            </h2>
            <div className="flex flex-row items-center justify-center gap-1 p-0 flex-wrap">
              {thanksTo.map((member) => (
                  <div
                      key={member.name}
                      className="flex flex-col items-center justify-center p-1 gap-2 flex-wrap cursor-pointer w-[150px]"
                      onClick={() => goto(member.link)}
                  >
                    <Avatar size="3xl" src={member.avatar} alt={member.name} />
                    <div className="font-semibold text-[18px]">{member.name}</div>
                    <div>{member.role}</div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Team;