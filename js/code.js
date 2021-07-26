const numeros = /^\d{1,}$/;
const decimal = /^\d*(\.\d{1})?\d{0,1}$/;
const validar = {
  dolares: false,
  porcentaje: false,
  personas: false,
};
const datos = document.querySelectorAll(".dato");
const botonPorcentaje = document.querySelectorAll(".inputbtn");
const botonPorcentajeCus = document.getElementById("custom");
const texto = document.getElementById("textoE");
const texto2 = document.getElementById("textoE2");
const propina = document.getElementById("propina");
const totalPropina = document.getElementById("totalPropina");
const resetar = document.getElementById("reseteo");
function calcular(dinero, porcentaje, personas) {
  let efectivo = parseFloat(dinero);
  let porcentajes = parseInt(porcentaje);
  let numeroPersonas = parseInt(personas);
  let subtotal = (efectivo * porcentajes) / 100;
  let propina = subtotal / numeroPersonas;
  let total = efectivo / numeroPersonas + propina;
  let propinaDecimal = propina.toFixed(2);
  let totalDecimal = total.toFixed(2);
  return [propinaDecimal, totalDecimal];
}
function validarCampo(e) {
  var val;
  if (e.target.name == "dinero") {
    val = decimal;
  } else {
    val = numeros;
  }
  if (val.test(e.target.value)) {
    if (e.target.name == "dinero") {
      e.target.classList.remove("borderInCorrecto");
      e.target.classList.add("borderCorrecto");
      texto.classList.remove("datoError");
      texto.classList.add("correcto");
    } else {
      e.target.classList.remove("borderInCorrecto");
      e.target.classList.add("borderCorrecto");
      texto2.classList.remove("datoError");
      texto2.classList.add("correcto");
    }
    validar[e.target.name] = true;
    console.log("funciona");
  } else {
    if (e.target.name == "dinero") {
      e.target.classList.remove("borderCorrecto");
      e.target.classList.add("borderInCorrecto");
      texto.innerHTML = "Dato Invalido";
      texto.classList.remove("correcto");
      texto.classList.add("datoError");
    } else {
      e.target.classList.remove("borderCorrecto");
      e.target.classList.add("borderInCorrecto");
      texto2.innerHTML = "Dato Invalido";
      texto2.classList.remove("correcto");
      texto2.classList.add("datoError");
    }
    validar[e.target.name] = false;
    console.log("no funciona");
  }
}
datos.forEach((input) => {
  input.addEventListener("keyup", validarCampo);
  input.addEventListener("blur", validarCampo);
});
botonPorcentaje.forEach((boton) => {
  boton.addEventListener("click", () => {
    boton.classList.add("clickeado");
    const efectivo = document.getElementById("billete");
    const personas = document.getElementById("persona");
    console.log(validar.dinero);
    console.log(validar.personas);
    if (validar.dinero && validar.personas) {
      let datos = calcular(efectivo.value, boton.value, personas.value);
      propina.innerHTML = datos[0];
      totalPropina.innerHTML = datos[1];
    } else {
      alert("Complete todos los campos");
    }
  });
});
botonPorcentaje.forEach((boton) => {
  boton.addEventListener("blur", () => {
    boton.classList.remove("clickeado");
  });
});
resetar.addEventListener("click", () => {
  location.reload();
});
