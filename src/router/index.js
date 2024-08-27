import { createRouter, createWebHistory } from 'vue-router';
import RegisterUser from '@/components/registerUser.vue';
import LoginView from '@/components/login.vue';
import DashboardView from '@/components/dashboard.vue';
import PersonasView from '@/components/personas.vue';
import UsuarioView from '@/components/usuario.vue';
import PiePaginaView from '@/components/pie-pagina.vue';

//Direccion General
import AprobacionSM from '../components/DireccionGeneral/AprobacionSM.vue';
import UsuarioRoles from '@/components/DireccionGeneral/UsuarioRoles.vue';
import Roles from '@/components/DireccionGeneral/Roles.vue';
import Bitacora from '@/components/DireccionGeneral/Bitacora.vue';
import RolesModal from '@/components/DireccionGeneral/RolesModal.vue';
import AprobacionModal from '@/components/DireccionGeneral/AprobacionModal.vue';
import UsuarioRolesModal from '@/components/DireccionGeneral/UsuarioRolesModal.vue';
import GraficosDireccionG from '../components/DireccionGeneral/GraficosDireccionG.vue';
import GrficoApro from '@/components/DireccionGeneral/GraficosDG/GrficoApro.vue';
import GrficoRoles from '@/components/DireccionGeneral/GraficosDG/GrficoRoles.vue'

//import del area programacion quirurgica
import tablaC from '@/components/ProgramacionQuirugica/Cirugias/tablaC.vue';
import GraficasC from '@/components/ProgramacionQuirugica/Cirugias/graficasC.vue';
import CrearC from '@/components/ProgramacionQuirugica/Cirugias/CrearC.vue';
import EditCirugia from '@/components/ProgramacionQuirugica/Cirugias/editarC.vue';


//Espacios
import CrearEspacio from '@/components/ProgramacionQuirugica/Espacios/CrearEspacio.vue';
import EditarEspacio from '@/components/ProgramacionQuirugica/Espacios/EditarEspacio.vue';
import EspaciosList from '@/components/ProgramacionQuirugica/Espacios/EspaciosList.vue';
import espaciosGraficas from '@/components/ProgramacionQuirugica/Espacios/espaciosGraficas.vue';

//Horarios
import edithorario from '@/components/ProgramacionQuirugica/Horarios/edithorario.vue';
import horarios from '@/components/ProgramacionQuirugica/Horarios/horarios.vue';
import listahorarios from '@/components/ProgramacionQuirugica/Horarios/listahorarios.vue';



// Farmacia
import tablaMedic from '@/components/Farmacia/tablamedicamentos.vue';
import medicamentos from '@/components/Farmacia/medicamentos.vue';
import LotesMed from '@/components/Farmacia/LotesMed.vue';
import tablaLotes from '@/components/Farmacia/tablalotes.vue';
import ConsumiblesView from '@/components/Farmacia/consumibles.vue';
import tablaCon from '@/components/Farmacia/tablaconsumibles.vue';
import dispensacionView from '@/components/Farmacia/dispensacion.vue'
import tablaDis from '@/components/Farmacia/tabladispensacion.vue'
import graficos from '@/components/Farmacia/graficos.vue'

// Transplantes
import OrganForm from '@/components/Transplantes/OrganForm.vue';
import RequestView from '@/components/Transplantes/RequestTransplant.vue';
import TableRView from '@/components/Transplantes/TableRequest.vue';
import UpdateRView from '@/components/Transplantes/UpdateRequest.vue';
import OrgansView from '@/components/Transplantes/Organs.vue';
import GraficasView from '@/components/Transplantes/Graficas.vue'

// Radiologia
import ResultadosEstudioView from '@/components/Radiologia/resultadosEstudio.vue';
import EstudioView from '@/components/Radiologia/estudio.vue';
import dashboardRadiologiaView from '@/components/Radiologia/dashboardRadiologia.vue';

// // Recursos Humanos
import PersonalMedico from '@/components/RecursosHumanos/PersonalMedico.vue';
import GraficasRH from  '@/components/RecursosHumanos/Graficas.vue';
import AreasMedicas from '@/components/RecursosHumanos/AreasMedicas.vue'
import Puestos from '@/components/RecursosHumanos/Puesto.vue'
import PuestosDepartamentos from '@/components/RecursosHumanos/PuestosDepartamentos.vue'

// Pediatria
import Nacimientos from '@/components/Pediatria/Nacimientos.vue'
import RegistroNacimiento from '@/components/Pediatria/RegistroNacimiento.vue'
import EditPediatria from '@/components/Pediatria/EditPediatria.vue';
import TablaVacunas from '@/components/Pediatria/TablaVacunas.vue'
import VacunasForm from '@/components/Pediatria/VacunasForm.vue'
import Grafica1 from '@/components/Pediatria/Grafica1.vue';
import Grafica2 from '@/components/Pediatria/Grafica2.vue';

// Registros Medicos
import citas from '@/components/RegistroMedico/citas.vue'
import expedientes from '@/components/RegistroMedico/expedientesM.vue'
import recetaMedica from '@/components/RegistroMedico/recetaMedica.vue'
import expedienteEdit from '@/components/RegistroMedico/expedientesEdit.vue'
import CitasEdit from '@/components/RegistroMedico/citasEdit.vue'
import recetaEdit from '@/components/RegistroMedico/recetasEdit.vue'
import Graficas from '@/components/RegistroMedico/graficas.vue'



const roleMap = {
  1: 'Administrativo',
  8: 'Direccion General',
  9: 'Paciente',
  10: 'Médico General',
  11: 'Médico Especialista',
  12: 'Enfermero',
  13: 'Familiar del Paciente',
  14: 'Medico Forence',
  15: 'Recursos Humanos',
  16: 'Farmacia',
  17: 'Trasplantes',
  18: 'Programacion Quirurgica',
  19: 'Estudios',
  20: 'Registros Médicos',
  21: 'Pediatría',
  22: 'Radiologia',
  // Añade más roles según sea necesario
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUser
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      children: [
        {
          path: 'personas',
          name: 'personas',
          component: PersonasView,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: 'usuario',
          name: 'usuario',
          component: UsuarioView,
          meta: { requiresRole: ['Direccion General','Administrativo' ] }
        },
        {
          path: 'pie-pagina',
          name: 'piePagina',
          component: PiePaginaView
        },

        // Direccion General
        {
          path: '/aprobacionSM',
          name: 'aprobacionSM',
          component: AprobacionSM,
          meta: { requiresRole: ['Administrativo', 'Direccion General', 'Recursos Humanos'] }
        },
        {
          path: '/usuarioRoles',
          name: 'usuarioRoles',
          component: UsuarioRoles,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/rolesModal',
          name: 'rolesModal',
          component: RolesModal,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/aprobacionModal',
          name: 'aprobacionModal',
          component: AprobacionModal,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/usuarioRolesModal',
          name: 'usuarioRolesModal',
          component: UsuarioRolesModal,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/gradicosDG',
          name: 'graficosDG',
          component: GraficosDireccionG,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/grafApro',
          name: 'grafApro',
          component: GrficoApro,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/grafRoles',
          name: 'grafRoles',
          component: GrficoRoles,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/bitacora',
          name: 'bitacora',
          component: Bitacora,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },

        //Farmacia
        {
          path: '/tablamedic',
          name: 'tablamedicamentos',
          component: tablaMedic,
          meta: { requiresRole: ['Administrativo','Farmacia'] }
        },
        {
          path: '/medicament',
          name: 'medicamentos',
          component: medicamentos,
          meta: { requiresRole: ['Administrativo','Farmacia'] }
        },
        {
          path: '/lotes',
          name: 'lotesmed',
          component: LotesMed,
          meta: { requiresRole: ['Administrativo','Farmacia'] }
        },
        {
          path: '/tablalot',
          name: 'tablalotes',
          component: tablaLotes,
          meta: { requiresRole: ['Administrativo','Farmacia'] }
        },
        {
          path: '/consumibles',
          name: 'consumibles',
          component: ConsumiblesView,
          meta: { requiresRole: ['Administrativo','Farmacia'] }
        },
        {
          path: '/tablacon',
          name: 'tablaconsumibles',
          component: tablaCon,
          meta: { requiresRole: ['Administrativo','Farmacia'] }
        },
        {
          path: '/dispensation',
          name: 'dispensacion',
          component: dispensacionView,
          meta: { requiresRole: ['Administrativo','Farmacia'] }
        },
        {
          path: '/tabladis',
          name: 'tabladis',
          component: tablaDis,
          meta: { requiresRole: ['Administrativo','Farmacia'] }
        },
        {
          path: '/graficos',
          name: 'graficas',
          component: graficos,
          meta: { requiresRole: ['Administrativo','Farmacia'] }
        },

        
        // Transplantes
        {
          path: '/requestTansplant',
          name: 'requestTansplant',
          component: RequestView,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/TableTransplante',
          name: 'TableTransplante',
          component: TableRView,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/UpdateTransplante/:id',
          name: 'UpdateTransplante',
          component: UpdateRView,
          props: true,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/organos',
          name: 'organos',
          component: OrgansView,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/organform',
          name: 'organform',
          component: OrganForm,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },
        {
          path: '/graficosOr',
          name: 'graficosOr',
          component: GraficasView,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },

        // Radiologia
        {
          path: '/resultadosEstudio',
          name: 'resultadosEstudio',
          component: ResultadosEstudioView,
          meta: { requiresRole: ['Administrativo','Medico General', 'Medico Especialista'] }
        },
        {
          path: '/estudio',
          name: 'estudio',
          component: EstudioView,
          meta: { requiresRole: ['Administrativo','Radiologia','Medico General', 'Medico Especialista'] }
        },
        {
          path: '/dashboardRadiologia',
          name: 'dashboardRadiologia',
          component: dashboardRadiologiaView,
          meta: { requiresRole: ['Administrativo','Radiologia','Medico General', 'Medico Especialista'] }
        },

        
        // Recursos Humanos
        {
          path: '/personalMedico',
          name: 'personalMedico',
          component: PersonalMedico,
          meta: { requiresRole: ['Direccion General', 'Administrativo'] }
        },
        {
          path: '/GraficasRH',
          name: 'GraficasRH',
          component: GraficasRH,
          meta: { requiresRole: ['Direccion General', 'Administrativo'] }
        },
        {
          path: '/areasMedicas',
          name: 'areasMedicas',
          component: AreasMedicas,
          meta: { requiresRole: ['Direccion General', 'Administrativo'] }
        },
        {
          path: '/puestos',
          name: 'puestos',
          component: Puestos,
          meta: { requiresRole: ['Direccion General', 'Administrativo'] }
        },
        {
          path: '/puestosDepartamentos',
          name: 'puestosDepartamentos',
          component: PuestosDepartamentos,
          meta: { requiresRole: ['Direccion General', 'Administrativo'] }
        },
              

        {
          path: '/bitacora',
          name: 'bitacora',
          component: Bitacora,
          meta: { requiresRole: ['Administrativo', 'Direccion General'] }
        },

        // Pediatria
        {
          path: '/registroNacimiento',
          name: 'RegistroNacimiento',
          component: RegistroNacimiento,
          meta: { requiresRole: ['Administrativo','Pediatría'] }
        },
        {
          path: '/nacimientos',
          name: 'Nacimientos',
          component: Nacimientos,
          meta: { requiresRole: ['Administrativo','Pediatría'] }
        },
        {
          path: '/editar/:id',  
          name: 'editar',
          component: EditPediatria,
          props: true, 
          meta: { requiresRole: ['Administrativo','Pediatría'] }
        },
        {
          path: '/vacunas/:id',
          name: 'VacunasForm',
          component: VacunasForm,
          props: true,
          meta: { requiresRole: ['Administrativo','Pediatría'] }// Componente de error 404
        },
        {
          path: '/tvacunas/:id',
          name: 'TablaVacunas',
          component: TablaVacunas,
          props: true,
          meta: { requiresRole: ['Administrativo','Pediatría'] }
        },
        {
          path: '/grafica1',
          name: 'Grafica1',
          component: Grafica1,
          meta: { requiresRole: ['Administrativo','Pediatría'] }
        },
        {
          path: '/grafica2',
          name: 'Grafica2',
          component: Grafica2,
          meta: { requiresRole: ['Administrativo','Pediatría'] }
        },


      // Programacion quirurgica
        {path:"/tablac",
        name:"tablac",
        component:tablaC,
        meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica']}
        },

        {path:"/graficasC",
        name:"graficasC",
        component:GraficasC, 
        meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica'] }
        },

        {path:"/crearC",
        name:"crearC",
        component:CrearC, 
        meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica'] }
        },
        {path:"/editarC/:id",
        name:"EditCirugia",
        component: EditCirugia,  
        meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica'] }
        },
        {path:"/CrearEspacio",
        name:"CrearEspacio",
        component: CrearEspacio,
        meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica'] }
        },
        {path:"/EditarEspacio/:id",
          name:"EditarEspacio",
          component: EditarEspacio,
          meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica'] }
        }, 
        {path:"/EspaciosList",
          name:"EspaciosList",
          component: EspaciosList,
          meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica'] }
        },
        {path:"/espaciosGraficas",
          name:"espaciosGraficas",
          component: espaciosGraficas,
          meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica'] }
        },
        {path:"/horarios",
          name:"horarios",
          component: horarios,
          meta: { requiresRole: ['Administrativo', 'Direccion General', 'Programacion Quirurgica']}
        },
        {path:"/edithorario/:id",
          name:"edithorario",
          component: edithorario,
          meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica']}
        },
        {path:"/listahorarios",
          name:"listahorarios",
          component: listahorarios,
          meta: { requiresRole:  ['Administrativo', 'Direccion General', 'Programacion Quirurgica'] }
        },

        {
          path:'/graficas', 
          name: 'Graficas', 
          component: Graficas,
          meta: { requiresRole:  ['Registros Médicos', 'Medico Especialista', 'Direccion General','Administrativo']}
        },

        {
          path:'/citas', 
          name:'citas', 
          component:citas,
          meta: { requiresRole:  ['Registros Médicos', 'Medico Especialista', 'Direccion General','Administrativo']}
        },

        {
          path:'/expediente', 
          name:'expediente',
          component:expedientes,
          meta: { requiresRole:  ['Registros Médicos', 'Medico Especialista', 'Direccion General','Administrativo']}
        },
        {
          path:'/receta', 
          name:'receta', 
          component: recetaMedica,
          meta: { requiresRole:  ['Registros Médicos', 'Medico Especialista', 'Direccion General','Administrativo']}
        },
        {
          path: '/editar/:id', 
          name: 'editar',
          component: CitasEdit,
          props: true,
          meta: { requiresRole:  ['Registros Médicos', 'Medico Especialista', 'Direccion General','Administrativo']}
        },
        {
          path: '/editarE/:id',  
          name: 'editarE',
          component: expedienteEdit,
          props: true,
          meta: { requiresRole:  ['Registros Médicos', 'Medico Especialista', 'Direccion General','Administrativo']}
        },
        {
          path: '/editarR/:id',  
          name: 'editarR',
          component: recetaEdit,
          props: true,
          meta: { requiresRole:  ['Registros Médicos', 'Medico Especialista', 'Direccion General','Administrativo']}
        }
      ]
    }
  ]
});

// Guardias de navegación para verificar el rol del usuario
router.beforeEach((to, from, next) => {
  const userRoleId = localStorage.getItem('role');  // Obtén el rol como número
  const userRole = roleMap[userRoleId];  // Convierte el número a nombre usando el mapa
  
  if (to.meta.requiresRole && userRole) {
    if (to.meta.requiresRole.includes(userRole)) {
      next();
    } else {
      alert("Rol Sin Privilegios");  // Muestra un mensaje de alerta
      next({ name: 'login' });  // Redirige al login si el rol no es adecuado
      
    }
  } else {
    next();
  }
});

export default router;
