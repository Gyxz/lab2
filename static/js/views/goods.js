'use strict'

const goodsModel = new Goods() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#goods-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const goodsData = {}
        formData.forEach((value, key) => {
            goodsData[key] = value
        })

        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            goodsModel.Update(goodsData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            goodsModel.Create(goodsData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#goods-list').DataTable({
        data: goodsModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Code', data: 'code' },
            { title: 'Name', data: 'name' },
            { title: 'Mass', data: 'mass'},
            { title: 'Action', data: '' }
        ],
        columnDefs: [
            {
                "render": function(data, type, row) {
                    return ''
                        + '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>'
                        + "\n"
                        + '<button type="button" value="update" onclick="updateItem(this)">Update</button>';
                },
                "targets": 4
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('goodsListDataChanged', function (e) {
        const dataTable = window.jQuery('#goods-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    goodsModel.Delete(id);
}

function updateItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    let obj = goodsModel.FindById(parseInt(id));
    document.getElementById('code').value = obj.code;
    document.getElementById('name').value = obj.name;
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
