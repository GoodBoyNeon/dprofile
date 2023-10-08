import { getDate, getProfile, getUserAvatar, getUserBanner } from "@/util";
import React, { FC } from "react";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { Badge } from ".";
import { badges } from "./Badge";

type Props = {
  userId: string;
};

const Profile: FC<Props> = async ({ userId }) => {
  const profileData = await getProfile(userId);

  const badgeBits = Object.keys(badges);

  // const badges = {
  //   1: "Staff",
  //   2: "Partner",
  //   4: "Hypesquad",
  //   8: "BugHunter1",
  //   // Bit 16 and 32 are custom, not provided by discord
  //   16: "",
  //   32: ,
  //   64: "Hypesquad1",
  //   128: "Hypesquad2",
  //   256: "Hypesquad3",
  //   512: "EarlySupporter",
  //   1024: "Team",
  //   16384: "BugHunter2",
  //   65536: "VerifiedBot",
  //   121072: "VerifiedDev",
  //   262144: "Moderator",
  //   524288: "BotInteractions",
  //   4194304: "ActiveDev",
  // };
  const available: string[] = [];
  const flags = parseInt(profileData.public_flags?.toString() ?? "");

  const avatar = await getUserAvatar(profileData);
  const [accentColor, banner] = await getUserBanner(profileData);

  for (let key of badgeBits) {
    if ((flags & parseInt(key)) === parseInt(key)) {
      available.push(key);
    }
  }
  console.log(available);

  const timestamp = Number(BigInt(userId) >> 22n) + 1420070400000;
  const joinedAt = getDate(timestamp);

  return (
    <div className="bg-default-outer rounded-lg flex flex-col relative">
      <div className="bottom-[50] relative w-[25rem] h-full right-0 aspect-[1920/480]">
        {banner && (
          <Image
            src={banner}
            alt="Avatar"
            fill={true}
            className="rounded-t-md"
          />
        )}
        {accentColor && (
          <span
            className={`absolute w-full h-full rounded-t-md`}
            style={{ backgroundColor: accentColor }}
          ></span>
        )}
      </div>
      {available[0] !== "0" && (
        <div className="bg-default-inner flex flex-wrap ml-auto p-2 rounded-md mx-5 mt-3 gap-2">
          {available.map((bit, i) => {
            return <Badge key={i} badgeBit={parseInt(bit)} />;
          })}
        </div>
      )}
      <div className="rounded-full top-8 ml-5 aspect-square border-[8px] border-default-outer w-36 absolute">
        <Image src={avatar} alt="Avatar" fill={true} className="rounded-full" />
      </div>
      <div className="bg-default-inner m-5 rounded-md p-3 mt-20">
        <h2 className="font-bold text-2xl">{profileData.global_name}</h2>
        <p className="text-sm">{profileData.username}</p>
        {/* Status Here */}
        <hr className="border-1 border-default-segment my-2 mx-3" />
        <h2 className="uppercase font-extrabold text-xs tracking-wide pb-1">
          Member Since
        </h2>
        <p className="text-sm">
          <span className="flex gap-2  flex-row">
            <FaDiscord size={19} />
            {joinedAt.toString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
