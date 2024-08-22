<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4 font-weight-bold" style="font-size: 36px;">Dashboard de Cirugías</h1>
    
    <div class="row">
      <!-- Gráfico de Tipo de Cirugía -->
      <div class="col-md-6 mb-4">
        <canvas id="tipoCirugiaChart"></canvas>
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
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkJydW5vIiwiQ29ycmVvX0VsZWN0cm9uaWNvIjoic3RyaW5nIiwiQ29udHJhc2VuYSI6ImJydW5vIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.x2mprKqz7Af2HLrWycpWLlYqI9xtG9SWJOQ8Pgn4qqg', // Reemplaza con tu token real
    };
  },
  mounted() {
    this.obtenerCirugias();
  },
  methods: {
    obtenerCirugias() {
      fetch('http://127.0.0.1:8000/cirugias/', {
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
      const tipos = {};
      this.cirugias.forEach(cirugia => {
        tipos[cirugia.Tipo] = (tipos[cirugia.Tipo] || 0) + 1;
      });
      const tipoLabels = Object.keys(tipos);
      const tipoValues = Object.values(tipos);

      // Generar colores aleatorios para cada barra
      const tipoColors = tipoLabels.map(() => this.generarColorAleatorio());

      new Chart(document.getElementById('tipoCirugiaChart'), {
        type: 'bar',
        data: {
          labels: tipoLabels,
          datasets: [{
            label: 'Número de Cirugías por Tipo',
            data: tipoValues,
            backgroundColor: tipoColors, // Colores diferentes para cada barra
            borderColor: tipoColors, // Colores del borde de las barras
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

      new Chart(document.getElementById('nivelUrgenciaChart'), {
        type: 'bar',
        data: {
          labels: urgenciaLabels,
          datasets: [{
            label: 'Número de Cirugías por Nivel de Urgencia',
            data: urgenciaValues,
            backgroundColor: urgenciaColors, // Colores diferentes para cada barra
            borderColor: urgenciaColors, // Colores del borde de las barras
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
