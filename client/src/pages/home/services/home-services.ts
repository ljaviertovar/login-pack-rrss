import axios from 'axios';

export const getAccessToken = async (code: string): Promise<any> => {
  const { data } = await axios.get(
    `http://localhost:3001/api/github/accessToken?code=${code}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
};

export const getUserData = async (accessToken: string) => {
  const { data } = await axios.get(
    `http://localhost:3001/api/github/userData?accessToken=${accessToken}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return data;
};
