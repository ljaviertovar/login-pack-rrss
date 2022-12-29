import { useEffect } from "react"

const Home = () => {
	useEffect(() => {
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		const codeParem = urlParams.get("code")
	}, [])

	return <div>Home</div>
}

export default Home
