// components/common/Team.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

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
      core: true,
    },
    {
      name: "Realtarpcity",
      role: "Frontend dev",
      link: "https://x.com/tarpley_travis",
      avatar: "team-avatars/tarp.jpg",
      core: true,
    },
    {
      name: "Abstrucked",
      role: "Frontend dev",
      link: "https://x.com/abstrucked",
      avatar: "team-avatars/abstrucked.jpg",
      core: true,
    },
    {
      name: "MrLivingstream",
      role: "UX/UI designer",
      link: "https://x.com/MrLivingstream",
      avatar: "team-avatars/MrLivingstream.jpg",
      core: true,
    },
    {
      name: "Jaydhales",
      role: "Frontend dev",
      link: "https://x.com/jaydhales1",
      avatar: "team-avatars/jaydhales.jpg",
      core: true,
    },
    {
      name: "RedTiger",
      role: "Communications manager",
      link: "https://x.com/RedTigerAuditor",
      avatar: "team-avatars/redtiger.jpg",
      core: true,
    },
    {
      name: "Tokenbrice",
      role: "Advisor",
      link: "https://x.com/TokenBrice",
      avatar: "team-avatars/tokenbrice.jpg",
      core: true,
    },
  ];

  // const minorTeamMembers = [
  //   {name: "Crashnaut", role: "Community manager", link: "https://x.com/crashnaut", avatar: "team-avatars/crashnaut.jpg"},
  //   {name: "0xjohn", role: "Frontend dev", link: "https://x.com/0xjooohn", avatar: "team-avatars/0xjohn.jpg"},
  //   {name: "Pau", role: "Ambassador", link: "https://x.com/PauChan23", avatar: "team-avatars/pau.jpg"},
  // ]

  const Avatar = ({
    size,
    src,
    alt,
  }: {
    size: string;
    src: string;
    alt: string;
  }) => {
    const sizeMap: Record<string, number> = {
      "3xl": 88,
    };

    const avatarSize = sizeMap[size] ?? 88;

    return (
      <Image
        src={`/${src}`}
        width={avatarSize}
        height={avatarSize}
        alt={alt}
        className="bg-card shadow-card rounded-full shadow-md"
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-0">
      <div className="flex max-w-[800px] flex-row flex-wrap items-start justify-center gap-6 p-1">
        {coreTeamMembers.map((member) => (
          <Link
            key={member.name}
            className="flex flex-1 cursor-pointer flex-col flex-wrap items-center justify-center gap-1 p-1"
            href={member.link}
          >
            <Avatar size={"3xl"} src={member.avatar} alt={member.name} />
            <div className={`text-[24px] font-bold`}>{member.name}</div>
            <div className="opacity-75">{member.role}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Team;
