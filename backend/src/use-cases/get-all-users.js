import loadDatabase from "../persistence/load-database.js";

export default async propertyToSortBy => {
	const allUsers = await loadAllUsersFromDatabase();

	if (propertyToSortBy && isSortByPropertyValid(propertyToSortBy)) {
		return sortAlphabetically(allUsers, propertyToSortBy);
	} else {
		return allUsers;
	}
};

const loadAllUsersFromDatabase = async () => {
	const db = await loadDatabase();
	return db.data.users;
};

const isSortByPropertyValid = propertyToSortBy => {
	if (propertyToSortBy === "name" || propertyToSortBy === "email") {
		return true;
	} else {
		console.error(`Cannot sort by property: ${ propertyToSortBy}`);
		return false;
	}
};

const sortAlphabetically = (users, propertyToSortBy) => {
	return users.sort((a, b) => {
		const aLowercase = a[propertyToSortBy].toLowerCase();
		const bLowercase = b[propertyToSortBy].toLowerCase();

		return aLowercase < bLowercase ? -1 : 1;
	});
};
