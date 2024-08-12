<template>
    <div>
      <!-- Encabezado con estilos de Tailwind CSS -->
      <h1 class="text-2xl font-bold text-center text-gray-800 my-3">
        Estadística de Dirección General
      </h1>
  
      <!-- Contenedor para el contenido con espacio a la izquierda en pantallas grandes -->
      <div class="p-1 sm:ml-64">
        <!-- Vista del enrutador para componentes de página -->
        <router-view></router-view>
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