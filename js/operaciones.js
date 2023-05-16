document.getElementById("borrar").addEventListener("click", ()=>{    
    document.getElementById("formul").reset();
    document.getElementById("total").value="Total a pagar $"
    document.getElementById("resumen").innerHTML="Resumen"
})

document.getElementById("resumen").addEventListener("click", ()=>{  
    if(document.getElementById("resumen").innerHTML=="Resumen"){ 
        if(document.getElementById("nombre").value=="" || document.getElementById("apellido").value=="" ||
        document.getElementById("mail").value=="" || document.getElementById("cantidad").value==0){
            alert("Complete todos los campos")
            document.getElementById("total").value="Total a pagar $"
        }else{
            document.getElementById("total").value="Total a pagar $" 
            valor=document.getElementById("cantidad").value
            if (valor.charAt(0)=="-"){
                document.getElementById("cantidad").value=valor.substring(1);
            }
            switch (document.getElementById("op").value) {
                case "estudiante":                    
                    precio=((Math.trunc(document.getElementById("cantidad").value)*200)*20/100);
                    document.getElementById("total").value=document.getElementById("total").value+" "+precio+" pesos";
                    document.getElementById("resumen").innerHTML="Comprar"
                    break;
                case "trainee":                    
                    precio=((document.getElementById("cantidad").value*200)*50/100);
                    document.getElementById("total").value=document.getElementById("total").value+" "+precio+" pesos";
                    document.getElementById("resumen").innerHTML="Comprar"
                    break;
                case "junior":                    
                    precio=((document.getElementById("cantidad").value*200)*85/100);
                    document.getElementById("total").value=document.getElementById("total").value+" "+precio+" pesos";
                    document.getElementById("resumen").innerHTML="Comprar"
                    break;
                default:
                    break;
            }
            
        }
    }else{
        if(confirm("Confirma la compra de "+document.getElementById("cantidad").value+" ticket por el precio de "+precio+" pesos?")==true){           
            print();
            document.getElementById("formul").reset();
            document.getElementById("total").value="Total a pagar $";
            document.getElementById("resumen").innerHTML="Resumen";
            
        }        
    }
})



