// GENERAR N NUMEROS ALEATORIOS EN UN RANGO DE 1 A 1000 Y ESCRIBIR CUANTAS VECES SE REPITE EL NUMERO
function num_aleatorios_rango_repeticion(n = 100) {
  let numeros_generados = [];
  let numeros_sin_repetidos = [];
  let contador_de_repeticiones = [];
  for (let i = 0; i < n; i++) {
    numeros_generados.push(Math.floor(Math.random() * 1000) + 1);
  }
  for (let i = 0; i < numeros_generados.length; i++) {
    if (numeros_sin_repetidos.includes(numeros_generados[i])) {
      contador_de_repeticiones[numeros_sin_repetidos.indexOf(numeros_generados[i])]++;
    } else {
      numeros_sin_repetidos.push(numeros_generados[i]);
      contador_de_repeticiones.push(1);
    }
  }
  console.log("numeros_generados:", numeros_generados);
  // console.log("numeros_sin_repetidos:", numeros_sin_repetidos);

  // console.log("NUM CON CONTADOR:", contador_de_repeticiones);

  let obj = {};
  for (let i = 0; i < numeros_sin_repetidos.length; i++) {
    obj[numeros_sin_repetidos[i]] = contador_de_repeticiones[i];
  }
  console.log("LENGHT OBJ:", Object.keys(obj).length);
  console.log("OBJETO ARMADO", obj);
  let total_repeticiones = numeros_generados.length - Object.keys(obj).length;
  console.log("TOTAL REPETICIONES", total_repeticiones);
  return obj;
}

process.on("exit", () => {
  console.log(`worker #${process.pid} cerrado`);
});

process.on("message", (msg) => {
  console.log(`worker #${process.pid} iniciando su tarea`);
  const obj = num_aleatorios_rango_repeticion();
  process.send(obj);
  console.log(`worker #${process.pid} finalizó su trabajo`);
  process.exit();
});

process.send("listo");
