<template>
    <div>
      <div class="container mt-4">
        <h1 class="text-center mb-4 font-weight-bold" style="font-size: 36px;">Dashboard de Espacios</h1>
        
        <div class="row">
          <!-- Gráfico de Capacidad de Espacios -->
          <div class="col-md-6 mb-4">
            <canvas id="capacidadEspacioChart"></canvas>
          </div>
          <!-- Gráfico de Estatus de Espacios -->
          <div class="col-md-6 mb-4">
            <canvas id="estatusEspacioChart"></canvas>
          </div>
        </div>
        
        <!-- Gráfico de Línea para Visualización de Capacidad -->
        <div class="row">
          <div class="col-md-12">
            <canvas id="lineChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        espacios: [],
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkJydW5vIiwiQ29ycmVvX0VsZWN0cm9uaWNvIjoic3RyaW5nIiwiQ29udHJhc2VuYSI6ImJydW5vIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.x2mprKqz7Af2HLrWycpWLlYqI9xtG9SWJOQ8Pgn4qqg', // Reemplaza con tu token real
      };
    },
    mounted() {
      this.obtenerEspacios();
    },
    methods: {
      obtenerEspacios() {
        fetch('http://127.0.0.1:8000/espacios/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
          })
          .then((data) => {
            this.espacios = data;
            this.crearGraficos();
          })
          .catch((error) => console.error('Error al obtener los datos:', error));
      },
  
      crearGraficos() {
        // Filtrar tipos únicos de espacios
        const tiposUnicos = [...new Set(this.espacios.map(espacio => espacio.Tipo))];
        const capacidades = tiposUnicos.map(tipo => {
          return this.espacios
            .filter(espacio => espacio.Tipo === tipo)
            .reduce((acc, curr) => acc + curr.Capacidad, 0);
        });
  
        const capacidadColors = capacidades.map(() => this.generarColorAleatorio());
  
        new Chart(document.getElementById('capacidadEspacioChart'), {
          type: 'bar',
          data: {
            labels: tiposUnicos,
            datasets: [{
              label: 'Capacidad de Espacios',
              data: capacidades,
              backgroundColor: capacidadColors,
              borderColor: capacidadColors,
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
  
        // Gráfico de Estatus de Espacios
        const estatuses = {};
        this.espacios.forEach(espacio => {
          estatuses[espacio.Estatus] = (estatuses[espacio.Estatus] || 0) + 1;
        });
        const estatusLabels = Object.keys(estatuses);
        const estatusValues = Object.values(estatuses);
  
        const estatusColors = estatusLabels.map(() => this.generarColorAleatorio());
  
        new Chart(document.getElementById('estatusEspacioChart'), {
          type: 'bar',
          data: {
            labels: estatusLabels,
            datasets: [{
              label: 'Número de Espacios por Estatus',
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
  
        // Gráfico de Línea para Capacidad de Espacios
        const ctx = document.getElementById('lineChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: tiposUnicos,
            datasets: [{
              label: 'Capacidad de Espacios',
              data: capacidades,
              fill: false,
              borderColor: '#42A5F5',
              tension: 0.1,
              pointBackgroundColor: '#42A5F5',
              pointBorderColor: '#1E88E5',
              pointRadius: 5
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
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
      }
    }
  };
  </script>
  
  <style>
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
  