// app/static/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    const layerOptionsList = document.getElementById('layer-options');
    const layerTableBody = document.querySelector('#layer-table tbody');
    const addLayerBtn = document.getElementById('add-layer-btn');
    const saveModelBtn = document.getElementById('save-model-btn');
    const compileBtn = document.getElementById('compile-btn');
    const trainBtn = document.getElementById('train-btn');
    const statusDiv = document.getElementById('status');

    // Populate the "Available Layers" list from preConfiguredLayers
    preConfiguredLayers.forEach(layer => {
        const li = document.createElement('li');
        li.textContent = layer.type;
        li.addEventListener('click', () => {
            addLayerToTable(layer);
        });
        layerOptionsList.appendChild(li);
    });

    // Function to add a new layer row to the table
    function addLayerToTable(layer = null) {
        const tr = document.createElement('tr');
        tr.classList.add('draggable');
        tr.draggable = true;

        // Add drag-and-drop event listeners
        tr.addEventListener('dragstart', dragStart);
        tr.addEventListener('dragover', dragOver);
        tr.addEventListener('drop', dragDrop);
        tr.addEventListener('dragend', dragEnd);

        // Order cell (will update later)
        const orderTd = document.createElement('td');
        orderTd.className = 'order';
        orderTd.textContent = layerTableBody.children.length + 1;
        tr.appendChild(orderTd);

        // Layer type cell with input field
        const typeTd = document.createElement('td');
        const typeInput = document.createElement('input');
        typeInput.type = 'text';
        typeInput.value = layer ? layer.type : '';
        typeTd.appendChild(typeInput);
        tr.appendChild(typeTd);

        // Parameters cell with textarea (JSON format)
        const paramsTd = document.createElement('td');
        const paramsInput = document.createElement('textarea');
        paramsInput.rows = 2;
        paramsInput.cols = 30;
        paramsInput.value = layer ? JSON.stringify(layer.params) : '{}';
        paramsTd.appendChild(paramsInput);
        tr.appendChild(paramsTd);

        // Actions cell with delete button
        const actionsTd = document.createElement('td');
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
            tr.remove();
            updateOrder();
        });
        actionsTd.appendChild(delBtn);
        tr.appendChild(actionsTd);

        layerTableBody.appendChild(tr);
        updateOrder();
    }

    // Populate the table with the default template on load
    defaultTemplate.forEach(layer => addLayerToTable(layer));

    // Add new empty layer on button click
    addLayerBtn.addEventListener('click', function() {
        addLayerToTable();
    });

    // Drag and Drop functionality
    let draggedRow = null;

    function dragStart(e) {
        draggedRow = this;
        e.dataTransfer.effectAllowed = 'move';
        this.style.opacity = '0.5';
    }

    function dragOver(e) {
        e.preventDefault();
        return false;
    }

    function dragDrop(e) {
        e.stopPropagation();
        if (draggedRow !== this) {
            const tbody = layerTableBody; // the parent tbody element
        
            // Get an array of the current rows
            const rows = Array.from(tbody.children);
            const draggedIndex = rows.indexOf(draggedRow);
            const targetIndex = rows.indexOf(this);
    
            // Insert draggedRow before or after target based on their positions
            if (draggedIndex < targetIndex) {
                tbody.insertBefore(draggedRow, this.nextSibling);
            } else {
                tbody.insertBefore(draggedRow, this);
            }
        }
        updateOrder();
        return false;
    }

    function dragEnd(e) {
        this.style.opacity = '1';
        updateOrder();
    }

    function addDragHandlers(row) {
        row.addEventListener('dragstart', dragStart);
        row.addEventListener('dragover', dragOver);
        row.addEventListener('drop', dragDrop);
        row.addEventListener('dragend', dragEnd);
    }

    function updateOrder() {
        const rows = layerTableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.querySelector('.order').textContent = index + 1;
        });
    }

    /* Model actions */

    function getLayerConfig() {
        // Gather layer configuration from the table
        const config = [];
        const rows = layerTableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const type = row.querySelector('td:nth-child(2) input').value;
            const paramsStr = row.querySelector('td:nth-child(3) textarea').value;
            let params;
            try {
                params = JSON.parse(paramsStr);
            } catch (e) {
                params = {};
            }
            config.push({ type: type, params: params });
        });
        return config;
    }

    function getCompileConfig() {
        const optimizer = document.getElementById('optimizer-select').value;
        const loss = document.getElementById('loss-select').value;
        const metrics = document.getElementById('metrics-select').value;
        return { optimizer, loss, metrics };
    }

    function getTrainConfig() {
        const epochs = document.getElementById('epochs-input').value;
        const batchSize = document.getElementById('batch-size-input').value;
        return { epochs, batchSize };
    }

    // Handle "Save Model" button click
    saveModelBtn.addEventListener('click', function() {
        const config = getLayerConfig();

        // Send the configuration to the backend for saving
        fetch('/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ layer_config: config })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                statusDiv.textContent = "Model saved successfully!";
                statusDiv.style.color = "green";
            } else {
                statusDiv.textContent = "Error: " + data.message;
                statusDiv.style.color = "red";
            }
        })
        .catch(error => {
            statusDiv.textContent = "Error: " + error;
            statusDiv.style.color = "red";
        });
    });

    // Handle "Train Model" button click
    trainBtn.addEventListener('click', function() {
        const compileConfig = getCompileConfig();
        const trainConfig = getTrainConfig();

        // Send the configuration to the backend for training
        fetch('/train', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ compile_config: compileConfig, train_config: trainConfig })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                statusDiv.textContent = "Training completed successfully!";
                statusDiv.style.color = "green";
            } else {
                statusDiv.textContent = "Error: " + data.message;
                statusDiv.style.color = "red";
            }
        })
        .catch(error => {
            statusDiv.textContent = "Error: " + error;
            statusDiv.style.color = "red";
        });
    });
});
