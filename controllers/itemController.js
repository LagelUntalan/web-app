const ItemModel = require('../models/itemModel');

// Get all items
const getItems = (req, res) => {
    ItemModel.getAllItems((err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
};

// Create a new item
const createItem = (req, res) => {
    const { name, description } = req.body;
    ItemModel.addItem({ name, description }, (err) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Item added');
    });
};

// Update an existing item
const updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    ItemModel.updateItem(id, { name, description }, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Item updated');
    });
};

// Delete an item
const deleteItem = (req, res) => {
    const { id } = req.params;
    ItemModel.deleteItem(id, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Item deleted');
    });
};

module.exports = { getItems, createItem, updateItem, deleteItem };
