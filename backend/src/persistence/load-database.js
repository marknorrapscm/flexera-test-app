/* eslint-disable no-param-reassign */
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

/**
 * Creates a simple LowDB database that ends up written to
 * the ./src/persistence folder as a JSON file.
 */
export default async () => {
	const db = await readDatabase();

	return initialiseDatabase(db);
};

const readDatabase = async () => {
	const directoryName = dirname(fileURLToPath(import.meta.url));
	const path = join(directoryName, "db.json");
	const file = new JSONFile(path);
	const db = new Low(file);
	await db.read();

	return db;
};

const initialiseDatabase = async db => {
	if (!db.data) {
		db.data = {
			users: []
		};
		await db.write();
	}

	return db;
};
