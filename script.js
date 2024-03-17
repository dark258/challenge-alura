/*
    El core del encriptador:
        e=enter
        i=imes
        a=ai
        o=ober
        u=ufat
*/

// recibo el objeto del campo de texto para encriptar o desencriptar
const campo_texto = document.querySelector("#texto-ingresado");
// recibo el objeto del campo de texto para dejar el texto encriptado o desencriptado
const campo_mensaje = document.querySelector("#campo-mensaje");

// matriz con las letras y sus contrapartes encriptadas
const matriz_cod = [
    ["e","enter"], 
    ["i","imes"],
    ["a","ai"], 
    ["o","ober"], 
    ["u","ufat"]
]

// función que dejará los mensajes de error o texto encriptado/desencriptado
function mostrarMensaje(msg, color){
    campo_mensaje.innerHTML = msg;
    campo_mensaje.style.color = color;
}
/*
    Función para encriptar el texto
    -  Revisa el texto ingresado
    -  Si está vacío muestra un mensaje de error
    -  Si no lo está, recorre el texto y reemplaza 
       cada letra por su contraparte en la matriz "matriz_cod"
*/
function encriptarTexto(){
    const textoIngresado = campo_texto.value;
    
    // en caso de recibir un texto vacío por parte del usuario
    if (textoIngresado === ""){
        mostrarMensaje("No ha ingresado nada", "red");
    }else {
        //esta variable recibirá eventualmente el texto a medida que se arma
        let codificado = "";

        //recorro el texto proporcionado
        for (let i = 0; i < textoIngresado.length; i++){
            
            //Indicará si la letra del texto que veo está en la matriz de código
            let encontrada = false;
            
            //Mientras recorro la matriz y no haya encontrado una letra aún, comparo
            //la letra con la letra del texto donde voy
            for (let j =  0; j < matriz_cod.length && !encontrada ;j++)
                // encontré una letra, por lo que agrego la parte de la matriz que lo codifica
                if (matriz_cod[j][0].toLowerCase() == textoIngresado[i].toLowerCase()) {
                    codificado += matriz_cod[j][1];
                    encontrada = true;
                }
                //Si no se encuentra la letra, agregarla tal cual
                if (!encontrada) codificado+= textoIngresado[i];
        }
        //Muestra el texto codificado
        mostrarMensaje(`Codificación: ${codificado}`, "green");
    }
};

/*
    Función para desencriptar el texto
    -  Revisa el texto ingresado
    -  Si está vacío muestra un mensaje de error
    -  Si no lo está, recorre el texto y reemplaza 
       cada pieza de texto encriptado por su letra 
       correspondiente en la matriz "matriz_cod"
*/
function desencriptarTexto(){
    const textoIngresado = campo_texto.value;
    if (textoIngresado === ""){
        mostrarMensaje("No ha ingresado nada","red");
    } else {
        let descifrada ="";
        for (let i=0; i<textoIngresado.length; i++ ){
            let noEncontrada = false;
            let consonante = false;
            for (let j = 0; j < matriz_cod.length && !noEncontrada; j++){
                // encuentro la vocal inicial
                if (matriz_cod[j][0].toLowerCase() == textoIngresado[i].toLowerCase()) {
                    let k = 1
                    // vocal = matriz_cod[j][0]
                    for (; k < matriz_cod[j][1].length;k++){
                        const kEsimaLetra =  matriz_cod[j][1][k];
                        if (kEsimaLetra.toLowerCase() == textoIngresado[i+k]){
                            continue;
                        }else{
                            for (let l=0; l < k; l++){
                                descifrada += textoIngresado[i+l];
                            }
                            noEncontrada =true;
                            break;
                        }
                    }
                    // Si es false, quiere decir que hallé un trozo encriptado
                    if (!noEncontrada){ 
                        descifrada += matriz_cod[j][0];
                    }
                    i+=k-1;
                    break;
                }else{
                    consonante = (j==matriz_cod.length-1);
                    if (consonante){
                        descifrada += textoIngresado[i];
                    }
                }
            }

        }
        mostrarMensaje(`Decodificación: ${descifrada}`, "green");
    }
}

//Eventos de teclado y clic del botón
document.querySelector(".btnEncriptar").addEventListener("click",encriptarTexto);
document.querySelector(".btnDesencriptar").addEventListener("click",desencriptarTexto);