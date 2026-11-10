// Validación de formato de correo electrónico
function esMailValido(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim().toLowerCase());
}

function validarMail(emailValue) {
    const input = document.getElementById("mail");
    const mail = emailValue !== undefined ? emailValue : (input ? input.value : "");
    
    if (!mail || mail.trim() === "") {
        if (input) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
        return false;
    }

    if (esMailValido(mail)) {
        if (input) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        return true;
    } else {
        if (input) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
        return false;
    }
}
