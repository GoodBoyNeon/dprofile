import React, { FC } from "react";
import Image from "next/image";

type Props = {
  badgeBit: number;
};

export const badges = {
  1: "DiscordStaff.png",
  2: "Partner.svg",
  4: "Hypesquad.png",
  8: "BugHunter1.png",
  // Bit 16 and 32 are custom, not provided by discord
  16: "Nitro.png",
  32: "Username.png",
  64: "HypesquadBravery.png",
  128: "HypesquadBrilliance.png",
  256: "HypesquadBalance.png",
  512: "EarlySupporter.png",
  16384: "BugHunter2.png",
  // 65536: "VerifiedBot",
  121072: "VerifiedDeveloper.png",
  262144: "ModeratorProgramsAlumi.png",
  // 524288: "BotInteractions",
  4194304: "ActiveDeveloper.svg",
} as const;

const Badge: FC<Props> = ({ badgeBit }) => {
  return (
    <Image
      src={`/badges/${badges[badgeBit as keyof typeof badges]}`}
      alt="badge"
      width={20}
      height={20}
    ></Image>
  );
};

export default Badge;
