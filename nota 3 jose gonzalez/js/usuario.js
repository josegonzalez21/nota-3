//////////////////////////////////////////////////////
//funcion para listar usuarios
function listarUsuario(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://159.223.103.211/api/usuario?_size=100", requestOptions)
      .then(response => response.json())
      .then((json) => { json.forEach(completarFila);
      return json;
      })
      .then((json) => {
        $('#tbl_usuario').DataTable();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  //funcion para que se complete la fila
  
  function completarFila (element, index, arr){
    arr[index] = document.querySelector('#tbl_usuario tbody').innerHTML +=
    `<tr>
        <td>${element.id_usuario}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.username}</td>
        <td>${element.password}</td>
        <td>${element.celular}</td>
        <td>${element.fecha_registro}</td>  
        <td>
  <a href='eliminar_usuario.html?id=${element.id_usuario}&nombre= ${element.nombres}&apellido=${element.apellidos}'><img src='../img/papelera-de-reciclaje.jpg' width="20" geight"20">  </a> 
  <a href='actualizar_usuario.html?id=${element.id_usuario}'><img src='../img/lapiz.png' width="20" geight"20"> </a>
    </tr>`
  }

  //////////////////////////////////////////////
  //eliminar usuario
  //OBTENEMOS ID A ELIMINAR 
  function obtenerIDusuarioEliminar(){
    //UTILIZAMOS SEARCH PARA ACCEDER A LAS VARIABLES RECIBIDAS MEDIANTE URL
    var queryString = window.location.search;
    //EXTRAEMOS LOS PARAMETROS 
    var urlparamatros = new URLSearchParams(queryString);
    //CREAMOS VARIABLE CON EL ID DEL usuario
    var id_cliente_url = urlparamatros.get('id')
    var nombre_url = urlparamatros.get('nombre')
    var apellido_url = urlparamatros.get('apellido')
    //AGREGAMOS ID A CAMPO OCULTO
    document.getElementById('hdn_id_usuario').value = id_cliente_url;
    //MOSTRAMOS MENSAJE DE CONFIRMACION
    var mensaje = "¿Desea eliminar al usuario " + nombre_url + " " + apellido_url + "?";
    document.getElementById("alt_eliminacion").innerHTML = mensaje;
  }
  //Eliminar usuario
  function eliminarUsuario(){
    //OBTENEMOS ID A ELIMINAR DENUEVO
    var id_usuario_eliminar = document.getElementById('hdn_id_usuario').value;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://159.223.103.211/api/usuario/" + id_usuario_eliminar, requestOptions)
      .then(response => {
        if(response.ok){
          alert("Usuario Eliminado");
          window.location.href = "listar_usuario.html";
        }else{
          alert("Error al eliminar usuario");
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  ///////////////////////////////////////////////////////////
  //actualizar usuario
  //Obtenemos id de usuario a actualizar 
  function obtenerIDusuarioActualizar(){
    //UTILIZAMOS SEARCH PARA ACCEDER A LAS VARIABLES RECIBIDAS MEDIANTE URL
    var queryString = window.location.search;
    //EXTRAEMOS LOS PARAMETROS 
    var urlparamatros = new URLSearchParams(queryString);
    //CREAMOS VARIABLE CON EL ID DEL CLIENTE
    var id_usuario_url = urlparamatros.get('id')
    var nombre_url = urlparamatros.get('nombre')
    var apellido_url = urlparamatros.get('apellido')
    //AGREGAMOS ID A CAMPO OCULTO
    document.getElementById('txt_id_usuario').value = id_usuario_url;
    //invocamos api rest para obtener datos del usuario
    consultarUsuarioActualizar(id_usuario_url);
  }

  //agregamos los valores recibidos en formulario html de actualizacion
  function completarFormulario(element, index, arr){
  //creamos variables con los datos del usuario
  var nombres = element.nombres;
  var apellidos = element.apellidos;
  var email = element.email;
  var celular = element.celular;
  var username = element.username;
  var password = element.password;
  //agregamos los valores a los campos del formulario
  document.getElementById('txt_nombres') = nombres;
  document.getElementById('txt_apellidos') = apellidos;
  document.getElementById('txt_email') = email;
  document.getElementById('txt_celular') = celular;
  document.getElementById('txt_username') = username;
  document.getElementById('txt_password') = password;
  }

  //consultamos los datos del usuario a actualizar
  function consultarUsuarioActualizar(id_usuario_actualizar){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://159.223.103.211/api/usuario/"+id_usuario_actualizar, requestOptions)
      .then(response => response.json())
      .then((json) => json.forEach(completarFormulario))
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

//Funcion de actualizacion
  function actualizarUsuario(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//obtenemos los valores de los campos del formulario
var id_usuario = document.getElementById("txt_id_usuario").value;
var nombres = document.getElementById("txt_nombres").value;
var apellidos = document.getElementById("txt_apellidos").value;
var email = document.getElementById("txt_email").value;
var celular = document.getElementById("txt_celular").value;
var username = document.getElementById("txt_username").value;
var password = document.getElementById("txt_password").value;

var raw = JSON.stringify({
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": celular,
  "username": username,
  "password": password
});

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://159.223.103.211/api/usuario/"+id_usuario, requestOptions)
  .then(response => {
    if(response.ok){
      alert("Usuario Actualizado");
      window.location.href = "listar_usuario.html";
    }else{
      alert("Error al actualizar Usuario");
    }
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }

////////////////////////////////////////////////////////////////
//funcion para crear usuario
function crearUsuario(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//creamos variables para almacenar datos
  let txt_rut = document.getElementById("txt_id_usuario").value;
  let txt_dv = document.getElementById("txt_dv").value;
  let txt_nombres = document.getElementById("txt_nombres").value;
  let txt_apellidos = document.getElementById("txt_apellidos").value;
  let txt_email = document.getElementById("txt_email").value;
  let txt_celular = document.getElementById("txt_celular").value
  let txt_username = document.getElementById("txt_username").value
  let txt_password = document.getElementById("txt_password").value


var raw = JSON.stringify({
  "id_usuario": txt_rut,
  "dv": txt_dv,
  "nombres": txt_nombres,
  "apellidos": txt_apellidos,
  "email": txt_email,
  "celular": txt_celular,
  "username": txt_username,
  "password": txt_password,
  "fecha_registro": "2022-05-06"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://159.223.103.211/api/usuario", requestOptions)
.then(response => {
    if(response.ok){
      alert("Usuario Creado");
      window.location.href = "listar_usuario.html";
    }else{
      alert("Error al crear Usuario");
    }
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }

/////////////////////////////////////////////////////////////////////////////////
//validar 
function validar() {
  // Variable que usaremos para determinar si el input es valido
  let isValid = false;

  // El input que queremos validar
  const input = document.getElementsByName('letras')[0];
  //El div con el mensaje de advertencia:
  const message = document.getElementById('message');

  input.willValidate = false;

  // El tamaño maximo para nuestro input
  const maximo = 35;
  const minimo = 1;

  // El pattern que vamos a comprobar
  const pattern = new RegExp('^[A-Z]+$', 'i');

  // Primera validacion, si input esta vacio entonces no es valido
  if(!input.value) {
    isValid = false;
  } else {
    // Segunda validacion, si input es mayor que 35
    if(input.value.length > maximo) {
      isValid = false;
    } else {
      // Tercera validacion, si input contiene caracteres diferentes a los permitidos
      if(!pattern.test(input.value)){ 
      // Si queremos agregar letras acentuadas y/o letra ñ debemos usar
      // codigos de Unicode (ejemplo: Ñ: \u00D1  ñ: \u00F1)
        isValid = false;
      } else {
        // Si pasamos todas la validaciones anteriores, entonces el input es valido
        isValid = true;
      }
    }
    if (input.value.length < minimo) {
      isValid = false;
  }
}

  //Ahora coloreamos el borde de nuestro input
  if(!isValid) {
    // rojo: no es valido
    input.style.borderColor = 'salmon'; // me parece que 'salmon' es un poco menos agresivo que 'red'
    // mostramos mensaje
    message.hidden = false;
  } else {
    // verde: si es valido
    input.style.borderColor = 'palegreen'; // 'palegreen' se ve mejor que 'green' en mi opinion
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