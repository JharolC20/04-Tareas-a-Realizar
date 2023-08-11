import colors from 'colors';
import { inquirerMenu,leerInput,pausa,listadoTareasBorrar,confirmar,mostrarListadoChecklist } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import {Tareas} from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
 

 
const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const tareasDB= leerDB();
  if (tareasDB) {// cargar tareas
   tareas.cargarTareasfromArray(tareasDB);
  }
  //await pausa();
  do {
    //Imprime el menu
     opt = await inquirerMenu();
     switch (opt) {
      case '1':
          const desc = await leerInput('Descripcion: ');
          //console.log(desc)
          tareas.crearTarea(desc);  
        break;
     
      case '2':
          tareas.listadoCompleto();
        break;

      case '3'://listar Completado
          tareas.listarPendientesCompletadas(true);
        break;

      case '4'://listar Pendiente
          tareas.listarPendientesCompletadas(false);
          break;
      case '5'://completado|pendiente
          const ids =await mostrarListadoChecklist(tareas.listadoArr);
          tareas.toggleCompletadas(ids);
          break;
      case '6'://eliminar tareas
          const id =await listadoTareasBorrar(tareas.listadoArr);
          if (id!=='0') {
            const ok = await confirmar('¿Estas Seguro?');
              if (ok) {
              tareas.borrarTareas(id);
              console.log(`Tarea ${id} : Borrada`);
              }
          
          }
          
          break;
     }
     guardarDB(tareas.listadoArr);
    //console.log({opt});

     await pausa();
  } while (opt !== '0');
};
 
main();