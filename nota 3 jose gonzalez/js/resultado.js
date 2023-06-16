//funcion para listar resultados
function listarResultado(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://159.223.103.211/api/resultado?_size=100", requestOptions)
      .then(response => response.json())
      .then((json) => { json.forEach(completarFila);
      return json;
      })
      .then((json) => {
        $('#tbl_resultado').DataTable();
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  //funcion para que se complete la fila
  
  function completarFila (element, index, arr){
    arr[index] = document.querySelector('#tbl_resultado tbody').innerHTML +=
    `<tr>
        <td>${element.id_resultado}</td>
        <td>${element.nombre_resultado}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar_resultado.html?id=${element.id_resultado}&nombre= ${element.nombre_resultado}'><img src='../img/papelera-de-reciclaje.jpg' width="20" geight"20"></a> 
  <a href='actualizar_resultado.html?id=${element.id_resultado}'><img src='../img/lapiz.png' width="20" geight"20"></a> 
  </td>
  
    </tr>`
  }

  ///////////////////////////////////////////////////////////////
  //eliminar resultado
  //OBTENEMOS ID A ELIMINAR 
  function obtenerIDresultadoEliminar(){
    //UTILIZAMOS SEARCH PARA ACCEDER A LAS VARIABLES RECIBIDAS MEDIANTE URL
    var queryString = window.location.search;
    //EXTRAEMOS LOS PARAMETROS 
    var urlparamatros = new URLSearchParams(queryString);
    //CREAMOS VARIABLE CON EL ID DEL resultado
    var id_resultado_url = urlparamatros.get('id')
    var nombre_resultado_url = urlparamatros.get('nombre_resultado')
    //AGREGAMOS ID A CAMPO OCULTO
    document.getElementById('hdn_id_resultado').value = id_resultado_url;
    //MOSTRAMOS MENSAJE DE CONFIRMACION
    var mensaje = "¿Desea eliminar el resultado " + nombre_resultado_url + "?";
    document.getElementById("alt_eliminacion").innerHTML = mensaje;
  }
  //Eliminar resultado
  function eliminarResultado(){
    //OBTENEMOS ID A ELIMINAR DENUEVO
    var id_resultado_eliminar = document.getElementById('hdn_id_resultado').value;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://159.223.103.211/api/resultado/" + id_resultado_eliminar, requestOptions)
      .then(response => {
        if(response.ok){
          alert("Resultado Eliminado");
          window.location.href = "listar_resultado.html";
        }else{
          alert("Error al eliminar el resultado");
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

//////////////////////////////////////////////////////////////////////////////////////////////////
//CREAR Resultado
  //funcion para crear resultado
  function crearResultado(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//creamos variables para almacenar datos
  let txt_id_resultado = document.getElementById("txt_id_resultado").value;
  let txt_nombre_resultado = document.getElementById("txt_nombre_resultado").value;

var raw = JSON.stringify({
  "id_resultado": txt_id_resultado,
  "nombre_resultado": txt_nombre_resultado,
  "fecha_registro": "2023-04-27"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://159.223.103.211/api/resultado", requestOptions)
.then(response => {
    if(response.ok){
      alert("Resultado Creado");
      window.location.href = "listar_resultado.html";
    }else{
      alert("Error al crear el resultado");
    }
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));;
}

/////////////////////////////////////////////////////////////////////////////////
//actualizar resultado 
//Obtenemos id del resultado a actualizar 
function obtenerIDresultadoActualizar(){
  //UTILIZAMOS SEARCH PARA ACCEDER A LAS VARIABLES RECIBIDAS MEDIANTE URL
  var queryString = window.location.search;
  //EXTRAEMOS LOS PARAMETROS 
  var urlparamatros = new URLSearchParams(queryString);
  //CREAMOS VARIABLE CON EL ID DEL resultado
  var id_resultado_url = urlparamatros.get('id')
  var nombre_resultado_url = urlparamatros.get('nombre')
  //AGREGAMOS ID A CAMPO OCULTO
  document.getElementById('txt_id_resultado').value = id_resultado_url;
  //invocamos api rest para obtener datos del cliente
  consultarClienteActualizar(id_resultado_url);
}

//agregamos los valores recibidos en formulario html de actualizacion
function completarFormulario(element, index, arr){
//creamos variables con los datos del cliente
var nombre_resultado = element.nombre_resultado;
//agregamos los valores a los campos del formulario
document.getElementById('txt_nombre_resultado') = nombre_resultado;
}

//consultamos los datos del cliente a actualizar
function consultarResultadoActualizar(id_resultado_actualziar){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://159.223.103.211/api/resultado/"+id_resultado_actualziar, requestOptions)
    .then(response => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

//Funcion de actualizacion
function actualizarResultado(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

//obtenemos los valores de los campos del formulario
var id_resultado = document.getElementById("txt_id_resultado").value;
var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

var letrasRegex = /^[A-Za-z]+$/;
  if (!letrasRegex.test(nombre_resultado)) {
    alert("Ingrese solo letras en el campo Nuevo nombre resultado");
    return;
  }

var raw = JSON.stringify({
"id_resultado": id_resultado,
"nombre_resultado": nombre_resultado,
"fecha_registro": "2023-04-27"
});

var requestOptions = {
method: 'PATCH',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://159.223.103.211/api/resultado/"+id_resultado, requestOptions)
.then(response => {
  if(response.ok){
    alert("Resultado Actualizado");
    window.location.href = "listar_resultado.html";
  }else{
    alert("Error al actualizar Resultado");
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
  const input = document.forms['crear']['letras'];

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

