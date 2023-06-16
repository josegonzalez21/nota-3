//funcion para listar clientes
function listarClientes(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://159.223.103.211/api/cliente?_size=100", requestOptions)
      .then(response => response.json())
      .then((json) => { json.forEach(completarFila);
      return json;
      })
      .then((json) => {
        $('#tbl_clientes').DataTable();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  //funcion para que se complete la fila
  
  function completarFila (element, index, arr){
    arr[index] = document.querySelector('#tbl_clientes tbody').innerHTML +=
    `<tr>
        <td>${element.id_cliente}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar-cliente.html?id=${element.id_cliente}&nombre= ${element.nombres}&apellido=${element.apellidos}'><img src='../img/papelera-de-reciclaje.jpg' width="20" geight"20"> </a> 
  <a href='actualizar-cliente.html?id=${element.id_cliente}'><img src='../img/lapiz.png' width="20" geight"20">  </a> 
  </td>
  
    </tr>`
  }
  //funcion para crear cliente
  function crearCliente(){
      var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  //creamos variables para almacenar datos
    let txt_rut = document.getElementById("txt_id_cliente").value;
    let txt_dv = document.getElementById("txt_dv").value;
    let txt_nombres = document.getElementById("txt_nombres").value;
    let txt_apellidos = document.getElementById("txt_apellidos").value;
    let txt_email = document.getElementById("txt_email").value;
    let txt_celular = document.getElementById("txt_celular").value
  
  var raw = JSON.stringify({
    "id_cliente": txt_rut,
    "dv": txt_dv,
    "nombres": txt_nombres,
    "apellidos": txt_apellidos,
    "email": txt_email,
    "celular": txt_celular,
    "fecha_registro": "2023-04-27"
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://159.223.103.211/api/cliente", requestOptions)
  .then(response => {
    if(response.ok){
      alert("Cliente Creado");
      window.location.href = "listar-cliente.html";
    }else{
      alert("Error al crear el cliente");
    }
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));;
}

  //OBTENEMOS ID A ELIMINAR 
  function obtenerIDclienteEliminar(){
    //UTILIZAMOS SEARCH PARA ACCEDER A LAS VARIABLES RECIBIDAS MEDIANTE URL
    var queryString = window.location.search;
    //EXTRAEMOS LOS PARAMETROS 
    var urlparamatros = new URLSearchParams(queryString);
    //CREAMOS VARIABLE CON EL ID DEL CLIENTE
    var id_cliente_url = urlparamatros.get('id')
    var nombre_url = urlparamatros.get('nombre')
    var apellido_url = urlparamatros.get('apellido')
    //AGREGAMOS ID A CAMPO OCULTO
    document.getElementById('hdn_id_cliente').value = id_cliente_url;
    //MOSTRAMOS MENSAJE DE CONFIRMACION
    var mensaje = "¿Desea eliminar al cliente " + nombre_url + " " + apellido_url + "?";
    document.getElementById("alt_eliminacion").innerHTML = mensaje;
  }
  //Eliminar cliente
  function eliminarCliente(){
    //OBTENEMOS ID A ELIMINAR DENUEVO
    var id_cliente_eliminar = document.getElementById('hdn_id_cliente').value;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://159.223.103.211/api/cliente/" + id_cliente_eliminar, requestOptions)
      .then(response => {
        if(response.ok){
          alert("Cliente Eliminado");
          window.location.href = "listar-cliente.html";
        }else{
          alert("Error al eliminar cliente");
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  //Obtenemos id de cliente a actualizar 
  function obtenerIDClienteActualizar(){
    //UTILIZAMOS SEARCH PARA ACCEDER A LAS VARIABLES RECIBIDAS MEDIANTE URL
    var queryString = window.location.search;
    //EXTRAEMOS LOS PARAMETROS 
    var urlparamatros = new URLSearchParams(queryString);
    //CREAMOS VARIABLE CON EL ID DEL CLIENTE
    var id_cliente_url = urlparamatros.get('id')
    var nombre_url = urlparamatros.get('nombre')
    var apellido_url = urlparamatros.get('apellido')
    //AGREGAMOS ID A CAMPO OCULTO
    document.getElementById('txt_id_cliente').value = id_cliente_url;
    //invocamos api rest para obtener datos del cliente
    consultarClienteActualizar(id_cliente_url);
  }

  //agregamos los valores recibidos en formulario html de actualizacion
  function completarFormulario(element, index, arr){
  //creamos variables con los datos del cliente
  var nombres = element.nombres;
  var apellidos = element.apellidos;
  var email = element.email;
  var celular = element.celular;
  //agregamos los valores a los campos del formulario
  document.getElementById('txt_nombres') = nombres;
  document.getElementById('txt_apellidos') = apellidos;
  document.getElementById('txt_email') = email;
  document.getElementById('txt_celular') = celular;
  }

  //consultamos los datos del cliente a actualizar
  function consultarClienteActualizar(id_cliente_actualziar){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://159.223.103.211/api/cliente/"+id_cliente_actualziar, requestOptions)
      .then(response => response.json())
      .then((json) => json.forEach(completarFormulario))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

//Funcion de actualizacion
  function actualizarCliente(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//obtenemos los valores de los campos del formulario
var id_cliente = document.getElementById("txt_id_cliente").value;
var nombres = document.getElementById("txt_nombres").value;
var apellidos = document.getElementById("txt_apellidos").value;
var email = document.getElementById("txt_email").value;
var celular = document.getElementById("txt_celular").value;

var raw = JSON.stringify({
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": celular
});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://159.223.103.211/api/cliente/"+id_cliente, requestOptions)
  .then(response => {
    if(response.ok){
      alert("Cliente Actualizado");
      window.location.href = "listar-cliente.html";
    }else{
      alert("Error al actualizar cliente");
    }
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
  
/////////////////////////////////////////////////////////////////////////////////
//validar 
function validar() {
  // Variable que usaremos para determinar si el input es válido
  let isValid = false;

  // El input que queremos validar
  const inputNombre = document.getElementById('txt_nombres');
  const inputApellido = document.getElementById('txt_apellidos');

  // El div con el mensaje de advertencia:
  const message = document.getElementById('message');

  // El pattern que vamos a comprobar
  const pattern = /^[A-Za-z\s]+$/;

  // Validamos el nombre
  if (inputNombre.value.trim() === '' || !pattern.test(inputNombre.value)) {
    isValid = false;
  } else {
    isValid = true;
  }

  // Validamos el apellido
  if (inputApellido.value.trim() === '' || !pattern.test(inputApellido.value)) {
    isValid = false;
  } else {
    isValid = true;
  }

  // Ahora coloreamos el borde de los inputs
  if (!isValid) {
    // rojo: no es válido
    inputNombre.style.borderColor = 'salmon';
    inputApellido.style.borderColor = 'salmon';
    // mostramos mensaje
    message.hidden = false;
  } else {
    // verde: es válido
    inputNombre.style.borderColor = 'palegreen';
    inputApellido.style.borderColor = 'palegreen';
    // ocultamos mensaje;
    message.hidden = true;
  }

  // devolvemos el valor de isValid
  return isValid;
}

// Por último, nuestra función que verifica si el campo es válido antes de realizar cualquier otra acción.
function verificar() {
  const valido = validar();
  console.log("entro")
  if (!valido) {
    alert('El campo no es válido.');
    location.reload();
  } 
}

