import loadDatabase from "../persistence/load-database.js";

export default async userId => {
	if (isUserIdValid(userId)) {
		await deleteUser(userId);
	} else {
		throw new Error("Invalid userId was supplied");
	}
};

const isUserIdValid = userId => {
	return userId
		&& typeof userId === "string"
		&& userId.length === 10;
};

const deleteUser = async userId => {
	const db = await loadDatabase();

	if (doesUserExist(db, userId)) {
		await deleteUserFromDatabase(db, userId);
	} else {
		throw new Error(`No user with ID ${userId} exists`);
	}
};

const doesUserExist = (db, userId) => {
	const user = db.data.users.find(x => x.userId === userId);

	return !!user;
};

const deleteUserFromDatabase = async (db, userId) => {
	db.data.users = db.data.users.filter(x => x.userId !== userId);
	await db.write();
};
