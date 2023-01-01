import axios from 'axios';

const CLIENT_ID = 'f0014edb612054c056ff';
const CLIENT_SECRET = '0e4f21edfbea7aa57cc7dd2877c405b93168212c';

type AccessTokenData = {
  access_token: string;
  token_type: string;
  scope: string;
} | null;

export const getAccessToken = async (
  code: string,
): Promise<AccessTokenData> => {
  try {
    const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;

    const { data } = await axios.post(
      `https://github.com/login/oauth/access_token${params}`,
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    console.log(data);

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
    console.log({ data });
    return data;
  } catch (error) {
    return null;
  }
};
