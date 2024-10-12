document.addEventListener('DOMContentLoaded', () => {
    const prefixElement = document.getElementById('prefix-container');
    const prefix = prefixElement.getAttribute('data-prefix') || 'defaultPrefix';

    const listBlobsApiUrl = '/api/listBlobs';
    let blobUrl = '';
    let originalData = [];
    let editedData = [];
    let currentItemIndex = null;

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
    }

    document.getElementById('del-btn').addEventListener('click', () => {
        if (currentItemIndex !== null) {
            // Remove the selected item from editedData
            editedData.splice(currentItemIndex, 1);
    
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

    document.getElementById('add-btn').addEventListener('click', () => {
        const newItem = {
            title: "New Item",
            verifier: "",
            link: "",
            gamelink: ""
        };

        editedData.unshift(newItem); // Add to the top
        loadList(editedData);
        addDragEvents();

        currentItemIndex = 0;
        editForm.title.value = newItem.title;
        editForm.verifier.value = newItem.verifier;
        editForm.link.value = newItem.link;
        editForm.gamelink.value = newItem.gamelink;

        // Log the addition
        const list = prefix.replace('data', '').toUpperCase() + ' List';
        const newUpdate = {
            thumbnail: '', // Optionally set a default thumbnail
            title: `${newItem.title} has been added.`,
            caption: `${newItem.title} has been added to ${list}.`
        };

        // Fetch current update log and save new log entry
        fetch('/api/listBlobs')
            .then(response => response.json())
            .then(data => {
                const files = data.blobs || [];
                const matchedFile = files.find(file => file.pathname && file.pathname.startsWith('update'));
                return matchedFile ? fetch(matchedFile.url) : Promise.resolve([]);
            })
            .then(updateLog => {
                if (!Array.isArray(updateLog)) {
                    updateLog = []; // Ensure updateLog is an array
                }

                updateLog.unshift(newUpdate);

                // Save the update log to update.json
                const updatedLogData = JSON.stringify(updateLog, null, 2);
                return fetch('/api/saveJson', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prefix: 'update', updatedData: updatedLogData }),
                });
            })
            .then(response => response.json())
            .then(result => {
                console.log('Update log saved successfully:', result);
            })
            .catch(error => console.error('Error updating log:', error));
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

        // Save the edited data to the JSON file
        fetch(blobUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedData, null, 2),
        })
        .then(response => {
            if (response.ok) {
                alert('Data saved successfully!');
                // Track changes to find the latest updated item
                const previousData = JSON.parse(JSON.stringify(originalData));
                let latestObby = null;

                editedData.forEach((item, index) => {
                    // Check if the current item is different from the previous data
                    if (
                        previousData[index] && 
                        (item.title !== previousData[index].title ||
                        item.verifier !== previousData[index].verifier ||
                        item.link !== previousData[index].link ||
                        item.gamelink !== previousData[index].gamelink)
                    ) {
                        latestObby = item; // Mark it as the latest updated item
                    }
                });

                // Proceed to save the update log if there is a latestObby
                if (latestObby) {
                    const list = prefix.replace('data', '').toUpperCase() + ' List';
                    const placement = editedData.indexOf(latestObby) + 1; // Position of the latest updated item

                    const newUpdate = {
                        thumbnail: `https://img.youtube.com/vi/${new URL(latestObby.link).searchParams.get('v')}/hqdefault.jpg`,
                        title: `${latestObby.title} has been updated.`,
                        caption: `${latestObby.title} has been moved to #${placement} in ${list}.`
                    };

                    // Fetch current update log and save new log entry
                    fetch('/api/listBlobs')
                        .then(response => response.json())
                        .then(data => {
                            const files = data.blobs || [];
                            const matchedFile = files.find(file => file.pathname && file.pathname.startsWith('update'));
                            return matchedFile ? fetch(matchedFile.url) : Promise.resolve([]);
                        })
                        .then(updateLog => {
                            if (!Array.isArray(updateLog)) {
                                updateLog = []; // Ensure updateLog is an array
                            }

                            updateLog.unshift(newUpdate);

                            // Save the update log to update.json
                            const updatedLogData = JSON.stringify(updateLog, null, 2);
                            return fetch('/api/saveJson', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ prefix: 'update', updatedData: updatedLogData }),
                            });
                        })
                        .then(response => response.json())
                        .then(result => {
                            console.log('Update log saved successfully:', result);
                        })
                        .catch(error => console.error('Error updating log:', error));
                }
            } else {
                alert('Failed to save data.');
            }
        })
        .catch(error => console.error('Error saving data:', error));
    });
});
