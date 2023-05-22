document.getElementById("borrar").addEventListener("click", ()=>{    
    document.getElementById("formul").reset();//el reset limpia todo el formulario, todfos los campos del formulario los limpia
    document.getElementById("total").value="Total a pagar $"
    document.getElementById("resumen").innerHTML="Resumen"
})
//el boton dice resumen y hace segun diga resumen
document.getElementById("resumen").addEventListener("click", ()=>{  
    if(document.getElementById("resumen").innerHTML=="Resumen"){
        //aqui se valida que todos los campos esten llenos 
        if(document.getElementById("nombre").value=="" || document.getElementById("apellido").value=="" ||
        document.getElementById("mail").value=="" || document.getElementById("cantidad").value==0){
            alert("Complete todos los campos")
            document.getElementById("total").value="Total a pagar $"
        }else{
            document.getElementById("total").value="Total a pagar $" 
            valor=document.getElementById("cantidad").value
            //aqui valido que no ingrese numero negativo//tambien
            if (valor.charAt(0)=="-"){
                document.getElementById("cantidad").value=valor.substring(1);
            }
            //aqui segun la opcion hace la operacion
            switch (document.getElementById("op").value) {
                case "estudiante":         
                //descuento de 20 porciento, paga el 80   
                //el trunc toma valor entero en caso de ingresar decimal        
                    precio=((Math.trunc(document.getElementById("cantidad").value)*200)*20/100);
                    document.getElementById("total").value=document.getElementById("total").value+" "+precio+" pesos";
                    document.getElementById("resumen").innerHTML="Comprar"
                    break;
                case "trainee":                    
                    precio=((Math.trunc(document.getElementById("cantidad").value)*200)*50/100);
                    document.getElementById("total").value=document.getElementById("total").value+" "+precio+" pesos";
                    document.getElementById("resumen").innerHTML="Comprar"
                    break;
                case "junior":     
                //exacto, hago el calcul al reves//claro               
                    precio=((Math.trunc(document.getElementById("cantidad").value)*200)*85/100);
                    document.getElementById("total").value=document.getElementById("total").value+" "+precio+" pesos";
                    document.getElementById("resumen").innerHTML="Comprar"
                    break;
                default:
                    break;
            }
            
        }
    }else{//aqui entra cuando el boton dice comprar
        if(confirm("Confirma la compra de "+document.getElementById("cantidad").value+" ticket por el precio de "+precio+" pesos?")==true){           
            print();//print para imprimir comprobante
            document.getElementById("formul").reset();//limpio todoy queda listo para otra compra
            document.getElementById("total").value="Total a pagar $";//vuelvo a dejar la eqtiqueta estandar
            document.getElementById("resumen").innerHTML="Resumen";//y vuelvo a poner el boton en resumen
            //document.getElementById("total")
            //Y ESO ES TODO, ME FALTA VALIDAR EL MAIL, SI AHI ME DI CUENTA-
        }        
    }
})



