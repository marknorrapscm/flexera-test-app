import loadDatabase from "../persistence/load-database.js";
import getRandomId from "../utility/get-random-id.js";

export default async userData => {
	if (isUserDataValid(userData)) {
		await addUserToDatabase(userData);
	} else {
		throw new Error("Invalid user data was supplied");
	}
};

const isUserDataValid = userData => {
	return userData
		&& userData.name
		&& typeof userData.name === "string"
		&& userData.age
		&& typeof userData.age === "number"
		// don't check truthiness of balance in case it's zero
		&& typeof userData.balance === "number"
		&& userData.email
		&& typeof userData.email === "string"
		&& userData.address
		&& typeof userData.address === "string";
};

const addUserToDatabase = async user => {
	const db = await loadDatabase();
	const sanitizedUser = stripInvalidPropertiesFromUserObject(user);

	db.data.users.push(sanitizedUser);
	await db.write();
};

const stripInvalidPropertiesFromUserObject = user => {
	return {
		userId: getRandomId(),
		name: user.name,
		age: user.age,
		balance: user.balance,
		email: user.email,
		address: user.address
	};
};
