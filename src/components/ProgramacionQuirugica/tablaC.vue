<template>
  <div class="bg-gray-300 min-h-screen p-10 flex flex-col max-w-full mx-auto">
    <h1 class="font-bold text-3xl text-[#0F6466] mb-4">Registros de Cirugías</h1>

    <div class="w-full mb-4 flex justify-between items-center">
      <button @click="irACrearCirugia" class="bg-gray-500 text-white py-2 px-4 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium">
        Crear Cirugía
      </button>

      <div class="relative w-full max-w-md flex-grow ml-4">
        <input 
          v-model="busqueda" 
          @input="buscarCirugias" 
          type="text" 
          class="p-2 rounded-xl border border-gray-300 w-full pr-10" 
          placeholder="Buscar Cirugías..."
        />
        <span class="absolute inset-y-0 right-0 flex items-center px-3 bg-[#0F6466] text-white rounded-r-xl">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>

    <div class="w-full flex-grow overflow-x-auto">
      <table class="w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-2 border-b">Nombre</th>
            <th class="p-2 border-b">Descripción</th>
            <th class="p-2 border-b">Nivel de Urgencia</th>
            <th class="p-2 border-b">Horario</th>
            <th class="p-2 border-b">Observaciones</th>
            <th class="p-2 border-b">Consumible</th>
            <th class="p-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cirugia in cirugiasFiltradas" :key="cirugia.ID">
            <td class="p-2 border-b">{{ cirugia.Nombre }}</td>
            <td class="p-2 border-b">{{ cirugia.Descripcion }}</td>
            <td class="p-2 border-b">{{ cirugia.Nivel_Urgencia }}</td>
            <td class="p-2 border-b">{{ cirugia.Horario }}</td>
            <td class="p-2 border-b">{{ cirugia.Observaciones }}</td>
            <td class="p-2 border-b">{{ cirugia.Consumible }}</td>
            <td class="p-2 border-b text-center">
              <div class="flex space-x-2 justify-center">
                <button @click="editarCirugia(cirugia.ID)" class="bg-yellow-500 text-white py-1 px-2 rounded-xl hover:scale-105 duration-300 hover:bg-yellow-600">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button @click="eliminarCirugia(cirugia.ID)" class="bg-red-500 text-white py-1 px-2 rounded-xl hover:scale-105 duration-300 hover:bg-red-600">
                  <i class="fas fa-trash-alt"></i> Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cirugias: [],
      busqueda: '', // Variable para almacenar el texto de búsqueda
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IlByb2dyYW1hY2lvblEiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJwcm9ncmFtYWNpb25ALmdtYWlsIiwiQ29udHJhc2VuYSI6IlByb2dyYW1hY2lvblEiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6IjEyMzQ1Njc4OTkifQ.HgqCAey90hU2klU90K8yRs5HpyzFsCjXrK3CTx2oIjc' // Reemplaza con tu token real
    };
  },
  computed: {
    cirugiasFiltradas() {
      const searchTerm = this.busqueda.toLowerCase();
      return this.cirugias.filter(cirugia => {
        return (
          (cirugia.Nombre || '').toLowerCase().includes(searchTerm) ||
          (cirugia.Descripcion || '').toLowerCase().includes(searchTerm) ||
          (cirugia.Nivel_Urgencia || '').toLowerCase().includes(searchTerm) ||
          (cirugia.Horario || '').toLowerCase().includes(searchTerm) ||
          (cirugia.Observaciones || '').toLowerCase().includes(searchTerm) ||
          (cirugia.Consumible || '').toLowerCase().includes(searchTerm)
        );
      });
    }
  },
  created() {
    this.obtenerCirugias();
  },
  methods: {
    obtenerCirugias() {
      axios.get('https://renderbackend-dwke.onrender.com/cirugias/', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => {
        this.cirugias = response.data;
      })
      .catch(error => {
        console.error('Error al obtener las cirugías:', error);
      });
    },
    buscarCirugias() {
      // Método para buscar cirugías; se invoca automáticamente con v-model y @input en la barra de búsqueda
    },
    irACrearCirugia() {
      this.$router.push({ name: 'crearC' });
    },
    editarCirugia(id) {
      this.$router.push({ name: 'EditCirugia', params: { id } });
    },
    eliminarCirugia(id) {
      axios.delete(`https://renderbackend-dwke.onrender.com/cirugias/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(() => {
        this.obtenerCirugias();
      })
      .catch(error => {
        console.error('Error al eliminar la cirugía:', error);
      });
    }
  }
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.table {
  margin-bottom: 0;
}

.table thead th {
  background-color: #e5e7eb; /* Gris claro */
  color: #495057; /* Color del texto para mejor contraste */
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.bg-gray-300 {
  background-color: #e5e7eb;
}

.bg-gray-500 {
  background-color: #6b7280;
}

.bg-gray-500:hover {
  background-color: #4b5563;
}

.text-white {
  color: #ffffff;
}

.text-gray-300 {
  color: #d1d5db;
}

.table td {
  word-wrap: break-word; /* Ajustar el texto largo */
  max-width: 200px; /* Limitar el ancho máximo de las celdas */
}
</style>
