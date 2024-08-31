document.addEventListener('DOMContentLoaded', () => {
    // Get the prefix from the data-prefix attribute
    const prefixElement = document.getElementById('prefix-container');
    const prefix = prefixElement.getAttribute('data-prefix') || 'defaultPrefix';  // Fallback to 'defaultPrefix' if none is provided

    const listBlobsApiUrl = '/api/listBlobs';
    let blobUrl = '';
    let originalData = [];
    let editedData = [];
    let currentItemIndex = null;

    const draggableList = document.getElementById('draggable-list');
    const editForm = document.getElementById('edit-form');

    fetch(listBlobsApiUrl)
        .then(response => response.json())
        .then(data => {
            const files = data.blobs || [];
            const matchedFile = files.find(file => file.pathname && file.pathname.startsWith(prefix));
            if (matchedFile) {
                blobUrl = matchedFile.url;
                return fetch(blobUrl);
            } else {
                throw new Error('No file found with the specified prefix.');
            }
        })
        .then(response => response.json())
        .then(data => {
            originalData = JSON.parse(JSON.stringify(data));
            editedData = JSON.parse(JSON.stringify(data));
            loadList(editedData);
            addDragEvents();
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Function to load the list
    function loadList(data) {
        draggableList.innerHTML = '';
        data.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'draggable';
            li.setAttribute('draggable', 'true');
            li.textContent = `#${index + 1} - ${item.title}`;
            li.dataset.index = index;
            draggableList.appendChild(li);

            li.addEventListener('click', () => {
                currentItemIndex = index;
                editForm.title.value = item.title;
                editForm.verifier.value = item.verifier;
                editForm.link.value = item.link;
                editForm.gamelink.value = item.gamelink;
            });
        });
    }

    // Update the JSON data when the form inputs are changed
    editForm.addEventListener('input', () => {
        if (currentItemIndex !== null) {
            editedData[currentItemIndex].title = editForm.title.value;
            editedData[currentItemIndex].verifier = editForm.verifier.value;
            editedData[currentItemIndex].link = editForm.link.value;
            editedData[currentItemIndex].gamelink = editForm.gamelink.value;

            const li = draggableList.querySelector(`.draggable[data-index='${currentItemIndex}']`);
            li.textContent = `#${currentItemIndex + 1} - ${editedData[currentItemIndex].title}`;
        }
    });

    // Drag and drop functionality
    let draggables = [];
    function addDragEvents() {
        draggables = document.querySelectorAll('.draggable');

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
                updateOrder();
            });
        });

        draggableList.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(draggableList, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                draggableList.appendChild(draggable);
            } else {
                draggableList.insertBefore(draggable, afterElement);
            }
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function updateOrder() {
        const reorderedData = [];
        const reorderedIndices = Array.from(draggableList.querySelectorAll('.draggable')).map(li => parseInt(li.dataset.index));

        reorderedIndices.forEach(index => {
            reorderedData.push(editedData[index]);
        });

        editedData = reorderedData;

        // Update the list numbering
        loadList(editedData);
        addDragEvents();
    }

    addDragEvents();

    // Save button functionality
    document.getElementById('save-btn').addEventListener('click', () => {
        const updatedData = JSON.stringify(editedData, null, 2);
        fetch('/api/saveJson', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blobUrl, prefix, updatedData }),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Update successful:', result);
            alert('Update successful!');
            originalData = JSON.parse(JSON.stringify(editedData)); // Update originalData to match the saved data
        })
        .catch(error => console.error('Error updating JSON:', error));
    });

    // Cancel button functionality
    document.getElementById('cancel-btn').addEventListener('click', () => {
        editedData = JSON.parse(JSON.stringify(originalData)); // Revert changes
        loadList(editedData);
        addDragEvents();
        editForm.reset();
        currentItemIndex = null;
        alert('Changes canceled!');
    });

    // Add Data button functionality
    document.getElementById('add-btn').addEventListener('click', () => {
        const newItem = {
            title: "New Item",
            verifier: "",
            link: "",
            gamelink: ""
        };

        editedData.unshift(newItem); // Add new item to the top
        loadList(editedData);
        addDragEvents();

        // Automatically select the new item for editing
        currentItemIndex = 0; // New item is at the top
        editForm.title.value = newItem.title;
        editForm.verifier.value = newItem.verifier;
        editForm.link.value = newItem.link;
        editForm.gamelink.value = newItem.gamelink;
    });
});
