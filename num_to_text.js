var unidad = [
    "", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
    "diez", "once", "doce", "trece", "catorce", "quince", "dieciseis", "diecisiete", "dieciocho", "diecinueve"
];
var decena = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
var conector = ["cien", "mil", "millon", "billon", "mil millones","cientos"];
//excepciones "quinientos" decenas de 10
function format(input, output) {
    var num = parseInt(input.value);
    if (!isNaN(num)) {
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        output.innerHTML = num;
    } else {
        alert('Solo se permiten numeros');
        input.value = input.value.replace(/[^\d\.]*/g, '');
    }
}

function traducir() {
    var res = document.getElementById("resultado");
    var num = document.getElementById("texto");
    var formatear = document.getElementById("numFormateado");
    if (isNaN(num.value)) {
        alert("no ingresó un número");
    } else if (num.value != "") {
        //si recibe un numero
        res.innerHTML = palabras(num.value);
        format(num, formatear);
    }
}
var palabras = function(num) {
    var str = parseInt(num).toString(),
        len = str.length,
        palabra = "";
    var ciclos = Math.trunc(len / 3) + extra(len); //cantidad de trios obtenibles
    var parte = [];
    parte = obtenerTrios(str, len, ciclos);
    //recorrer parte[]
    var cont = parte.length-1; //cuenta para posicionar cientos, miles...
    for (let index = parte.length - 1; index >= 0; index--) {
        var dec = parte[index];
        dec = dec.toString().substring(1, dec.length); //cortar decena
        var cen = parte[index],
            cen = cen.toString().substring(0, 1); //obtener centena
        //escribir centena
        if (cen == 5) { //restricciones, 500,900,100
            palabra = palabra + " " + "quinientos";
        } else if (cen == 9) {
            palabra = palabra + " " + "novecientos";
        } else if (cen == 1) {
            palabra = palabra + " " + conector[0];
            if (dec > 0) {
                palabra = palabra + "to";
            }
        } else if (cen != 0) { //mayor = a 200 
            palabra = palabra + " " + unidad[cen] + conector[conector.length-1];
        }
        //escribir decena
        //el 0 se omite
        if (parseInt(dec) < 20 && parseInt(dec) > 0) { //de 1 hasta el 19
            palabra = palabra + " " + unidad[parseInt(dec)];
        } else if (parseInt(dec) == 20) {
            palabra = palabra + " " + decena[2];
        } else if (parseInt(dec) > 20 && parseInt(dec) < 30) { //de 20 hasta el 29
            palabra = palabra + " veinti" + unidad[dec.substring(1)];
        } else if (parseInt(dec) > 0) { //no concatenar "y" si el valor es 0
            palabra = palabra + " " + decena[dec.substring(0, 1)];
            if (parseInt(dec.substring(1)) > 0) {
                palabra = palabra + " y " + unidad[dec.substring(1)];
            }

        }
        if (dec.substring(1) == "1" && cont > 0 && dec != 11) {
            palabra = palabra.substring(0, palabra.length - 1);
        }
        //conectores
        //console.log("cont="+cont+" parte="+parte[index]);
       if (cont > 0 && cont<5 && parte[index] > 0) { //mayor a 0 para que no concatene sin sentido
            palabra = palabra + " " + conector[cont];
            if (cont<4 && cont >1 && parte[index] > 1) { //millones y billones
                palabra = palabra + "es"
            }
        }
        cont--;
    }
    if (num == 0) { //restriccion del 0
        palabra = "cero";
    }
    return palabra;
}

function extra(len) { if ((len % 3) > 0) { return 1; } return 0; }

function obtenerTrios(str, len, cantTrios) {
    var parte = [];
    var final = len, //final de corte
        inicio = final - 3; //inicio de corte
    var cont = 0;
    for (var i = 0; i < cantTrios; i++) {
        if (final > 0) {
            var trio = str.substring(inicio, final);
            if (inicio < 0) {
                for (var j = 0; j < Math.abs(inicio); j++) {
                    trio = "0" + trio;
                }
            }
            parte[cont] = trio;
            //console.log("trio" + i + "=" + parte[cont]);
            cont++
        }
        final = inicio;
        inicio = inicio - 3;
    }
    return parte;
}
function checkear(idTarget) {
    var target = document.getElementById(idTarget).innerText;
    var str = document.getElementById("palabra").value;
    alert(isNumText(str).toString());

}

function isNumText(str) {
    if (buscarEnArray(unidad, str) ||
        buscarEnArray(decena, str) ||
        buscarEnArray(conector, str)) {
        //console.log("palabra=numero");
        return true;
    }
    return false;
}
function buscarEnArray(array, str) {
    var n = 0,
        s = " " + str.trim().toLowerCase();//agregar 1 espacio,sino,indexof retornaria posicion 0
    for (var i = 0; i < array.length; i++) {
        n = s.indexOf(array[i].toLowerCase());
        if (array[1] == 'uno' && n == 1 && (s.length - 1) == array[i].length) {
            //con str"uno" identifica el array de unidades
            return true;
        } else if (n > 0 && (s.length - 1) == array[i].length) {
            return true;
        }
    }
    return false;
}
function count(str,idlbl){
    var lbld=document.getElementById(idlbl);
    lbld.innerText=str.length;
}