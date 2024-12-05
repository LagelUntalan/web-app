const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Get all items
const getAllItems = (callback) => {
    db.all("SELECT * FROM items", callback);
};

// Add a new item
const addItem = (item, callback) => {
    db.run("INSERT INTO items (name, description) VALUES (?, ?)", [item.name, item.description], callback);
};

// Update an existing item
const updateItem = (id, item, callback) => {
    db.run("UPDATE items SET name = ?, description = ? WHERE id = ?", [item.name, item.description, id], callback);
};

// Delete an item
const deleteItem = (id, callback) => {
    db.run("DELETE FROM items WHERE id = ?", [id], callback);
};

module.exports = {
    getAllItems,
    addItem,
    updateItem,
    deleteItem
};
