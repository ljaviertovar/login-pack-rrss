// import React from "react"
import ReactDOM from "react-dom/client"

import { NextUIProvider } from "@nextui-org/react"
import { darkTheme } from "./themes/darktheme"

import App from "./App"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<NextUIProvider theme={darkTheme}>
		<App />
	</NextUIProvider>
	// </React.StrictMode>
)
