//evento para crear un nuevo libro
document.getElementById("formulario").addEventListener("submit",agregar);
//funcion crear
function agregar(e) {
    nombre = document.getElementById("nombres").value
    apellidos = document.getElementById("apellidos").value
    direccion= document.getElementById("direccion").value
    sueldo = document.getElementById("sueldo").value
    let empleado = {
        nombre,
        apellidos,
        direccion,
        sueldo
    }
    if (localStorage.getItem("Empleados") === null) {
        let empleados = []
        empleados.push(empleado)
        localStorage.setItem("Empleados", JSON.stringify(empleados))
    }else{
        let empleados = JSON.parse(localStorage.getItem("Empleados"))
        empleados.push(empleado)
        localStorage.setItem("Empleados",JSON.stringify(empleados))
    }
    
    leer();
    document.getElementById("formulario").reset();
    e.preventDefault()
    console.log("usuario agregado")
    
} 
function leer() {
    let empleados = JSON.parse(localStorage.getItem("Empleados"));
    for (let i = 0; i < empleados.length; i++) {
        let nombres = empleados[i].nombre
        let apellidos = empleados[i].apellidos
        let sueldo = empleados[i].sueldo
        let direccion = empleados[i].direccion

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${nombres}</td>
            <td>${apellidos}</td>
            <td>${direccion}</td>
            <td>${sueldo}</td>
            <td><button onclick="eliminar('${nombres}')" class="btn btn-danger">eliminar</button></td>
            <td><button onclick="editar('${nombres}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">editar</button></td>
        </tr>`        
    }
}

//funcion editar
function editar(nombres) {
    let empleados = JSON.parse(localStorage.getItem("Empleados"));
    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].nombre === nombres) {
            
            document.getElementById("diag").innerHTML= `
            <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Actualizar usuario</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="col-md-11">
                    <label for="nombres" class="form-label">Nombres</label>
                    <input type="text" class="form-control" id="newnombres" placeholder="${empleados[i].nombre}">
                    </div>
                    <div class="col-md-11">
                    <label for="apellidos" class="form-label">Apellidos</label>
                    <input type="text" class="form-control" id="newapellidos" placeholder="${empleados[i].apellidos}">
                    </div>
                    <div class="col-11">
                    <label for="direccion" class="form-label">Direccion</label>
                    <input type="text" class="form-control" id="newdireccion" placeholder="${empleados[i].direccion}">
                    </div>
                    <div class="col-md-11">
                    <label for="sueldo" class="form-label">Sueldo</label>
                    <input type="number" class="form-control" id="newsueldo" placeholder="${empleados[i].sueldo}">
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" onclick="actualizar('${i}')" class="btn btn-primary">Guardar</button>
                    </div>
                    </div>`
        }      
    }
}

//funcion actualizar
function actualizar(i) {
    let empleados = JSON.parse(localStorage.getItem("Empleados"));
    empleados[i].nombre = document.getElementById("newnombres").value;
    empleados[i].apellidos = document.getElementById("newapellidos").value;
    empleados[i].direccion = document.getElementById("newdireccion").value;
    empleados[i].sueldo = document.getElementById("newsueldo").value;
    localStorage.setItem("Empleados",JSON.stringify(empleados));
    VistaPrincipal()
}

//funcion eliminar
function eliminar (nombres) {
    let empleados = JSON.parse(localStorage.getItem("Empleados"));

    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].nombre === nombres) {
            empleados.splice(i,1);
        }
    }
    localStorage.setItem("Empleados",JSON.stringify(nombres));
    leer()
}


function VistaPrincipal() {
    window.location.reload()
}


leer();  