import { Card, Spacer, Button, Text, Container } from "@nextui-org/react"
import { IconGitHub, IconLinkedIn } from "../assets/icons"

const CLIENT_ID = "f0014edb612054c056ff"

const Login = () => {
	const loginToGithub = () => {
		window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`)
	}

	return (
		<Container display='flex' alignItems='center' justify='center' css={{ minHeight: "100vh" }}>
			<Card css={{ mw: "420px", p: "20px" }}>
				<Text
					size={24}
					weight='bold'
					css={{
						as: "center",
						mb: "20px",
					}}
				>
					Login with
				</Text>
				<Spacer y={1} />
				<Button color='gradient' auto ghost onClick={() => loginToGithub()}>
					<IconGitHub />
					<Spacer x={0.5} />
					GitHub
				</Button>
				<Spacer y={1} />
				<Button color='gradient' auto ghost>
					<IconLinkedIn />
					<Spacer x={0.5} />
					LinkedIn
				</Button>
			</Card>
		</Container>
	)
}

export default Login
