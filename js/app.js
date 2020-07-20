//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const eliminarCursos = document.getElementById('vaciar-carrito');
//Eventos
leerLosEvent();

function leerLosEvent() {
    cursos.addEventListener('click', comprarCurso);
    carrito.addEventListener('click', borrarCurso);
    eliminarCursos.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//Funciones
//Se toma el enlace para poder mandar al carrito
function comprarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    };
};

//Se selecciona lo que queramos mostrar en el carrito
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    agregarAlCarrito(infoCurso);
};

//Se agrega al carrito el curso
function agregarAlCarrito(curso) {
    const lista = document.createElement('tr');
    lista.innerHTML = `
        <td>
        <img src="${curso.imagen}" width=100>
        </td>
        <td>
        ${curso.titulo}
        </td>
        <td>
        ${curso.precio}
        </td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>`;
    listaCursos.appendChild(lista);
    guardarCursoLocalStorage(curso);
    4
};

//Borrar curso
function borrarCurso(e) {
    e.preventDefault();
    let curso,
        cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove()
        curso = e.target.parentElement.parentElement;
        cursoId = document.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
};

//Vaciar el carro
function vaciarCarrito(e) {
    e.preventDefault();
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    //Vaciar el localStorage
    vaciarLocalStorage();
    return false;
};

//Guardar curso en el localStorage
function guardarCursoLocalStorage(curso) {
    let cursos;

    cursos = obtenerCursoLS();
    //Al curso que lo converti el json (array), le agrego los cursos que seleccione
    cursos.push(curso);
    //Al curso que viene como json lo transformo en string
    localStorage.setItem('cursos', JSON.stringify(cursos))
}

function obtenerCursoLS() {
    let cursosLS;
    //Si no encuentra nada, comienza un array, si encuentra algo lo convierte en array
    if (localStorage.getItem('cursos') == null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS
};

//Mostrar los cursos que estan en localStorage
function leerLocalStorage() {
    let cursosLS;
    cursosLS = obtenerCursoLS();
    cursosLS.forEach(curso => {
        const lista = document.createElement('tr');
        lista.innerHTML = `
        <td>
        <img src="${curso.imagen}" width=100>
        </td>
        <td>
        ${curso.titulo}
        </td>
        <td>
        ${curso.precio}
        </td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>`;
        listaCursos.appendChild(lista);
    });
}

//Eliminar del localStorage
function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    cursosLS = obtenerCursoLS();
    cursosLS.forEach(function(cursoLS, index) {
        if (cursoLS.id == curso) {
            cursosLS.splice(index, 1);
        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//Elimina todos los cursos del localStorage
function vaciarLocalStorage() {
    localStorage.clear();
}