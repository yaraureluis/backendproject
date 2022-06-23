// GENERAR N NUMEROS ALEATORIOS EN UN RANGO DE 1 A 1000 Y ESCRIBIR CUANTAS VECES SE REPITE EL NUMERO
function num_aleatorios_rango_repeticion(n = 100) {
  let num = [];
  let num_rep = [];
  let num_rep_cont = [];
  for (let i = 0; i < n; i++) {
    num.push(Math.floor(Math.random() * 1000) + 1);
  }
  for (let i = 0; i < num.length; i++) {
    if (num_rep.includes(num[i])) {
      num_rep_cont[num_rep.indexOf(num[i])]++;
    } else {
      num_rep.push(num[i]);
      num_rep_cont.push(1);
    }
  }
  console.log("NUM:", num);
  // console.log("NUM_rep:", num_rep);

  // console.log("NUMEROS CON CONTADOR:", num_rep_cont);

  // hacer objeto con num_rep = num_rep_cont
  let obj = {};
  for (let i = 0; i < num_rep.length; i++) {
    obj[num_rep[i]] = num_rep_cont[i];
  }
  console.log("LENGHT OBJ:", Object.keys(obj).length);
  console.log("OBJETO ARMADO", obj);
  let total_repeticiones = num.length - Object.keys(obj).length;
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
