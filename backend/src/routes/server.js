import express from "express";
import cors from "cors";
import createUser from "../use-cases/create-user.js";
import deleteUser from "../use-cases/delete-user.js";
import getAllUsers from "../use-cases/get-all-users.js";

const app = express();
app.use(express.json());
app.listen(8080, () => console.log("Server started..."));
app.use(cors({
	origin: "*" // Allow everything for demo purposes
}));

/**
 * Gets all users from the database
 * @param {string} sortBy - (Optional) sorting by email or name
 * @param {string} page - (Optional) paging parameter
 * @param {string} usersPerPage - (Optional) defaults to 10
 */
app.get("/user", async (req, res) => {
	try {
		const users = await getAllUsers(req.query.sortBy);

		return res.json({
			success: true,
			users
		});
	} catch (e) {
		return errorMessage(res, e);
	}
});

/**
 * Inserts a user into the database. The body of the request
 * must contain the necessary properties to create a user as
 * JSON
 */
app.post("/user", async (req, res) => {
	try {
		await createUser(req.body);

		return res.json({
			success: true,
			message: "User created"
		});
	} catch (e) {
		return errorMessage(res, e);
	}
});

/**
 * Deletes a user from the database
 * @param {string} userId - ID of user to be deleted
 */
app.delete("/user", async (req, res) => {
	try {
		await deleteUser(req.query.userId);

		return res.json({
			success: true,
			message: "User deleted"
		});
	} catch (e) {
		return errorMessage(res, e);
	}
});

const errorMessage = (res, err) => {
	return res.status(400).send({
		success: false,
		message: err.message
	});
};
