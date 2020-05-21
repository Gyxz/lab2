'use strict'

const planetModel = new Planet();   // eslint-disable-line no-undef
const SpaceStationModel = new SpaceStation();


function initAddForm () {
    const form = window.document.querySelector('#planet-add-form')
    
    let selectTagsData = {
        spacestation: {
            model: SpaceStationModel,
            innerText: (item) => item.name
        }
    };

    for (var key in selectTagsData) {
        let selectTag = document.getElementById(key);
        let SpaceStationCollection = selectTagsData[key].model.Select();
        SpaceStationCollection.forEach(item => {
            let option = document.createElement('option');
            option.value = item.id;
            option.innerText = selectTagsData[key].innerText(item);
            selectTag.appendChild(option);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const planetData = {}
        formData.forEach((value, key) => {
            planetData[key] = value
        })

        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            planetModel.Update(planetData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            planetModel.Create(planetData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#planet-list').DataTable({
        data: planetModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'SpaceStation', data: 'spacestation' },
            { title: 'Capasity', data: 'capasity'},
            { title: 'Mass', data: 'mass'},
            { title: 'Action', data: '' }
        ],
        columnDefs: [
            {
                "render": function (data, type, row) {
                    let spacestation = SpaceStationModel.Select();
                    let newSpaceStation = spacestation.filter(spacestation => spacestation.id == data)
                    if (newSpaceStation[0]) {
                        return newSpaceStation[0].name;
                    }else{
                        return 'not found'
                    }
                   
                },
                "targets": 2
            },
            {
                "render": function(data, type, row) {
                    return ''
                        + '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>'
                        + "\n"
                        + '<button type="button" value="update" onclick="updateItem(this)">Update</button>';
                },
                "targets": 5
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('planetListDataChanged', function (e) {
        const dataTable = window.jQuery('#planet-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    planetModel.Delete(id);
}

function updateItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    let obj = planetModel.FindById(parseInt(id));
    document.getElementById('name').value = obj.name;
    document.getElementById('spacestation').value = obj.spacestation;
    document.getElementById('capasity').value = obj.capasity;
    document.getElementById('mass').value = obj.mass;
    let createButton = document.getElementById('btn-create');
    let updateButton = document.getElementById('btn-update');
    createButton.classList.add('btn-hidden');
    updateButton.classList.remove('btn-hidden');
    let hiddenInput = document.getElementById('update-item');
    hiddenInput.value = obj.id;
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
