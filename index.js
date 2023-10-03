
const registroForm = document.getElementById("registroForm");
        let mensajeRegistro = document.getElementById("mensajeRegistro");
        let inicioSesionForm = document.getElementById("inicioSesionForm");
        let mensajeInicioSesion = document.getElementById("mensajeInicioSesion");
        let operacionesForm = document.getElementById("operacionesForm");
        let resultadoOperacion = document.getElementById("resultadoOperacion");
        
        registroForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            let usuario = document.getElementById("usuario").value;
            let contrasena = document.getElementById("contrasena").value;
            let saldo = parseFloat(document.getElementById("saldo").value);
            
            localStorage.setItem("usuario", usuario);
            localStorage.setItem("contrasena", contrasena);
            localStorage.setItem("saldo", saldo);
            
            mensajeRegistro.style.display = "block";
        });

        inicioSesionForm.addEventListener("submit", function(event) {
            event.preventDefault();

           let usuarioLogin = document.getElementById("usuarioLogin").value;
           let contrasenaLogin = document.getElementById("contrasenaLogin").value;

           let storedUsuario = localStorage.getItem("usuario");
           let storedContrasena = localStorage.getItem("contrasena");

            if (usuarioLogin === storedUsuario && contrasenaLogin === storedContrasena) {
                mensajeInicioSesion.textContent = "Inicio de sesión exitoso";
                mensajeInicioSesion.style.color = "green";
                mensajeInicioSesion.style.display = "block";
                operacionesForm.style.display = "block";
            } else {
                mensajeInicioSesion.textContent = "Usuario o contraseña incorrectos";
                mensajeInicioSesion.style.color = "red";
                mensajeInicioSesion.style.display = "block";
            }
        });

        operacionesForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let monto = parseFloat(document.getElementById("monto").value);
            let moneda = document.getElementById("moneda").value;
            let saldo = parseFloat(localStorage.getItem("saldo"));

            if (monto > saldo) {
                resultadoOperacion.textContent = "Lo siento, el monto ingresado no coincide con el del usuario";
                resultadoOperacion.style.color = "red";
                resultadoOperacion.style.display = "block";
                return;
            }

            let resultado = 0;
            let mensajeResultado = "";

            if (moneda === "dolares") {
                resultado = monto / 800; 
                mensajeResultado = `Tu monto en dólares es: $${resultado.toFixed(2)}`;
            } else if (moneda === "euros") {
                resultado = monto / 750; 
                mensajeResultado = `Tu monto en euros es: €${resultado.toFixed(2)}`;
            }

            let pesosSobrantes = saldo - monto;
            mensajeResultado += `<br>Saldo disponible en pesos: $${pesosSobrantes.toFixed(2)}`;

            resultadoOperacion.innerHTML = mensajeResultado;
            resultadoOperacion.style.color = "blue";
            resultadoOperacion.style.display = "block";
        });