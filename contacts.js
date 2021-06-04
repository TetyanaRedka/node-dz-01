const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    return contacts.find(({ id }) => id === Number(contactId));
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = JSON.stringify(
      contacts.filter(({ id }) => id !== Number(contactId))
    );

    fs.writeFile(contactsPath, newContacts);
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    const stringContacts = JSON.stringify(contacts);

    fs.writeFile(contactsPath, stringContacts);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
