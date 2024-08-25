<template>
  <section class="bg-gray-100 min-h-screen flex justify-center items-center">
    <div class="bg-[#D2E8E3] rounded-2xl p-10 flex flex-col items-center max-w-xl w-full">
      <h2 class="font-bold text-3xl text-[#0F6466] mb-4">Editar Horario</h2>
      <form @submit.prevent="updateHorario" class="w-full">
        <div class="mb-4">
          <label class="block text-sm text-[#002D74] mb-2" for="nombre">Nombre</label>
          <input v-model="horario.nombre" id="nombre" class="w-full px-3 py-2 rounded-lg border" type="text" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-[#002D74] mb-2" for="especialidad">Especialidad</label>
          <input v-model="horario.especialidad" id="especialidad" class="w-full px-3 py-2 rounded-lg border" type="text" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-[#002D74] mb-2" for="dia_semana">Día de la Semana</label>
          <input v-model="horario.dia_semana" id="dia_semana" class="w-full px-3 py-2 rounded-lg border" type="text" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-[#002D74] mb-2" for="hora_inicio">Hora de Inicio</label>
          <input v-model="horario.hora_inicio" id="hora_inicio" class="w-full px-3 py-2 rounded-lg border" type="time" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-[#002D74] mb-2" for="hora_fin">Hora de Fin</label>
          <input v-model="horario.hora_fin" id="hora_fin" class="w-full px-3 py-2 rounded-lg border" type="time" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-[#002D74] mb-2" for="turno">Turno</label>
          <input v-model="horario.turno" id="turno" class="w-full px-3 py-2 rounded-lg border" type="text" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-[#002D74] mb-2" for="nombre_departamento">Departamento</label>
          <input v-model="horario.nombre_departamento" id="nombre_departamento" class="w-full px-3 py-2 rounded-lg border" type="text" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-[#002D74] mb-2" for="nombre_sala">Sala</label>
          <input v-model="horario.nombre_sala" id="nombre_sala" class="w-full px-3 py-2 rounded-lg border" type="text" required />
        </div>
        <div class="flex justify-between">
          <button class="bg-[#0593A2] text-white py-2 px-4 rounded-xl hover:scale-105 duration-300 hover:bg-[#0F6466]" type="submit">Guardar Cambios</button>
          <button class="bg-gray-500 text-white py-2 px-4 rounded-xl hover:scale-105 duration-300 hover:bg-gray-700" @click="cancelEdit">Cancelar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      horario: {
        nombre: '',
        especialidad: '',
        dia_semana: '',
        hora_inicio: '',
        hora_fin: '',
        turno: '',
        nombre_departamento: '',
        nombre_sala: ''
      }
    };
  },
  methods: {
    async fetchHorario(horario_id) {
      try {
        const response = await axios.get(`https://renderbackend-dwke.onrender.com/horario/${horario_id}`);
        this.horario = response.data;
      } catch (error) {
        console.error('Error fetching horario:', error);
      }
    },
    async updateHorario() {
      try {
        await axios.put(`https://renderbackend-dwke.onrender.com/horario/${this.horario.horario_id}`, this.horario);
        alert('Horario actualizado con éxito');
        this.$router.push('/'); // Redirige a la lista de horarios después de actualizar
      } catch (error) {
        console.error('Error updating horario:', error);
      }
    },
    cancelEdit() {
      this.$router.push('/'); // Redirige a la lista de horarios si se cancela la edición
    }
  },
  mounted() {
    const horario_id = new URLSearchParams(window.location.search).get('id');
    if (horario_id) {
      this.fetchHorario(horario_id);
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados para el componente */
input {
  border: 1px solid #ccc;
}
button {
  cursor: pointer;
}
</style>
