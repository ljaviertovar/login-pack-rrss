import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

type AccessTokenData = {
  access_token: string;
  token_type: string;
  scope: string;
} | null;

export const getAccessToken = async (
  code: string,
): Promise<AccessTokenData> => {
  try {
    const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;

    const { data } = await axios.post(
      `https://github.com/login/oauth/access_token${params}`,
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserData = async (accessToken: string) => {
  try {
    const { data } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};
