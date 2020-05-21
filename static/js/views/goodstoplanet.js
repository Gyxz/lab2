'use strict'

const PlanetModel = new Planet();
const GoodsModel = new Goods();
const GoodstoPlanetModel = new GoodstoPlanet();

function initAddForm () {
    const form = window.document.querySelector('#goodstoplanet-add-form')

    let selectTagsData = {
        planet: {
            model: PlanetModel,
            innerText: (item) => item.name
        },
        goods: {
            model: GoodsModel,
            innerText: (item) => item.name
        }
    };

    for (var key in selectTagsData) {
        let selectTag = document.getElementById(key);
        let PlanetCollection = selectTagsData[key].model.Select();
        PlanetCollection.forEach(item => {
            let option = document.createElement('option');
            option.value = item.id;
            option.innerText = selectTagsData[key].innerText(item);
            selectTag.appendChild(option);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const GoodstoPlanetData = {}
        formData.forEach((value, key) => {
            GoodstoPlanetData[key] = value
        })
        
        
        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            GoodstoPlanetModel.Update(GoodstoPlanetData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            GoodstoPlanetModel.Create(GoodstoPlanetData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#goodstoplanet-list').DataTable({
        data: GoodstoPlanetModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Planet', data: 'planet' },
            { title: 'Goods', data: 'goods' },
            { title: 'Action', data: '' }
        ],
        columnDefs: [
            {
                "render": function (data, type, row) {
                    let planet = PlanetModel.Select();
                    let newPlanet = planet.filter(planet => planet.id == data)
                    return newPlanet[0].name;
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
    document.addEventListener('GoodstoPlanetListDataChanged', function (e) {
        const dataTable = window.jQuery('#goodstoplanet-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    GoodstoPlanetModel.Delete(id);
}

function updateItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    let obj = GoodstoPlanetModel.FindById(parseInt(id));
    document.getElementById('planet').value = obj.planet;
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
