document.addEventListener('DOMContentLoaded', () => {
    const prefixElement = document.getElementById('prefix-container');
    const prefix = prefixElement.getAttribute('data-prefix') || 'defaultPrefix';

    const listBlobsApiUrl = '/api/listBlobs';
    let blobUrl = '';
    let originalData = [];
    let editedData = [];
    let currentItemIndex = null;
    let updateLog = [];  // Initialize the log
    let latestObby = null;

    const draggableList = document.getElementById('draggable-list');
    const editForm = document.getElementById('edit-form');
    const moveUpButton = document.getElementById('move-up-btn');
    const moveDownButton = document.getElementById('move-down-btn');

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

                // Highlight the selected item
                document.querySelectorAll('.draggable').forEach(el => el.classList.remove('selected'));
                li.classList.add('selected');
            });
        });
    }

    function logChange(action, item, index) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            action,
            item: { ...item },
            index,
        };
        
        updateLog.unshift(logEntry); // Log new entries at the beginning
    }

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

    function moveItem(oldIndex, newIndex) {
        if (newIndex >= 0 && newIndex < editedData.length) {
            const item = editedData.splice(oldIndex, 1)[0];
            editedData.splice(newIndex, 0, item);
            loadList(editedData);
            addDragEvents();
            currentItemIndex = newIndex;

            editForm.title.value = item.title;
            editForm.verifier.value = item.verifier;
            editForm.link.value = item.link;
            editForm.gamelink.value = item.gamelink;
        }
    }

    moveUpButton.addEventListener('click', () => {
        if (currentItemIndex !== null && currentItemIndex > 0) {
            moveItem(currentItemIndex, currentItemIndex - 1);
        }
    });

    moveDownButton.addEventListener('click', () => {
        if (currentItemIndex !== null && currentItemIndex < editedData.length - 1) {
            moveItem(currentItemIndex, currentItemIndex + 1);
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
        loadList(editedData);
        addDragEvents();

        // Update currentItemIndex to reflect the new position after drag
        if (currentItemIndex !== null) {
            const draggedItem = editedData.findIndex((item, i) => i === currentItemIndex);
            if (draggedItem !== -1) {
                currentItemIndex = draggedItem;
            }
        }
    }

    document.getElementById('del-btn').addEventListener('click', () => {
        if (currentItemIndex !== null) {
            const deletedItem = editedData[currentItemIndex]; // Capture the item to be deleted
            editedData.splice(currentItemIndex, 1); // Remove the selected item from editedData

            // Log the deletion
            logChange('deleted', deletedItem, currentItemIndex + 1); // Log index + 1 for display

            // Reload the list with updated data
            loadList(editedData);
            addDragEvents();

            // Reset the form and clear selection
            editForm.reset();
            currentItemIndex = null;

            alert('Item deleted successfully!');
        } else {
            alert('No item selected to delete.');
        }
    });

    document.getElementById('save-btn').addEventListener('click', () => {
        // Function to reformat YouTube links
        function formatYouTubeLink(link) {
            let videoId = '';
            let extraParams = '';

            if (link.includes('youtu.be')) {
                videoId = link.split('/').pop().split('?')[0];
                extraParams = link.split('?')[1] || '';
            } else if (link.includes('youtube.com/watch')) {
                const urlParams = new URLSearchParams(link.split('?')[1]);
                videoId = urlParams.get('v');
                extraParams = link.split('&').slice(1).join('&');
            }

            if (videoId) {
                let formattedLink = `https://www.youtube.com/watch?v=${videoId}`;
                if (extraParams) {
                    formattedLink += `&${extraParams}`;
                }
                return formattedLink;
            }

            return link;
        }

        // Format all YouTube links in editedData
        editedData.forEach(item => {
            if (item.link) {
                item.link = formatYouTubeLink(item.link);
            }
        });

        // Save main updatedData
        const updatedData = JSON.stringify(editedData, null, 2);
        fetch('/api/saveJson', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prefix, updatedData }),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Update successful:', result);
            alert('Update successful!');
            originalData = JSON.parse(JSON.stringify(editedData));

            // Proceed to save the update log
            const list = prefix.replace('data', '').toUpperCase() + ' List';
            const placement = editedData.findIndex(item => item === latestObby) + 1;

            const newUpdate = {
                thumbnail: `https://img.youtube.com/vi/${new URL(latestObby.link).searchParams.get('v')}/hqdefault.jpg`,
                title: `${latestObby.title} on #${placement}.`,
                caption: `${latestObby.title} has been placed #${placement} in ${list}.`
            };

            // Fetch current update log
            return fetch('/api/listBlobs')
                .then(response => response.json())
                .then(data => {
                    const files = data.blobs || [];
                    const updateFile = files.find(file => file.pathname.includes('update'));
                    if (updateFile) {
                        return fetch(updateFile.url);
                    } else {
                        throw new Error('No update file found.');
                    }
                })
                .then(response => response.json())
                .then(updateLogData => {
                    updateLogData.push(newUpdate);
                    return fetch('/api/saveUpdate', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ updateLogData }),
                    });
                });
        })
        .catch(error => {
            console.error('Error saving data:', error);
            alert('Error saving data.');
        });
    });

    // Add functionality for add button
    document.getElementById('add-btn').addEventListener('click', () => {
        const newItem = {
            title: 'New Item',
            verifier: '',
            link: '',
            gamelink: ''
        };

        editedData.unshift(newItem); // Add to the top of the list
        loadList(editedData);        // Reload list
        addDragEvents();             // Reinitialize drag events

        logChange('added', newItem, 1); // Log the addition
    });
});
