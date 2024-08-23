<template>
  <div style="height: 400px; width: 600px;">
    <h1 class="text-1xl font-bold text-center text-gray-800 my-6">
      Comparación de Costos Totales por Tipo de Estudio
    </h1>
    <v-chart :option="chartOptions" style="height: 400px; width: 600px;"></v-chart>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import axios from 'axios';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent]);

export default defineComponent({
  name: 'CostosTotalesChart',
  components: { VChart },
  setup() {
    const chartOptions = ref(null);

      
    const fetchData = async () => {
      try {
        const response = await axios.get('https://privilegecare-deploy-gqmt.onrender.com/estudios/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        const data = response.data;

        // Sumar costos por tipo de estudio
        const costosPorTipo = data.reduce((acc, item) => {
          if (!acc[item.Tipo]) {
            acc[item.Tipo] = 0;
          }
          acc[item.Tipo] += parseFloat(item.Total_Costo);
          return acc;
        }, {});

        const xAxisData = Object.keys(costosPorTipo);
        const seriesData = Object.values(costosPorTipo);

        // Configuración del gráfico
        chartOptions.value = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
              fontSize: 8,
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Total Costo',
              type: 'bar',
              data: seriesData,
              label: {
                show: true,
                position: 'top',
                formatter: '{c}'
              },
              itemStyle: {
                color: 'green'
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