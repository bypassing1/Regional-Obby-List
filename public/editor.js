document.addEventListener('DOMContentLoaded', () => {
    const prefixElement = document.getElementById('prefix-container');
    const prefix = prefixElement.getAttribute('data-prefix') || 'defaultPrefix';
    const updateBlobUrl = 'https://pi3etbntstmdvlu5.public.blob.vercel-storage.com/update-qxGx8pZ9qcHZsiXtgbV2XPP4bIxJax.json'; // Update blob URL for update log

    let blobUrl = '';
    let originalData = [];
    let editedData = [];
    let updatesData = [];
    let currentItemIndex = null;

    const draggableList = document.getElementById('draggable-list');
    const editForm = document.getElementById('edit-form');
    const moveUpButton = document.getElementById('move-up-btn');
    const moveDownButton = document.getElementById('move-down-btn');

    // Fetch the obby list and the update log
    fetch('/api/listBlobs')
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
            return fetch(updateBlobUrl);  // Fetch the update log JSON
        })
        .then(response => response.json())
        .then(data => {
            updatesData = data || [];
        })
        .catch(error => console.error('Error fetching JSON:', error));

    // Load the obby list into the UI
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

    // Save functionality to handle both data and updates
    document.getElementById('save-btn').addEventListener('click', () => {
        // Prepare the update log entry
        const list = prefix.replace('data', '').toUpperCase() + ' List';
        const latestObby = editedData[0]; // Assuming the first one is the latest
        const placement = 1; // Assuming the first position is #1
    
        const newUpdate = {
            thumbnail: `https://img.youtube.com/vi/${new URL(latestObby.link).searchParams.get('v')}/hqdefault.jpg`,
            title: `${latestObby.title} on #${placement}.`,
            caption: `${latestObby.title} has been placed #${placement} in ${list}.`
        };
    
        // Fetch and update the update log
        fetch('/api/listBlobs')
            .then(response => response.json())
            .then(data => {
                const files = data.blobs || [];
                const matchedFile = files.find(file => file.pathname && file.pathname.startsWith('update'));
                if (matchedFile) {
                    return fetch(matchedFile.url).then(response => response.json());
                } else {
                    return []; // Start with an empty update log if none exists
                }
            })
            .then(updateLog => {
                // Add the new update at the top of the log
                updateLog.unshift(newUpdate);
    
                // Save the updated update log
                return fetch('/api/saveJson', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prefix: 'update', updatedData: JSON.stringify(updateLog) })
                });
            })
            .then(response => response.json())
            .then(result => {
                console.log('Update log saved:', result);
            })
            .catch(error => console.error('Error updating log:', error));
    });
    

    // Cancel changes
    document.getElementById('cancel-btn').addEventListener('click', () => {
        editedData = JSON.parse(JSON.stringify(originalData));
        loadList(editedData);
        addDragEvents();
        editForm.reset();
        currentItemIndex = null;
        alert('Changes canceled!');
    });

    // Add new item functionality
    document.getElementById('add-btn').addEventListener('click', () => {
        const newItem = {
            title: "New Item",
            verifier: "",
            link: "",
            gamelink: ""
        };

        editedData.unshift(newItem);
        loadList(editedData);
        addDragEvents();

        currentItemIndex = 0;
        editForm.title.value = newItem.title;
        editForm.verifier.value = newItem.verifier;
        editForm.link.value = newItem.link;
        editForm.gamelink.value = newItem.gamelink;
    });
});
