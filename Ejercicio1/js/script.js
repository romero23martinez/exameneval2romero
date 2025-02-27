const API = "https://www.zaragoza.es/sede/servicio/informacion-polen.json";
const apiCrud = "https://crudcrud.com/api/c2eb5d2002e3441592b8d3b0b0aa5ff3/plantas";

async function obtener() {
    const respuesta = await fetch(API);
    const data = await respuesta.json();

    data.result.forEach(element => {
        console.log(
            `${element.observation[0].publicationDate}, ${element.id}, ${element.title}, ${element.image}, ${element.observation[0].value}`
        );
    });

    mostrarData(data);
    await guardar(data);
    return data;
}

async function mostrarData(data) {
    const body = document.getElementById("body");
    body.innerHTML = "";

    let contenido = "";
    data.result.forEach(element => {
        contenido += `
            <tr>
                <td>${element.observation[0].publicationDate}</td>
                <td>${element.id}</td>
                <td>
                    <img src="${element.image}" alt="${element.title}" width="100">
                </td>
                <td>${element.observation[0].value}</td>
            </tr>  
        `;
    });

    body.innerHTML = contenido;
}

async function guardar(data) {
    const apiRest = {
        nombre: "Arturo Romero",
        datos: data.result.map(item => ({
            fecha: item.observation[0].publicationDate,
            especie: item.title,
            imagen: item.image,
            concentracion: item.observation[0].value
        }))
    };

    const response = await fetch(apiCrud, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(apiRest)
    });

    const result = await response.json();
    console.log("Respuesta de la API CRUD:", result);
    return result;
}

obtener();
