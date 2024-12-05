let editItemId = null;

async function getItems() {
    const response = await fetch('http://localhost:5000/api/items');  // Corrected to use /api/items
    const items = await response.json();
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Clear current list
    items.forEach(item => {
        itemList.innerHTML += `
            <li>
                ${item.name} - ${item.description}
                <button onclick="showEditModal(${item.id}, '${item.name}', '${item.description}')">Edit</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </li>
        `;
    });
}

function showAddModal() {
    document.getElementById('modalTitle').textContent = 'Add Item';
    document.getElementById('itemName').value = '';
    document.getElementById('itemDescription').value = '';
    document.getElementById('saveButton').textContent = 'Add Item';
    editItemId = null;
    document.getElementById('modalOverlay').style.display = 'block';
}

function showEditModal(id, name, description) {
    document.getElementById('modalTitle').textContent = 'Edit Item';
    document.getElementById('itemName').value = name;
    document.getElementById('itemDescription').value = description;
    document.getElementById('saveButton').textContent = 'Save Changes';
    editItemId = id;
    document.getElementById('modalOverlay').style.display = 'block';
}

async function saveItem() {
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;

    if (editItemId) {
        // Update existing item
        await editItem(editItemId);
    } else {
        // Add new item
        await addItem();
    }

    closeModal();
    getItems();
}

async function addItem() {
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;

    const response = await fetch('http://localhost:5000/api/items', {  // Corrected to use /api/items
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    });

    if (response.ok) {
        alert('Item added!');
    }
}

async function editItem(id) {
    const name = document.getElementById('itemName').value;
    const description = document.getElementById('itemDescription').value;

    const response = await fetch(`http://localhost:5000/api/items/${id}`, {  // Corrected to use /api/items/{id}
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    });

    if (response.ok) {
        alert('Item updated!');
    }
}

async function deleteItem(id) {
    const response = await fetch(`http://localhost:5000/api/items/${id}`, {  // Corrected to use /api/items/{id}
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Item deleted!');
    }
    getItems(); // Refresh list
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

window.onload = getItems;  // Load items when the page is loaded
