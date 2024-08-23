<template>
    <div>
      <v-chart :option="chartOptions" style="width: 100%; height: 500px;" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import { use } from 'echarts/core';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  import VChart from 'vue-echarts';
  
  use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);
  
  export default defineComponent({
    components: {
      'v-chart': VChart,
    },
    setup() {
      const chartOptions = ref({
        title: {
          text: 'Distribución de Estatus de Estudios',
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
            name: 'Estatus',
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
          // Obtener los datos de los estudios
          const response = await fetch('https://privilegecare-deploy-gqmt.onrender.com/estudios/?skip=0&limit=10', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
              ,
              'accept': 'application/json'
            }
          });
          const estudios = await response.json();
  
          // Contar cuántos estudios hay por cada estatus
          const estatusCounts = estudios.reduce((acc, estudio) => {
            acc[estudio.Estatus] = (acc[estudio.Estatus] || 0) + 1;
            return acc;
          }, {});
  
          const totalEstudios = estudios.length;
  
          // Crear los datos para el gráfico con los porcentajes
          const chartData = Object.keys(estatusCounts).map(estatus => ({
            name: estatus,
            value: ((estatusCounts[estatus] / totalEstudios) * 100).toFixed(2), // Convertir a porcentaje y redondear
          }));
  
          // Configurar los datos del gráfico
          chartOptions.value.series[0].data = chartData;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      });
  
      return {
        chartOptions,
      };
    },
  });
  </script>
  
    