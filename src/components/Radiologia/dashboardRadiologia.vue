<template>
  <div class="p-4">
    <!-- Encabezado con estilos de Tailwind CSS -->
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
      Estadística de Estudios
    </h1>

    <!-- Contenedor para el contenido con espacio a la izquierda en pantallas grandes -->
    <div class="mb-6">
      <div class="p-2 sm:p-4">
        <!-- Vista del enrutador para componentes de página -->
        <router-view></router-view>
      </div>
    </div>

    <!-- Contenedor flexible para los gráficos -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Gráficos de la fila superior -->
      <div class="w-full">
        <dashCostos />
      </div>
      <div class="w-full">
        <dashEstatus />
      </div>
      
      <!-- Gráficos de la fila inferior -->
      <div class="w-full">
        <dasCostos2 />
      </div>
      <div class="w-full">
        <dasEstatus2 />
      </div>
    </div>
  </div>
</template>

<script>
// Importación del componente de gráfico
import dashCostos from './GraficosRD/dashCostos.vue';
import dashEstatus from './GraficosRD/dashEstatus.vue';
import dasCostos2 from './GraficosRD/dasCostos2.vue';
import dasEstatus2 from './GraficosRD/dasEstatus2.vue';

export default {
  components: {
    dashCostos,
    dashEstatus,
    dasCostos2,
    dasEstatus2,
  },
};
</script>
