<template>
    <div class="p-4">
      <!-- Encabezado con estilos de Tailwind CSS -->
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        Estadística de Dirección General
      </h1>
  
      <!-- Contenedor para el contenido con espacio a la izquierda en pantallas grandes -->
      <div class="mb-6">
        <div class="p-2 sm:p-4">
          <!-- Vista del enrutador para componentes de página -->
          <router-view></router-view>
        </div>
      </div>
  
      <!-- Componente de gráfico -->
      <GrficoApro />
    </div>
  </template>
  
  <script>
  // Importación del componente de gráfico
  import GrficoApro from './GraficosDG/GrficoApro.vue';
  
  export default {
    components: {
      GrficoApro
    }
  };
  </script>