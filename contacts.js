const { v4: uuidv4 } = require("uuid");

const fs = require("fs/promises");
//const fs = require("fs/promises").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    //You can either parse data using the second param for readFile method, such as: readFile(contactsPath, "utf-8")
    // or parse them by JSON.parse method: JSON.parse(data)

    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const getContactById = contacts.find(({ id }) => id === contactId);

    if (!getContactById) {
      return null;
    }
    return getContactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContactId = async (contactId) => {
  const contacts = await listContacts();

  const contactsIndex = contacts.findIndex(({ id }) => id === contactId);
  if (contactsIndex === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(contactsIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    if (contacts.includes(newContact.email)) {
      return null;
    } else {
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
    }

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { listContacts, getContactById, removeContactId, addContact };
