import React from "react";
import { Table, Button } from "react-bootstrap";
import "./UserDisplayTable.css";

export default function UserDisplayTable({ users, onDeleteUserClicked }) {
	return (
		<Table className="user-display-table">
			<thead>
				<tr>
					<th>UserID</th>
					<th>Name</th>
					<th>Age</th>
					<th>Balance</th>
					<th>Email</th>
					<th>Address</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{users.length === 0 ? (
					<tr>
						<td colSpan="6" className="text-center">No users to display</td>
					</tr>
				) : (
					users.map(user => {
						return (
							<tr key={user.userId}>
								<td>{user.userId}</td>
								<td>{user.name}</td>
								<td>{user.age}</td>
								<td>{user.balance}</td>
								<td>{user.email}</td>
								<td>{user.address}</td>
								<td>
									<Button 
										variant="danger" 
										size="sm" 
										onClick={() => onDeleteUserClicked(user.userId)}
									>
                                        Delete
									</Button>
								</td>
							</tr>
						);
					})
				)}
			</tbody>
		</Table>
	);
}
