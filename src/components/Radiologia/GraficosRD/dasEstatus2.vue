<template>
    <div style="height: 400px; width: 600px;">
      <h1 class="text-1xl font-bold text-center text-gray-800 my-6">
        Cantidad de Resultados Estudios por Fecha de Registro
      </h1>
      <v-chart :option="chartOptions" style="height: 400px; width: 600px;"></v-chart>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent, LegendComponent, DataZoomComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import axios from 'axios';
  
  use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, DataZoomComponent]);
  
  export default defineComponent({
    name: 'EstudiosPorFechaChart',
    components: { VChart },
    setup() {
      const chartOptions = ref(null);
  
      const fetchData = async () => {
        try {
          const response = await axios.get('https://privilegecare-deploy-gqmt.onrender.com/resultados_estudios/', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const data = response.data;
  
          // Contar estudios por fecha de registro
          const estudiosPorFecha = data.reduce((acc, item) => {
            const fecha = item.Fecha_Registro.split('T')[0]; // Obtener solo la fecha (sin hora)
            if (!acc[fecha]) {
              acc[fecha] = 0;
            }
            acc[fecha]++;
            return acc;
          }, {});
  
          const xAxisData = Object.keys(estudiosPorFecha).sort(); // Ordenar fechas
          const seriesData = xAxisData.map(fecha => estudiosPorFecha[fecha]);
  
          // Configuración del gráfico
          chartOptions.value = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            xAxis: {
              type: 'category',
              data: xAxisData,
              axisLabel: {
                fontSize: 10,
                rotate: 45, // Rotar etiquetas para mejor legibilidad
              }
            },
            yAxis: {
              type: 'value'
            },
            dataZoom: [
              {
                type: 'inside'
              },
              {
                type: 'slider'
              }
            ],
            series: [
              {
                name: 'Cantidad de Estudios',
                type: 'line',
                data: seriesData,
                smooth: true,
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}'
                },
                itemStyle: {
                  color: 'teal'
                },
                lineStyle: {
                  width: 2
                }
              }
            ]
          };
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      onMounted(() => {
        fetchData();
      });
  
      return {
        chartOptions,
      };
    },
  });
  </script>
  