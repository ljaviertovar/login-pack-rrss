import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Navbar,
  Row,
  Text,
  User,
} from '@nextui-org/react';

import { getAccessToken, getUserData } from './services/home-services';

import { LogOutIcon } from '../../assets/icons';

interface UserDataGithub {
  avatar_url: string;
  login: string;
  bio: string;
}

const Home = () => {
  const [userDataGithub, setUserDataGithub] = useState<null | UserDataGithub>(
    null,
  );

  const loginWith = useRef(localStorage.getItem('loginWith'));

  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    const accessToken = localStorage.getItem('accessToken');

    if (codeParam && !accessToken) {
      getAccessToken(codeParam).then((resp) => {
        console.log(resp);
        localStorage.setItem('accessToken', resp.access_token);
        getUserData(resp.access_token).then((resp: UserDataGithub) => {
          setUserDataGithub(resp);
        });
      });
    } else if (codeParam && accessToken) {
      getUserData(accessToken).then((resp: UserDataGithub) => {
        localStorage.setItem('accessToken', accessToken);
        setUserDataGithub(resp);
      });
    }
  }, []);

  const setLogOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  console.log({ userDataGithub });

  if (!userDataGithub) return null;

  return (
    <>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <User
            bordered
            color="primary"
            size="lg"
            src={userDataGithub.avatar_url}
            name={userDataGithub.login}
            description={userDataGithub.bio}
          />
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item>
            <Button
              auto
              flat
              size="sm"
              icon={<LogOutIcon fill="currentColor" />}
              color="primary"
              onClick={() => setLogOut()}
            >
              Log out
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Container gap={0}>
        <Row gap={1}>
          <Col>
            <Text h2>Login with {loginWith.current}</Text>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
