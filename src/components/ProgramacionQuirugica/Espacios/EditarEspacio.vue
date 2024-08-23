<template>
  <div class="bg-gray-300 rounded-2xl p-10 flex flex-col items-center max-w-4xl w-full mx-auto">
    <h1 class="font-bold text-3xl text-[#0F6466] mb-4">Editar Espacio</h1>
    <form @submit.prevent="editarEspacio" class="w-full">
      <!-- Campos del formulario -->
      <div class="mb-4">
        <label for="tipo" class="block text-gray-700 font-medium mb-1">Tipo</label>
        <select v-model="espacio.Tipo" class="p-2 rounded-xl border border-gray-300 w-full" id="tipo" required>
          <option v-for="(tipo, index) in tipos" :key="index" :value="tipo">
            {{ tipo }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="nombre" class="block text-gray-700 font-medium mb-1">Nombre</label>
        <input v-model="espacio.Nombre" type="text" class="p-2 rounded-xl border border-gray-300 w-full" id="nombre" required>
      </div>
      <div class="mb-4">
        <label for="departamento" class="block text-gray-700 font-medium mb-1">Departamento ID</label>
        <input v-model.number="espacio.Departamento_ID" type="number" class="p-2 rounded-xl border border-gray-300 w-full" id="departamento" required>
      </div>
      <div class="mb-4">
        <label for="estatus" class="block text-gray-700 font-medium mb-1">Estatus</label>
        <select v-model="espacio.Estatus" class="p-2 rounded-xl border border-gray-300 w-full" id="estatus" required>
          <option v-for="(estatus, index) in estatuses" :key="index" :value="estatus">
            {{ estatus }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="capacidad" class="block text-gray-700 font-medium mb-1">Capacidad</label>
        <input v-model.number="espacio.Capacidad" type="number" class="p-2 rounded-xl border border-gray-300 w-full" id="capacidad">
      </div>
      <div class="mb-4">
        <label for="espacioSuperior" class="block text-gray-700 font-medium mb-1">Espacio Superior ID</label>
        <input v-model.number="espacio.Espacio_superior_ID" type="number" class="p-2 rounded-xl border border-gray-300 w-full" id="espacioSuperior">
      </div>
      <div class="mb-4">
        <label for="tbcEspacioscol" class="block text-gray-700 font-medium mb-1">Espacio Colaboración</label>
        <input v-model="espacio.tbc_espacioscol" type="text" class="p-2 rounded-xl border border-gray-300 w-full" id="tbcEspacioscol">
      </div>
      
      <div class="flex justify-end space-x-4">
        <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded-xl hover:scale-105 duration-300 hover:bg-green-600">Actualizar</button>
        <button type="button" @click="cancelar" class="bg-gray-500 text-white py-2 px-4 rounded-xl hover:scale-105 duration-300 hover:bg-gray-600">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      espacio: {
        Tipo: '',
        Nombre: '',
        Departamento_ID: null,
        Estatus: '',
        Capacidad: null,
        Espacio_superior_ID: null,
        tbc_espacioscol: ''
      },
      tipos: [
        'Consultorio', 'Laboratorio', 'Quirófano', 'Sala de Espera', 'Edificio', 
        'Estacionamiento', 'Habitación', 'Cama', 'Sala Maternidad', 'Cunero', 
        'Anfiteatro', 'Oficina', 'Sala de Juntas', 'Auditorio', 'Cafeteria', 
        'Capilla', 'Farmacia', 'Ventanilla', 'Recepción', 'Piso'
      ],
      estatuses: [
        'Activo', 'Inactivo', 'En remodelación', 'Clausurado', 'Reubicado', 'Temporal'
      ],
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkJydW5vIiwiQ29ycmVvX0VsZWN0cm9uaWNvIjoic3RyaW5nIiwiQ29udHJhc2VuYSI6ImJydW5vIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.x2mprKqz7Af2HLrWycpWLlYqI9xtG9SWJOQ8Pgn4qqg' // Asegúrate de usar un token válido
    };
  },
  mounted() {
    this.obtenerEspacio();
  },
  methods: {
    obtenerEspacio() {
      const id = this.$route.params.id; // Suponiendo que el ID está en los parámetros de la ruta
      axios.get(`http://127.0.0.1:8000/espacios/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => {
        this.espacio = response.data;
      })
      .catch(error => {
        console.error('Error al obtener el espacio:', error.response ? error.response.data : error.message);
      });
    },
    editarEspacio() {
      const id = this.$route.params.id; // Suponiendo que el ID está en los parámetros de la ruta
      axios.put(`http://127.0.0.1:8000/espacios/${id}`, this.espacio, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Espacio actualizado:', response.data);
        this.$router.push({ name: 'EspaciosList' });
      })
      .catch(error => {
        console.error('Error al actualizar el espacio:', error.response ? error.response.data : error.message);
      });
    },
    cancelar() {
      this.$router.push({ name: 'EspaciosList' });
    }
  }
};
</script>
