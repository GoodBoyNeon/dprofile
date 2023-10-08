import axios from "axios";
import { APIUser } from "discord-api-types/v10";
import { buffer } from "stream/consumers";

const baseAPIUrl = "https://discord.com/api/v10";
const baseCDNUrl = "https://cdn.discordapp.com";
const headers = {
  Authorization: `Bot ${process.env.BOT_TOKEN}`,
};

export const getProfile = async (userId: string) => {
  const profileData = await axios.get<APIUser>(
    `${baseAPIUrl}/users/${userId}`,
    {
      headers,
    },
  );

  return profileData.data;
};

export const getUserAvatar = async ({ id, avatar }: APIUser) => {
  const random = Math.floor(Math.random() * 5);

  const avatarData =
    avatar !== null
      ? await axios.get(`${baseCDNUrl}/avatars/${id}/${avatar}.png`, {
          responseType: "arraybuffer",
          headers,
        })
      : await axios.get(`${baseCDNUrl}/embed/avatars/${random}.png`, {
          responseType: "arraybuffer",
          headers,
        });
  const base64EncodedImage = Buffer.from(avatarData.data, "binary").toString(
    "base64",
  );
  return `data:image/png;base64,${base64EncodedImage}`;
};

export const getUserBanner = async ({ id, banner, accent_color }: APIUser) => {
  if (accent_color) return [`#${accent_color.toString().slice(0, 6)}`, null];
  const bannerData = await axios.get(
    `${baseCDNUrl}/banners/${id}/${banner}.png`,
    {
      responseType: "arraybuffer",
      headers,
    },
  );
  const base64EncodedImage = Buffer.from(bannerData.data, "binary").toString(
    "base64",
  );
  return [null, `data:image/png;base64,${base64EncodedImage}`];
};
