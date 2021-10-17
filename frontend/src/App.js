import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import UserControlPanel from "./pages/UserControlPanel";

function App() {
	return (
		<div className="app">
			<Container>
				<UserControlPanel />
			</Container>
		</div>
	);
}

export default App;
