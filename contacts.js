import fs from "fs/promises";
import { nanoid } from "nanoid";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = join(`${__dirname}`, "./db/contacts.json");

export const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath);
		return JSON.parse(contacts);
	} catch (error) {
		console.warn(error);
	}
};

export const getContactById = async (contactId) => {
	try {
		const contacts = await listContacts();
		const contact = contacts.find((el) => el.id === contactId);
		return contact;
	} catch (error) {
		console.warn(error);
	}
};

export const removeContact = async (contactId) => {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex((el) => el.id === contactId);
		const [removeItem] = contacts.splice(index, 1);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return removeItem;
	} catch (error) {
		console.warn(error);
	}
};

export const addContact = async (data) => {
	try {
		const contacts = await listContacts();
		const newContact = { id: nanoid(), ...data };
		contacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return newContact;
	} catch (error) {
		console.warn(error);
	}
};
