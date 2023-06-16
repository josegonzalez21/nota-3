//listar tipos gestiones
//funcion para listar tipos gestiones
function listarTiposGestiones(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://159.223.103.211/api/tipo_gestion?_size=100", requestOptions)
    .then(response => response.json())
    .then((json) => { json.forEach(completarFilaGestiones);
    return json;
    })
    .then((json) => {
      $('#tipo_gestiones').DataTable();
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
//funcion para que se complete la fila
function completarFilaGestiones (element, index, arr){
  arr[index] = document.querySelector('#tipo_gestiones tbody').innerHTML +=
  `<tr>
      <td>${element.id_tipo_gestion}</td>
      <td>${element.nombre_tipo_gestion}</td>
      <td>
  <a href='eliminar_tipo_gestion.html?id=${element.id_tipo_gestion}&nombre=${element.nombre_tipo_gestion}'><img src='../img/papelera-de-reciclaje.jpg' width="20" geight"20"></a> 
  <a href='actualizar_tipo_gestion.html?id=${element.id_tipo_gestion}'><img src='../img/lapiz.png' width="20" geight"20"></a> 
  </td>
  </tr>`
}

////////////////////////////////////////////////////////////
//Eliminar tipo de gestion
  //OBTENEMOS ID A ELIMINAR 
  function obtenerIDtipogestionEliminar(){
    //UTILIZAMOS SEARCH PARA ACCEDER A LAS VARIABLES RECIBIDAS MEDIANTE URL
    var queryString = window.location.search;
    //EXTRAEMOS LOS PARAMETROS 
    var urlparamatros = new URLSearchParams(queryString);
    //CREAMOS VARIABLE CON EL ID DE la gestion
    var id_tipo_gestion_url = urlparamatros.get('id')
    var nombre_tipo_gestion_url = urlparamatros.get('nombre')
    //AGREGAMOS ID A CAMPO OCULTO
    document.getElementById('hdn_id_tipo_gestion').value = id_tipo_gestion_url;
    //MOSTRAMOS MENSAJE DE CONFIRMACION
    var mensaje = "¿Desea eliminar la gestion de tipo " + nombre_tipo_gestion_url + " " + id_tipo_gestion_url + "?";
    document.getElementById("tbl_gestiones_eliminar").innerHTML = mensaje;
  }
  //se elimina la gestion escogida
  function eliminartipogestion(){
    //OBTENEMOS ID A ELIMINAR DENUEVO
    var id_tipo_gestion_eliminar = document.getElementById('hdn_id_tipo_gestion').value;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://159.223.103.211/api/tipo_gestion/" + id_tipo_gestion_eliminar, requestOptions)
      .then(response => {
        if(response.ok){
          alert("Tipo Gestion Eliminado");
          window.location.href = "listar_tipo_gestion.html";
        }else{
          alert("Error al eliminar tipo gestion");
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

/////////////////////////////////////////////////////////////////////////////////////
//Actualizar tipo de gestion
 //Obtenemos id de tipo gestion a actualizar 
 function obtenerIDTipoGestionteActualizar(){
  //UTILIZAMOS SEARCH PARA ACCEDER A LAS VARIABLES RECIBIDAS MEDIANTE URL
  var queryString = window.location.search;
  //EXTRAEMOS LOS PARAMETROS 
  var urlparamatros = new URLSearchParams(queryString);
  //CREAMOS VARIABLE CON EL ID DEL CLIENTE
  var id_tipo_gestion_url = urlparamatros.get('id');
  var nombre_tipo_gestion_url = urlparamatros.get('nombre');
  //AGREGAMOS ID A CAMPO OCULTO
  document.getElementById('hdh_id_tipo_gestion').value = id_tipo_gestion_url;
  //invocamos api rest para obtener datos de la gestion
  consultarTipoGestionActualizar(id_tipo_gestion_url);
}

//agregamos los valores recibidos en formulario html de actualizacion
function completarFormulario(element, index, arr){
//creamos variables con los datos de la gestion
var nombre = element.nombre_tipo_gestion;
//alert(nombre);
//agregamos los valores a los campos del formulario
document.getElementById('txt_nombre_tipo_gestion').value = nombre;
}

//consultamos los datos del tipo gestion a actualizar
function consultarTipoGestionActualizar(id_tipo_gestion_actualizar){
  //alert(id_tipo_gestion_actualizar);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://159.223.103.211/api/tipo_gestion/"+id_tipo_gestion_actualizar, requestOptions)
    .then(response => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
//Funcion de actualizacion
function actualizarTipoGestion(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//obtenemos los valores de los campos del formulario
var id_tipo_gestion = document.getElementById("hdh_id_tipo_gestion").value;
var nombre = document.getElementById("txt_nombre_tipo_gestion").value;

var raw = JSON.stringify({
"nombre_tipo_gestion": nombre,
});

var requestOptions = {
method: 'PATCH',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://159.223.103.211/api/tipo_gestion/"+id_tipo_gestion, requestOptions)
.then(response => {
  if(response.ok){
    alert("Tipo Gestion Actualizado");
    window.location.href = "listar_tipo_gestion.html";
  }else{
    alert("Error al actualizar Tipo de Gestion");
  }
})
.then(result => console.log(result))
.catch(error => console.log('error', error));
}

///////////////////////////////////////////////////////////////
//crear nuevo tipo gestion
 //funcion para crear tipo de gestion
 function crearTipoGestion(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//creamos variables para almacenar datos
let txt_id = document.getElementById("txt_id_tipo_gestion").value;
let txt_nombre = document.getElementById("txt_nombre_tipo_gestion").value

var raw = JSON.stringify({
"id_tipo_gestion": txt_id,
"nombre_tipo_gestion": txt_nombre,
"fecha_registro": "2023-04-27"
});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://159.223.103.211/api/tipo_gestion", requestOptions)
.then(response => {
  if(response.ok){
    alert("Tipo gestion Creada");
    window.location.href = "listar_tipo_gestion.html";
  }else{
    alert("Error al crear Tipo Gestion");
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