<?="hola"?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Utilidades de  texto</title>
    <script type="text/javascript" src="num-to-text.js"></script>
    <script type="text/javascript" src="rut.js"></script>

    <script>
    function mayuscula(elm){
        var out =document.getElementById("cambiado");
        var strIn =elm.value.toString(), strOut="";
        var rb=document.getElementsByName("caso");
        if (rb[0].checked) {
            strOut = strIn.toUpperCase();
        }else if (rb[1].checked) {
            strOut = strIn.toLowerCase();
        }
        out.value=strOut;
        console.log("m =" +strOut);
        return strOut;
    }
    </script>
</head>
<body>
<header><h1>Utilidades de texto</h1></header>
<div>
<form name="formMain" >
    <section>
        <label for="texto">Convertir números  a letras</label>
        <div>
            <input type="number" id="texto"  
            onKeyDown="if(this.value.length==15 && event.keyCode!=8) return false;"
            placeholder="escriba un numero" onkeyUp="traducir()">
        </div>
        <div id="numFormateado"></div>
        <div id="resultado"></div>
        
    </section>
    <section>
        <input type="text" name="palabra" id="palabra" placeholder="Ingrese numero en letras" onblur="checkear('textNum')">
        <p id="textNum">asdasdasdsad</p>
    </section>
    <section >
        <label  for="rutText" >Ingrese rut</label>
        <div>
            <input type="text" name="rutText" id="rutText"
            onKeyPress=" return(keypressRut(this))" 
            onKeyUp="return(validar(this))">
            <div style="width:30px;height:20px;" id="lblRut"></div>
        </div>
    </section>
    <div>
            <label for="frase" id="lblFrase">Convertir frase a Mayúscula</label>
            <input type="text" name="frase" id="frase" onkeyup="mayuscula(this);count(this.value, 'contador')" 
            placeholder="Inserte frase" >
            <form name="fCase">
                <input type="radio" name="caso" id="may" value="max" checked 
                onclick="if(this.checked){lbl.innerHTML='Convertir frase a Mayúscula';mayuscula(this)}">
                <label for="may">Mayúscula</label>
                <input type="radio" name="caso" id="min" value="min" 
                onclick="if(this.checked){lbl.innerHTML='Convertir frase a Minúscula'}">
                <label for="min">Minúscula</label>
            </form>
            <textarea id="cambiado" COLS=50 ROWS=10 NAME="Texto" ></textarea>
            <label for="contador">Cantidad de caracteres:</label>
            <span id="contador"></span>
            
        </div> 
</form>
</div>

    
    <script>var lbl=document.getElementById("lblFrase");</script>
</body>
</html>
