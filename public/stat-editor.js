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
    const beatenContainer = document.getElementById('beaten-container');
    const addBeatenBtn = document.getElementById('add-beaten-btn');

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
            li.textContent = `#${index + 1} - ${item.name}`;
            li.dataset.index = index;
            draggableList.appendChild(li);

            li.addEventListener('click', () => {
                currentItemIndex = index;
                editForm.name.value = item.name;
                editForm.region.value = item.region;
                loadBeatenInputs(item.beaten);
            });
        });
    }

    function loadBeatenInputs(beatenList) {
        beatenContainer.innerHTML = '';
        beatenList.forEach((beaten, index) => {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `beaten-${index}`;
            input.value = beaten;
            beatenContainer.appendChild(input);
        });
    }

    addBeatenBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `beaten-${beatenContainer.children.length}`;
        beatenContainer.appendChild(input);
    });

    document.getElementById('add-btn').addEventListener('click', () => {
        const newItem = {
            name: "New Player",
            region: "",
            beaten: []
        };

        editedData.unshift(newItem);
        loadList(editedData);
        addDragEvents();

        currentItemIndex = 0;
        editForm.name.value = newItem.name;
        editForm.region.value = newItem.region;
        loadBeatenInputs(newItem.beaten);
    });

    document.getElementById('save-btn').addEventListener('click', () => {
        if (currentItemIndex !== null) {
            const updatedBeaten = Array.from(beatenContainer.children).map(input => input.value);
            editedData[currentItemIndex].name = editForm.name.value;
            editedData[currentItemIndex].region = editForm.region.value;
            editedData[currentItemIndex].beaten = updatedBeaten;
        }

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
            originalData = JSON.parse(JSON.stringify(editedData));
        })
        .catch(error => console.error('Error updating JSON:', error));
    });
});
