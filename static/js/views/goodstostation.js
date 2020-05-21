'use strict'

const SpaceStationModel = new SpaceStation();
const GoodsModel = new Goods();
const GoodstoStationModel = new GoodstoStation();

function initAddForm () {
    const form = window.document.querySelector('#goodstostation-add-form')

    let selectTagsData = {
        spacestation: {
            model: SpaceStationModel,
            innerText: (item) => item.name
        },
        goods: {
            model: GoodsModel,
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
        const GoodstoStationData = {}
        formData.forEach((value, key) => {
            GoodstoStationData[key] = value
        })
        
        
        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            GoodstoStationModel.Update(GoodstoStationData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            GoodstoStationModel.Create(GoodstoStationData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#goodstostation-list').DataTable({
        data: GoodstoStationModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'SpaceStation', data: 'spacestation' },
            { title: 'Goods', data: 'goods' },
            { title: 'Action', data: '' }
        ],
        columnDefs: [
            {
                "render": function (data, type, row) {
                    let spacestation = SpaceStationModel.Select();
                    let newSpaceStation = spacestation.filter(spacestation => spacestation.id == data)
                    return newSpaceStation[0].name;
                },
                "targets": 1
            },
            {
                "render": function (data, type, row) {
                    let goods = GoodsModel.Select();
                    let newGoods = goods.filter(goods => goods.id == data)
                    return newGoods[0].name
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
                "targets": 3
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('GoodstoStationListDataChanged', function (e) {
        const dataTable = window.jQuery('#goodstostation-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    GoodstoStationModel.Delete(id);
}

function updateItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    let obj = GoodstoStationModel.FindById(parseInt(id));
    document.getElementById('spacestation').value = obj.spacestation;
    document.getElementById('goods').value = obj.goods;
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
