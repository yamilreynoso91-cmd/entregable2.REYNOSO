// Cargar personas desde localStorage
let personas = JSON.parse(localStorage.getItem("personas")) || [];

// Contador de socio
let contadorSocio = parseInt(localStorage.getItem("contadorSocio")) || 1;

const lista = document.getElementById("lista");
const buscador = document.getElementById("buscador");


// Mostrar lista

function mostrarPersonas(listaMostrar) {
    lista.innerHTML = "";

    listaMostrar.forEach((p) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <strong>Socio #${p.socio}</strong><br>
            ${p.nombre} ${p.apellido}<br>
            ${p.email}<br><br>

            <button onclick="editarPersona(${p.socio})">Editar</button>
            <button onclick="borrarPersona(${p.socio})">Eliminar</button>
        `;

        lista.appendChild(li);
    });

    actualizarContador();

    // Mostrar en consola
    console.clear();
    console.log(" LISTA DE PERSONAS:");
    personas.forEach(p =>
        console.log(`#${p.socio} | ${p.nombre} ${p.apellido} | ${p.email}`)
    );
}


// Contador

function actualizarContador() {
    document.getElementById("contador").textContent =
        `Cantidad de personas registradas: ${personas.length}`;
}

// Agregar persona

document.getElementById("btnAgregar").addEventListener("click", () => {
    let nombre = prompt("Ingrese nombre:");
    if (!nombre) return alert("Nombre obligatorio.");

    let apellido = prompt("Ingrese apellido:");
    if (!apellido) return alert("Apellido obligatorio.");

    let email = prompt("Ingrese email:");
    if (!email) return alert("Email obligatorio.");

  
    if (personas.some(p => p.email === email)) {
        return alert("El email ya está registrado.");
    }

    let persona = {
        socio: contadorSocio++,
        nombre,
        apellido,
        email
    };

    personas.push(persona);

    localStorage.setItem("personas", JSON.stringify(personas));
    localStorage.setItem("contadorSocio", contadorSocio);

    alert("Persona agregada correctamente.");
    mostrarPersonas(personas);
});


// Buscar por nombre

buscador.addEventListener("input", () => {
    let texto = buscador.value.toLowerCase();
    let filtradas = personas.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );
    mostrarPersonas(filtradas);
});


// Ordenar

document.getElementById("btnOrdenar").addEventListener("click", () => {
    personas.sort((a, b) => a.nombre.localeCompare(b.nombre));

    localStorage.setItem("personas", JSON.stringify(personas));

    console.log("Lista ordenada por nombre (A-Z)");
    mostrarPersonas(personas);
});


// Editar

window.editarPersona = function(socio) {
    let persona = personas.find(p => p.socio === socio);

    let nuevoNombre = prompt("Nuevo nombre:", persona.nombre);
    let nuevoApellido = prompt("Nuevo apellido:", persona.apellido);
    let nuevoEmail = prompt("Nuevo email:", persona.email);

    if (!nuevoNombre || !nuevoApellido || !nuevoEmail) {
        alert("Campos incompletos.");
        return;
    }

    // Validar email repetido
    if (nuevoEmail !== persona.email && personas.some(p => p.email === nuevoEmail)) {
        alert("Ese email ya existe.");
        return;
    }

    persona.nombre = nuevoNombre;
    persona.apellido = nuevoApellido;
    persona.email = nuevoEmail;

    localStorage.setItem("personas", JSON.stringify(personas));

    alert("Persona editada correctamente.");
    mostrarPersonas(personas);
};


// Borrar Registro

window.borrarPersona = function(socio) {
    if (!confirm("¿Seguro que desea eliminar este registro?")) return;

    personas = personas.filter(p => p.socio !== socio);

    localStorage.setItem("personas", JSON.stringify(personas));

    alert("Persona eliminada.");
    mostrarPersonas(personas);
};


// Mostrar lista inicial

mostrarPersonas(personas);
