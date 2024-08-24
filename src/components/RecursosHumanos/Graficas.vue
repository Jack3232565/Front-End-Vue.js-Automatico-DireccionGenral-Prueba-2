<template>
  <div>
    <v-chart :option="chartOptions1" style="width: 100%; height: 500px;" />
    <v-chart :option="chartOptions2" style="width: 100%; height: 500px;" />
    <v-chart :option="chartOptions3" style="width: 100%; height: 500px;" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import axios from 'axios';

// Registrar los componentes de ECharts que vamos a utilizar
use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

export default defineComponent({
  components: {
    'v-chart': VChart,
  },
  setup() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6ImpvbmEyMyIsIkNvcnJlb19FbGVjdHJvbmljbyI6InN0cmluZyIsIkNvbnRyYXNlbmEiOiIxMjM0IiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.uGxblZ3LX-pRNbXaGEAs41QWESPwqCIdHmBqokYgPIA'; // Reemplaza 'tu_token_aqui' con el token real

    const chartOptions1 = ref({
      title: {
        text: 'Distribución de Personal Médico por Tipo (Gráfico 1)',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Personal Médico',
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });

    const chartOptions2 = ref({
      title: {
        text: 'Distribución de Personal Médico por Turno (Gráfico 2)',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Turno',
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });

    const chartOptions3 = ref({
      title: {
        text: 'Distribución de Personal Médico por Estado (Gráfico 3)',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Estado',
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });


    onMounted(async () => {
  try {

    const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6Implc3MiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJzdHJpbmciLCJDb250cmFzZW5hIjoiMTIzIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.eulYRMRY3dI3pLCOX2Q35hlCTmUxSMYOvd2btfgFAeg'
    
    const [response1, response2, response3] = await Promise.allSettled([
      axios.get('http://127.0.0.1:8000/personal_medico/', {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get('https://privilegecare-deploy-gqmt.onrender.com/puestos_departamentos', {
        headers: { Authorization: `Bearer ${token2}` },
      }),
      axios.get('https://privilegecare-deploy-gqmt.onrender.com/areas_medicas', {
        headers: { Authorization: `Bearer ${token2}` },
      }),
    ]);

    if (response1.status === 'fulfilled') {
      const personalMedico = response1.value.data;
      const tipos = ["Médico", "Enfermero", "Administrativo", "Directivo", "Apoyo", "Residente", "Interno"];
      const tipoCounts = tipos.map(tipo => {
        const count = personalMedico.filter(persona => persona.Tipo === tipo).length;
        return { name: tipo, value: count };
      });
      chartOptions1.value.series[0].data = tipoCounts;
    } else {
      console.error('Error en la primera petición:', response1.reason);
    }

    if (response2.status === 'fulfilled') {
      const puestosDepartamentos = response2.value.data;
      const turnos = ["Mañana", "Tarde", "Noche"];
      const turnoCounts = turnos.map(turno => {
        const count = puestosDepartamentos.filter(puesto => puesto.Turno === turno).length;
        return { name: turno, value: count };
      });
      chartOptions2.value.series[0].data = turnoCounts;
    } else {
      console.error('Error en la segunda petición:', response2.reason);
    }

    if (response3.status === 'fulfilled') {
      const areasMedicas = response3.value.data;
      const estados = ["Activo", "Inactivo"];
      const estadoCounts = estados.map(estado => {
        const count = areasMedicas.filter(area => area.Estatus === estado).length;
        return { name: estado, value: count };
      });
      chartOptions3.value.series[0].data = estadoCounts;
    } else {
      console.error('Error en la tercera petición:', response3.reason);
    }

  } catch (error) {
    console.error('Error al ejecutar las peticiones:', error);
  }
});


    // onMounted(async () => {
    //   try {
    //     // Primera petición: Obtener personal médico por tipo
    //     const response1 = await axios.get('http://127.0.0.1:8000/personal_medico/', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     const personalMedico = response1.data;

    //     const tipos = [
    //       "Médico",
    //       "Enfermero",
    //       "Administrativo",
    //       "Directivo",
    //       "Apoyo",
    //       "Residente",
    //       "Interno",
    //     ];

    //     const tipoCounts = tipos.map(tipo => {
    //       const count = personalMedico.filter(persona => persona.Tipo === tipo).length;
    //       return {
    //         name: tipo,
    //         value: count,
    //       };
    //     });

    //     chartOptions1.value.series[0].data = tipoCounts;


    //     const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6Implc3MiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJzdHJpbmciLCJDb250cmFzZW5hIjoiMTIzIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.eulYRMRY3dI3pLCOX2Q35hlCTmUxSMYOvd2btfgFAeg'

    //     // Segunda petición: Obtener personal médico por turno
    //     const response2 = await axios.get('https://privilegecare-deploy-gqmt.onrender.com/puestos_departamentos', {
    //       headers: {
    //         Authorization: `Bearer ${token2}`,
    //       },
    //     });

    //     const puestosDepartamentos = response2.data;

    //     const turnos = ["Mañana", "Tarde", "Noche"];

    //     const turnoCounts = turnos.map(turno => {
    //       const count = puestosDepartamentos.filter(puesto => puesto.Turno === turno).length;
    //       return {
    //         name: turno,
    //         value: count,
    //       };
    //     });

    //     chartOptions2.value.series[0].data = turnoCounts;

    //     // Tercera petición: Obtener personal médico por estado (Activo/Inactivo)
    //     const response3 = await axios.get('https://privilegecare-deploy-gqmt.onrender.com/areas_medicas', {
    //       headers: {
    //         Authorization: `Bearer ${token2}`,
    //       },
    //     });

    //     const areasMedicas = response3.data;

    //     const estados = ["Activo", "Inactivo"];

    //     const estadoCounts = estados.map(estado => {
    //       const count = areasMedicas.filter(area => area.Estatus === estado).length;
    //       return {
    //         name: estado,
    //         value: count,
    //       };
    //     });

    //     chartOptions3.value.series[0].data = estadoCounts;

    //   } catch (error) {
    //     console.error('Error al obtener los datos:', error);
    //   }
    // });

    return {
      chartOptions1,
      chartOptions2,
      chartOptions3,
    };
  },
});
</script>
