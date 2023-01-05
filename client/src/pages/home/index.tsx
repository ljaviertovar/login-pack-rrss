import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, Container, Navbar, Row, Text, User } from "@nextui-org/react"

import { getAccessTokenGithub, getUserDataGithub, getUserDataGoogle } from "./services/home-services"

import { LogOutIcon } from "../../assets/icons"

interface UserDataGithub {
	avatar_url: string
	login: string
	bio: string
}

interface UserdataGoogle {
	name: string
	picture: string
	email: string
}

const Home = () => {
	const [userDataGithub, setUserDataGithub] = useState<null | UserDataGithub>(null)
	const [userDataGoogle, setUserDataGoogle] = useState<null | UserdataGoogle>(null)

	const loginWith = useRef(localStorage.getItem("loginWith"))

	const navigate = useNavigate()

	useEffect(() => {
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		const codeParam = urlParams.get("code")

		const accessToken = localStorage.getItem("accessToken")

		if (codeParam && !accessToken && loginWith.current === "GitHub") {
			getAccessTokenGithub(codeParam).then(resp => {
				localStorage.setItem("accessToken", resp.access_token)
				getUserDataGithub(resp.access_token).then((resp: UserDataGithub) => {
					setUserDataGithub(resp)
				})
			})
		} else if (codeParam && accessToken && loginWith.current === "GitHub") {
			getUserDataGithub(accessToken).then((resp: UserDataGithub) => {
				localStorage.setItem("accessToken", accessToken)
				setUserDataGithub(resp)
			})
		}
	}, [loginWith])

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken")

		if (accessToken && loginWith.current === "Google") {
			getUserDataGoogle(accessToken).then(resp => {
				setUserDataGoogle(resp)
			})
		}
	}, [loginWith])

	const setLogOut = () => {
		localStorage.removeItem("accessToken")
		localStorage.removeItem("loginWith")
		navigate("/")
	}

	if (!userDataGithub && !userDataGoogle) return null

	return (
		<>
			<Navbar isBordered variant='sticky'>
				<Navbar.Brand>
					<User
						bordered
						color='primary'
						size='lg'
						src={loginWith.current === "GitHub" ? userDataGithub?.avatar_url : userDataGoogle?.picture}
						name={loginWith.current === "GitHub" ? userDataGithub?.login : userDataGoogle?.name}
						description={loginWith.current === "GitHub" ? userDataGithub?.bio : userDataGoogle?.email}
					/>
				</Navbar.Brand>
				<Navbar.Content>
					<Navbar.Item>
						<Button
							auto
							flat
							size='sm'
							icon={<LogOutIcon fill='currentColor' />}
							color='primary'
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
	)
}

export default Home
