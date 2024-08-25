<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4 font-weight-bold" style="font-size: 36px;">Dashboard de Cirugías</h1>
    
    <div class="row">
      <!-- Gráfico de Tipo de Cirugía -->
      <div class="col-md-6 mb-4">
        <canvas id="estatusCirugiaChart"></canvas>
      </div>
      <!-- Gráfico de Nivel de Urgencia -->
      <div class="col-md-6 mb-4">
        <canvas id="nivelUrgenciaChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      cirugias: [], // Datos de las cirugías
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IlByb2dyYW1hY2lvblEiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJwcm9ncmFtYWNpb25ALmdtYWlsIiwiQ29udHJhc2VuYSI6IlByb2dyYW1hY2lvblEiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6IjEyMzQ1Njc4OTkifQ.HgqCAey90hU2klU90K8yRs5HpyzFsCjXrK3CTx2oIjc', // Reemplaza con tu token real
      estatusCirugiaChart: null,
      nivelUrgenciaChart: null,
    };
  },
  mounted() {
    this.obtenerCirugias();
    // Actualizar cada 30 segundos (puedes ajustar el intervalo)
    setInterval(this.actualizarGraficos, 30000);
  },
  methods: {
    obtenerCirugias() {
      fetch('https://renderbackend-dwke.onrender.com/cirugias/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`, // Incluye el token en el encabezado
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        this.cirugias = data;
        this.crearGraficos(); // Crear gráficos después de obtener los datos
      })
      .catch(error => console.error('Error al obtener los datos:', error));
    },
    crearGraficos() {
      // Preparar datos para el gráfico de tipo de cirugía
      const estatus = {};
      this.cirugias.forEach(cirugia => {
        estatus[cirugia.Estatus] = (estatus[cirugia.Estatus] || 0) + 1;
      });
      const estatusLabels = Object.keys(estatus);
      const estatusValues = Object.values(estatus);

      // Generar colores aleatorios para cada barra
      const estatusColors = estatusLabels.map(() => this.generarColorAleatorio());

      this.estatusCirugiaChart = new Chart(document.getElementById('estatusCirugiaChart'), {
        type: 'bar',
        data: {
          labels: estatusLabels,
          datasets: [{
            label: 'Número de Cirugías por Estatus',
            data: estatusValues,
            backgroundColor: estatusColors,
            borderColor: estatusColors,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                }
              }
            }
          }
        }
      });

      // Preparar datos para el gráfico de nivel de urgencia
      const urgencias = {};
      this.cirugias.forEach(cirugia => {
        urgencias[cirugia.Nivel_Urgencia] = (urgencias[cirugia.Nivel_Urgencia] || 0) + 1;
      });
      const urgenciaLabels = Object.keys(urgencias);
      const urgenciaValues = Object.values(urgencias);

      // Generar colores aleatorios para cada barra
      const urgenciaColors = urgenciaLabels.map(() => this.generarColorAleatorio());

      this.nivelUrgenciaChart = new Chart(document.getElementById('nivelUrgenciaChart'), {
        type: 'bar',
        data: {
          labels: urgenciaLabels,
          datasets: [{
            label: 'Número de Cirugías por Nivel de Urgencia',
            data: urgenciaValues,
            backgroundColor: urgenciaColors,
            borderColor: urgenciaColors,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                }
              }
            }
          }
        }
      });
    },
    actualizarGraficos() {
      this.obtenerCirugias();
      if (this.estatusCirugiaChart) {
        this.estatusCirugiaChart.destroy();
      }
      if (this.nivelUrgenciaChart) {
        this.nivelUrgenciaChart.destroy();
      }
      this.crearGraficos();
    },
    generarColorAleatorio() {
      // Genera un color aleatorio en formato RGB
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
};
</script>

<style>
/* Estilos para el dashboard */
.container {
  max-width: 1200px;
}

h1 {
  font-size: 36px;
}

canvas {
  width: 100% !important;
  height: auto !important;
}
</style>
