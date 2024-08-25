<template>
  <div class="bg-gray-300 min-h-screen p-10 flex flex-col max-w-full mx-auto">
    <h1 class="font-bold text-3xl text-[#0F6466] mb-4">{{ isEdit ? 'Editar Horario' : 'Crear Horario' }}</h1>

    <form @submit.prevent="isEdit ? editarHorario() : crearHorario" class="space-y-4">
      <div class="flex flex-col">
        <label for="empleado_id" class="font-medium">Empleado ID:</label>
        <input v-model="horario.empleado_id" id="empleado_id" type="number" class="p-2 rounded-xl border border-gray-300" required />
      </div>
      <div class="flex flex-col">
        <label for="nombre" class="font-medium">Nombre:</label>
        <input v-model="horario.nombre" id="nombre" type="text" class="p-2 rounded-xl border border-gray-300" required />
      </div>
      <div class="flex flex-col">
        <label for="especialidad" class="font-medium">Especialidad:</label>
        <input v-model="horario.especialidad" id="especialidad" type="text" class="p-2 rounded-xl border border-gray-300" />
      </div>
      <div class="flex flex-col">
        <label for="dia_semana" class="font-medium">Día de la Semana:</label>
        <input v-model="horario.dia_semana" id="dia_semana" type="text" class="p-2 rounded-xl border border-gray-300" />
      </div>
      <div class="flex flex-col">
        <label for="hora_inicio" class="font-medium">Hora de Inicio:</label>
        <input v-model="horario.hora_inicio" id="hora_inicio" type="text" class="p-2 rounded-xl border border-gray-300" />
      </div>
      <div class="flex flex-col">
        <label for="hora_fin" class="font-medium">Hora de Fin:</label>
        <input v-model="horario.hora_fin" id="hora_fin" type="text" class="p-2 rounded-xl border border-gray-300" />
      </div>
      <div class="flex flex-col">
        <label for="turno" class="font-medium">Turno:</label>
        <input v-model="horario.turno" id="turno" type="text" class="p-2 rounded-xl border border-gray-300" />
      </div>
      <div class="flex flex-col">
        <label for="nombre_departamento" class="font-medium">Nombre del Departamento:</label>
        <input v-model="horario.nombre_departamento" id="nombre_departamento" type="text" class="p-2 rounded-xl border border-gray-300" />
      </div>
      <div class="flex flex-col">
        <label for="nombre_sala" class="font-medium">Nombre de la Sala:</label>
        <input v-model="horario.nombre_sala" id="nombre_sala" type="text" class="p-2 rounded-xl border border-gray-300" />
      </div>
      <div class="flex justify-end mt-4">
        <button type="submit" class="bg-gray-500 text-white py-2 px-4 rounded-xl hover:scale-105 duration-300 hover:bg-[#002c7424] font-medium">
          {{ isEdit ? 'Actualizar Horario' : 'Crear Horario' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      horario: {
        empleado_id: '',
        nombre: '',
        especialidad: '',
        dia_semana: '',
        hora_inicio: '',
        hora_fin: '',
        turno: '',
        nombre_departamento: '',
        nombre_sala: ''
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IlByb2dyYW1hY2lvblEiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJwcm9ncmFtYWNpb25ALmdtYWlsIiwiQ29udHJhc2VuYSI6IlByb2dyYW1hY2lvblEiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6IjEyMzQ1Njc4OTkifQ.HgqCAey90hU2klU90K8yRs5HpyzFsCjXrK3CTx2oIjc', // Reemplaza con tu token JWT válido
      isEdit: false, // Determina si el formulario es para edición o creación
      idHorario: null // ID del horario a editar (si aplica)
    };
  },
  created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      this.idHorario = this.$route.params.id;
      this.obtenerHorario();
    }
  },
  methods: {
    async crearHorario() {
      try {
        const response = await axios.post('https://renderbackend-dwke.onrender.com/horarios/', this.horario, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('Horario creado con éxito:', response.data);
        this.$router.push({ name: 'ListaHorarios' }); // Redirige después de éxito
      } catch (error) {
        console.error('Error al crear el horario:', error.response ? error.response.data : error.message);
      }
    },
    async editarHorario() {
      try {
        const response = await axios.put(`https://renderbackend-dwke.onrender.com/horario/${this.idHorario}/`, this.horario, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('Horario actualizado con éxito:', response.data);
        this.$router.push({ name: 'ListaHorarios' }); // Redirige después de éxito
      } catch (error) {
        console.error('Error al actualizar el horario:', error.response ? error.response.data : error.message);
      }
    },
    async obtenerHorario() {
      try {
        const response = await axios.get(`https://renderbackend-dwke.onrender.com/horario/${this.idHorario}/`, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.horario = response.data;
      } catch (error) {
        console.error('Error al obtener el horario:', error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>

<style scoped>
.bg-gray-300 {
  background-color: #e5e7eb;
}

.button {
  background-color: #6b7280;
}
.button:hover {
  background-color: #4b5563;
}
</style>
