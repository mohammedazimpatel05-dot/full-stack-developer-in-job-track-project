import { Item } from "../models/Item.js";

// Create Item
export const createItem = async (req, res) => {
    try {
        const { itemName, quantity, description, category } = req.body;
        const itemImage = req.file ? req.file.filename : null;

        //if(!itemImage) {
          //return res.status(400).json({ message: "Item image is required "});
      

        const newItem = new Item({
            itemName,
            itemImage,
            quantity,
            description,
            category,
        });

        await newItem.save();

        res.status(201).json({
            message: "Item created successfully",
            item: newItem
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating item",
            error: error.message
        });
    }
};


// Get All Items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();

        res.status(200).json({
            items
        });

    } catch (error) {
        res.status(500).json({
            message: "Error getting items",
            error: error.message
        });
    }
};


// Get Item By ID
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(200).json({
            item
        });

    } catch (error) {
        res.status(500).json({
            message: "Error getting item",
            error: error.message
        });
    }
};


// Update Item
export const updateItem = async (req, res) => {
    try {
        const { itemName, quantity, description, category } = req.body;

        let updateData = {
            itemName,
            quantity,
            description,
            category
        };

        // Update image only if a new image is uploaded
        if (req.file) {
            updateData.itemImage = req.file.filename;
        }

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true
            }
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(200).json({
            message: "Item updated successfully",
            item
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating item",
            error: error.message
        });
    }
};


// Delete Item
export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(200).json({
            message: "Item deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting item",
            error: error.message
        });
    }
};

