import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import UserDisplayTable from "../components/UserDisplayTable";
import generateRandomUser from "../lib/generate-random-user";

export default function UserControlPanel() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		loadAllUsers();
	}, []);

	const loadAllUsers = async () => {
		const req = await fetch("http://localhost:8080/user");
		const res = await req.json();
		setUsers(res.users);
	};

	const createRandomUser = async () => {
		const randomUser = generateRandomUser();
		const req = await fetch("http://localhost:8080/user", {
			method: "post",
			body: JSON.stringify(randomUser),
			mode: "cors",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			}
		});
		const res = await req.json();
		if(res.success) {
			await loadAllUsers();
		}
	};

	const onDeleteUserClicked = async userId => {
		const req = await fetch(`http://localhost:8080/user?userId=${userId}`, {
			method: "delete",
		});
		const res = await req.json();
		if(res.success) {
			await loadAllUsers();
		}
	};

	return (
		<Card>
			<Card.Header>
				<h5 className="mt-2">Flexera Test App</h5>
			</Card.Header>
			<Card.Body>
				<UserDisplayTable 
					users={users} 
					onDeleteUserClicked={onDeleteUserClicked}
				/>
			</Card.Body>
			<Card.Footer>
				<Button 
					variant="success" 
					onClick={() => createRandomUser()}
				>
                    Create Random User
				</Button>
			</Card.Footer>
		</Card>
	);
}
