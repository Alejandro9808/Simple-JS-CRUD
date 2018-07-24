class Person {
    constructor(id, nombre, apellidos, edad, color){
        this._id = id;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._edad = edad;
        this._color = color;
    }


    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get apellidos() {
        return this._apellidos;
    }

    get edad() {
        return this._edad;
    }

    get color() {
        return this._color;
    }
}

let persons = [];
let editando = false, creando = false;
let botonNuevo;
let botonGuardar;
let botonCancelar;
let botonEliminar;
let selectedRow;
let ids = 0;
$(document).ready(function () {
   botonNuevo = $('#nuevo')[0];
   botonGuardar = $('#guardar')[0];
   botonCancelar =  $('#cancelar')[0];
   botonEliminar =  $('#eliminar')[0];
    botonGuardar.onclick = function () {
        if(creando) addPerson();
        else if (editando) editPerson();

   };

    botonNuevo.onclick = function () {
        showFields();
        botonNuevo.style.visibility = "hidden";
        botonCancelar.style.visibility = "visible";
        botonGuardar.style.visibility = "visible";
        creando = true;
    };
   botonCancelar.onclick = function () {
        updateTable();
    };
    botonEliminar.onclick = function () {
        removePerson();
    }
});

function addPerson() {
    let nombre =    $('#nom')[0].value;
    let apellidos = $('#apellidos')[0].value;
    let edad =      $('#edad')[0].value;
    let color =     $('#color')[0].value;

    let tmp = new Person(ids++, nombre, apellidos, edad, color);
    persons.push(tmp);
    updateTable();
}

function updateTable() {
    let items = $('#table-items')[0];
    items.innerHTML = "";
    for (let i = 0; i < persons.length; i++) {
        let tmp = persons[i];
        let ministyle = "border: none; background-color: " + tmp.color;
        items.innerHTML += "<tr onclick='editRow(" + tmp.id + ")'>" +
            "<td>" + tmp.id + "</td>" +
            "<td>" + tmp.nombre + "</td>" +
            "<td>" + tmp.apellidos + "</td>" +
            "<td>" + tmp.edad + "</td>" +
            '<td style="' + ministyle + '">' + '</td>' +
            "</tr>";

    }

    $('#nom')[0].value = "";
    $('#apellidos')[0].value = "";
    $('#edad')[0].value = "";
    $('#color')[0].value = "#ffffff";
    hideFields();
    botonNuevo.style.visibility = "visible";
    botonCancelar.style.visibility = "hidden";
    botonGuardar.style.visibility = "hidden";
    botonEliminar.style.visibility = "hidden";
    creando = false;
    editando = false;
}

function showFields() {
    let content = $('#editor-fields')[0];
    if (!content.style.maxHeight){
        content.style.maxHeight = (content.scrollHeight + 15) + "px";
        content.style.height = content.style.maxHeight;
    }
}
function hideFields() {
    let content = $('#editor-fields')[0];
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    }
}

function editRow(row) {
    creando = false;
    editando = true;
    let tmp = getById(row);
    $('#nom')[0].value = tmp.nombre;
    $('#apellidos')[0].value = tmp.apellidos;
    $('#edad')[0].value = tmp.edad;
    $('#color')[0].value = tmp.color;
    showFields();
    selectedRow = persons.indexOf(tmp);
    botonNuevo.style.visibility = "hidden";
    botonCancelar.style.visibility = "visible";
    botonGuardar.style.visibility = "visible";
    botonEliminar.style.visibility = "visible";
}

function editPerson() {
    let nombre =    $('#nom')[0].value;
    let apellidos = $('#apellidos')[0].value;
    let edad =      $('#edad')[0].value;
    let color =     $('#color')[0].value;

    let tmp = new Person(persons[selectedRow].id, nombre, apellidos, edad, color);
    persons[selectedRow] = tmp;
    updateTable();
}


function removePerson() {
    let tmp = persons[selectedRow];
    if(confirm('Estas seguro que deseas eliminar a ' + tmp.nombre + '?')){
        persons.splice(selectedRow, 1);
        updateTable();
    }
}

function getById(id) {
    for (let i = 0; i < persons.length; i++) {
        if(persons[i].id === id)
            return persons[i];
    }
}