// import React from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"

import ReactDOM from "react-dom/client"

import { NextUIProvider } from "@nextui-org/react"
import { darkTheme } from "./themes/darktheme"

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

import App from "./App"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<NextUIProvider theme={darkTheme}>
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<App />
		</GoogleOAuthProvider>
	</NextUIProvider>
	// </React.StrictMode>
)
