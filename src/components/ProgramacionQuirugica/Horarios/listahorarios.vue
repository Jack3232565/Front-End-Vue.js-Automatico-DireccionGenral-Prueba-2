<template>
  <div class="bg-gray-300 min-h-screen p-10 flex flex-col max-w-full mx-auto">
    <h1 class="font-bold text-3xl text-[#0F6466] mb-4">Lista de Horarios</h1>

    <div class="w-full mb-4 flex justify-between items-center">
      <button @click="irACrearHorario" class="bg-gray-500 text-white py-2 px-4 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium">
        Crear Horario
      </button>

      <div class="relative w-full max-w-md flex-grow ml-4">
        <input 
          v-model="filtro" 
          @input="buscarHorarios" 
          type="text" 
          class="p-2 rounded-xl border border-gray-300 w-full pr-10" 
          placeholder="Buscar Horarios por Nombre..."
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
            <th class="p-2 border-b">Empleado ID</th>
            <th class="p-2 border-b">Nombre</th>
            <th class="p-2 border-b">Especialidad</th>
            <th class="p-2 border-b">Día de la Semana</th>
            <th class="p-2 border-b">Hora Inicio</th>
            <th class="p-2 border-b">Hora Fin</th>
            <th class="p-2 border-b">Turno</th>
            <th class="p-2 border-b">Nombre Departamento</th>
            <th class="p-2 border-b">Nombre Sala</th>
            <th class="p-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horario in horariosFiltrados" :key="horario.horario_id">
            <td class="p-2 border-b">{{ horario.horario_id }}</td>
            <td class="p-2 border-b">{{ horario.empleado_id }}</td>
            <td class="p-2 border-b">{{ horario.nombre }}</td>
            <td class="p-2 border-b">{{ horario.especialidad }}</td>
            <td class="p-2 border-b">{{ horario.dia_semana }}</td>
            <td class="p-2 border-b">{{ horario.hora_inicio }}</td>
            <td class="p-2 border-b">{{ horario.hora_fin }}</td>
            <td class="p-2 border-b">{{ horario.turno }}</td>
            <td class="p-2 border-b">{{ horario.nombre_departamento }}</td>
            <td class="p-2 border-b">{{ horario.nombre_sala }}</td>
            <td class="p-2 border-b text-center">
              <div class="flex space-x-2 justify-center">
                <button @click="editarHorario(horario.horario_id)" class="bg-yellow-500 text-white py-1 px-2 rounded-xl hover:scale-105 duration-300 hover:bg-yellow-600">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button @click="eliminarHorario(horario.horario_id)" class="bg-red-500 text-white py-1 px-2 rounded-xl hover:scale-105 duration-300 hover:bg-red-600">
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
      horarios: [],
      filtro: '',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IlByb2dyYW1hY2lvblEiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJwcm9ncmFtYWNpb25ALmdtYWlsIiwiQ29udHJhc2VuYSI6IlByb2dyYW1hY2lvblEiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6IjEyMzQ1Njc4OTkifQ.HgqCAey90hU2klU90K8yRs5HpyzFsCjXrK3CTx2oIjc'
    };
  },
  computed: {
    horariosFiltrados() {
      return this.horarios.filter(horario => {
        return horario.nombre.toLowerCase().includes(this.filtro.toLowerCase());
      });
    }
  },
  created() {
    this.obtenerHorarios();
  },
  methods: {
    obtenerHorarios() {
      axios.get('https://renderbackend-dwke.onrender.com/horarios/', {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => {
        this.horarios = response.data;
      })
      .catch(error => {
        console.error('Error al obtener los horarios:', error);
      });
    },
    irACrearHorario() {
      this.$router.push({ name: 'horarios' });
    },
    editarHorario(id) {
      this.$router.push({ name: 'EditarHorario', params: { id } });
    },
    eliminarHorario(id) {
      axios.delete(`https://renderbackend-dwke.onrender.com/horario/${id}/`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(() => {
        this.obtenerHorarios();
      })
      .catch(error => {
        console.error('Error al eliminar el horario:', error);
      });
    }
  }
};
</script>

<style scoped>
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
</style>
