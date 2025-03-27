import React, { useState } from "react";

const AddItemForm = ({ users, onItemAdded }) => {
    const [itemName, setItemName] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!itemName || !selectedUser) {
            alert("Please enter item name and select a user.");
            return;
        }

        const newItem = { name: itemName, created_by: selectedUser };

        const response = await fetch("http://localhost:3000/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Item added successfully!");
            setItemName("");
            onItemAdded();  // Refresh items after adding
        } else {
            alert("Failed to add item: " + data.message);
        }
    };

    return (
        <div>
            <h2>Add a New Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                />
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                </select>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItemForm;
