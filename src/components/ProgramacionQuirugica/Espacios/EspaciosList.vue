<template>
  <div class="bg-gray-300 min-h-screen p-10 flex flex-col max-w-full mx-auto">
    <h1 class="font-bold text-3xl text-[#0F6466] mb-4">Lista de Espacios</h1>

    <div class="w-full mb-4 flex justify-between items-center">
      <button @click="irACrearEspacio" class="bg-gray-500 text-white py-2 px-4 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium">
        Crear Espacio
      </button>

      <div class="relative w-full max-w-md flex-grow ml-4">
        <input 
          v-model="filtro" 
          @input="buscarEspacios" 
          type="text" 
          class="p-2 rounded-xl border border-gray-300 w-full pr-10" 
          placeholder="Buscar Espacios por Nombre..."
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
            <th class="p-2 border-b">ID</th>
            <th class="p-2 border-b">Tipo</th>
            <th class="p-2 border-b">Nombre</th>
            <th class="p-2 border-b">Departamento</th>
            <th class="p-2 border-b">Estatus</th>
            <th class="p-2 border-b">Fecha Registro</th>
            <th class="p-2 border-b">Fecha Actualización</th>
            <th class="p-2 border-b">Capacidad</th>
            <th class="p-2 border-b">Espacio Superior ID</th>
            <th class="p-2 border-b">Espacio Colaboración</th>
            <th class="p-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="espacio in espaciosFiltrados" :key="espacio.ID">
            <td class="p-2 border-b">{{ espacio.ID }}</td>
            <td class="p-2 border-b">{{ espacio.Tipo }}</td>
            <td class="p-2 border-b">{{ espacio.Nombre }}</td>
            <td class="p-2 border-b">{{ espacio.Departamento_ID }}</td>
            <td class="p-2 border-b">{{ espacio.Estatus }}</td>
            <td class="p-2 border-b">{{ espacio.Fecha_Registro }}</td>
            <td class="p-2 border-b">{{ espacio.Fecha_Actualizacion }}</td>
            <td class="p-2 border-b">{{ espacio.Capacidad }}</td>
            <td class="p-2 border-b">{{ espacio.Espacio_superior_ID }}</td>
            <td class="p-2 border-b">{{ espacio.tbc_espacioscol }}</td>
            <td class="p-2 border-b text-center">
              <div class="flex space-x-2 justify-center">
                <button @click="editarEspacio(espacio.ID)" class="bg-yellow-500 text-white py-1 px-2 rounded-xl hover:scale-105 duration-300 hover:bg-yellow-600">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button @click="eliminarEspacio(espacio.ID)" class="bg-red-500 text-white py-1 px-2 rounded-xl hover:scale-105 duration-300 hover:bg-red-600">
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
      espacios: [],
      filtro: '',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IlByb2dyYW1hY2lvblEiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJwcm9ncmFtYWNpb25ALmdtYWlsIiwiQ29udHJhc2VuYSI6IlByb2dyYW1hY2lvblEiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6IjEyMzQ1Njc4OTkifQ.HgqCAey90hU2klU90K8yRs5HpyzFsCjXrK3CTx2oIjc'
    };
  },
  computed: {
    espaciosFiltrados() {
      return this.espacios.filter(espacio => {
        return espacio.Nombre.toLowerCase().includes(this.filtro.toLowerCase());
      });
    }
  },
  created() {
    this.obtenerEspacios();
  },
  methods: {
    obtenerEspacios() {
      axios.get('https://renderbackend-dwke.onrender.com/espacios/', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => {
        this.espacios = response.data;
      })
      .catch(error => {
        console.error('Error al obtener los espacios:', error);
      });
    },
    buscarEspacios() {
      // Este método se invoca automáticamente con v-model y @input en la barra de búsqueda
    },
    irACrearEspacio() {
      this.$router.push({ name: 'CrearEspacio' });
    },
    editarEspacio(id) {
      this.$router.push({ name: 'EditarEspacio', params: { id } });
    },
    eliminarEspacio(id) {
      axios.delete(`https://renderbackend-dwke.onrender.com/espacios/${id}/`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(() => {
        this.obtenerEspacios();
      })
      .catch(error => {
        console.error('Error al eliminar el espacio:', error);
      });
    }
  }
};
</script>

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.table {
  margin-bottom: 0;
}

.table thead th {
  background-color: #4a4c4d; /* Gris claro */
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
