function keypressRut(element) {
    if (element.value.length < 9 && event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 107) {
        return true;
    } else { return false; }
}

function validar(element) {
    var lbl = document.getElementById("lblRut");
    if (valido(element.value)) {
        lbl.style.backgroundColor = "#13f25d";
    } else {
        lbl.style.backgroundColor = "#f93c1b";
    }
}
//recive el rut completo, y devuelve true si el codigo verificador es correcto
function valido(rut) {
    var str = reverseString(rut.toString()).substring(1);
    var cv = reverseString(rut.toString()).substring(0, 1);
    var multiplos = [2, 3, 4, 5, 6, 7, 2, 3]
    var totalSuma = 0;
    for (let i = 0; i < str.length; i++) {
        totalSuma = totalSuma + (parseInt(str[i]) * multiplos[i]);
    }
    if (codigoV(cv, totalSuma) == cv) { return true; }
    return false;
}
//calcula el codigo verificador
function codigoV(c, suma) {
    var cod = 11 - (suma - (11 * Math.trunc(suma / 11)));
    switch (cod) {
        case 11:
            return 0;
            break;
        case 10:
            return "k";
            break;
        default:
            return cod;
    }
}
//devuelve una string al revés
function reverseString(str) { return str.split('').reverse().join(''); }