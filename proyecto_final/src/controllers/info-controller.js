import CpuInfo from "os";
const numCpus = CpuInfo.cpus().length;

class Controller {
  constructor() {}

  getInfo = async (req, res) => {
    try {
      const datos = {
        argumentos_de_entrada: process.argv.slice(2),
        nombre_del_sist_operativo: process.env.OS,
        version_de_node_js: process.versions.node,
        memoria_total_reservada: process.memoryUsage().rss,
        path_de_ejecucion: process.execPath,
        process_id: process.pid,
        carpeta_del_proyecto: process.cwd(),
        numero_de_procesadores: numCpus,
      };

      res.render("info", { layout: "info-layout", data: datos });
    } catch (err) {
      res.status(err.status || 500).json(err);
    }
  };
}

export const infoController = new Controller();
