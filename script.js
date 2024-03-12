/*
    El core del encriptador:
        e=enter
        i=imes
        a=ai
        o=ober
        u=ufat
*/

const campo_texto = document.querySelector("#texto-ingresado");
const campo_mensaje = document.querySelector("#campo-mensaje");

const matriz_cod = [
    ["e","enter"], 
    ["i","imes"],
    ["a","ai"], 
    ["o","ober"], 
    ["u","ufat"]
]
function mostrarMensaje(msg, color){
    campo_mensaje.innerHTML = msg;
    campo_mensaje.style.color = color;
}
//Función para validar el texto ingresado
function validarTexto(){
    const textoIngresado = campo_texto.value;
    
    if (textoIngresado === ""){
        mostrarMensaje("No ha ingresado nada", "red");
    }else {
        
        let codificado = "";
        for (let i = 0; i < textoIngresado.length; i++){
            //Buscar si la letra está en la matriz de código
            let encontrada = false;
            
            for (let j =  0; j < matriz_cod.length && !encontrada ;j++)
                if (matriz_cod[j][0].toLowerCase() == textoIngresado[i].toLowerCase()) {
                    codificado += matriz_cod[j][1];
                    encontrada = true;
                }
                //Si no se encuentra la letra, agregarla tal cual
                if (!encontrada) codificado+= textoIngresado[i];
        }
        mostrarMensaje(`Codificación: ${codificado}`, "green")
    }
};

//Eventos de teclado y clic del botón