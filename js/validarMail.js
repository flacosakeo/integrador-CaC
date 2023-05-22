function validarMail(mail){
    if (document.getElementById("mail").value!=""){
        if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(mail)){
            document.getElementById("resumen").disabled=false
        } else {
            alert("La dirección de email es incorrecta.");
            document.getElementById("resumen").disabled=true
        }
    }
}