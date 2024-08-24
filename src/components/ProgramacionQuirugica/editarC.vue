<template>
  <section class="bg-gray-100 min-h-screen flex justify-center items-center">
    <div class="bg-gray-300 rounded-2xl p-10 flex flex-col items-center max-w-2xl w-full relative">
      <!-- Botón de Cierre -->
      <button @click="closeForm" class="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-gray-900">
        X
      </button>

      <div class="w-full px-8">
        <h2 class="font-bold text-3xl text-[#0F6466] mb-4">Editar Cirugía</h2>
        <p class="text-sm mb-8 text-[#002D74]">Modifique los detalles de la cirugía</p>

        <form @submit.prevent="editarCirugia" class="flex flex-col gap-4">
          <!-- Sección de Datos de la Cirugía -->
          <div class="flex flex-wrap gap-4">
            <h3 class="font-bold text-xl text-[#0F6466] w-full mb-2">Detalles de la Cirugía</h3>
            <div class="flex flex-wrap gap-4">
              <input class="p-2 mt-2 rounded-xl border flex-1" type="number" v-model.number="cirugia.Paciente_ID" placeholder="Paciente_ID" required>
              <input class="p-2 mt-2 rounded-xl border flex-1" type="number" v-model.number="cirugia.Espacio_Medico_ID" placeholder="Espacio_Medico_ID" required>
            </div>
            <input class="p-2 mt-2 rounded-xl border flex-1" type="text" v-model="cirugia.Nombre" placeholder="Nombre de la Cirugía">
            <input class="p-2 mt-2 rounded-xl border flex-1" type="text" v-model="cirugia.Descripcion" placeholder="Descripción">
          </div>
          <div class="flex flex-wrap gap-4">
            <input class="p-2 mt-2 rounded-xl border flex-1" type="text" v-model="cirugia.Tipo" placeholder="Tipo">
            <select class="p-2 mt-2 rounded-xl border flex-1" v-model="cirugia.Nivel_Urgencia">
              <option value="" disabled>Nivel de Urgencia</option>
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
            <input class="p-2 mt-2 rounded-xl border flex-1" type="datetime-local" v-model="cirugia.Horario" placeholder="Horario">
          </div>
          <div class="flex flex-wrap gap-4">
            <textarea class="p-2 mt-2 rounded-xl border flex-1" v-model="cirugia.Observaciones" placeholder="Observaciones"></textarea>
            <textarea class="p-2 mt-2 rounded-xl border flex-1" v-model="cirugia.Valoracion_Medica" placeholder="Valoración Médica"></textarea>
          </div>
          <div class="flex flex-wrap gap-4">
            <select class="p-2 mt-2 rounded-xl border flex-1" v-model="cirugia.Estatus">
              <option value="" disabled>Estatus</option>
              <option value="Programada">Programada</option>
              <option value="EnCurso">En Curso</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            <input class="p-2 mt-2 rounded-xl border flex-1" type="text" v-model="cirugia.Consumible" placeholder="Consumible">
          </div>
          <div class="w-full">
            <button class="bg-gray-500 text-white py-2 rounded-xl w-full hover:scale-105 duration-300" type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cirugia: {
        Paciente_ID: null,
        Espacio_Medico_ID: null,
        Tipo: '',
        Nombre: '',
        Descripcion: '',
        Nivel_Urgencia: '',
        Horario: '',
        Observaciones: '',
        Valoracion_Medica: '',
        Estatus: '',
        Consumible: ''
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IlByb2dyYW1hY2lvblEiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJwcm9ncmFtYWNpb25ALmdtYWlsIiwiQ29udHJhc2VuYSI6IlByb2dyYW1hY2lvblEiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6IjEyMzQ1Njc4OTkifQ.HgqCAey90hU2klU90K8yRs5HpyzFsCjXrK3CTx2oIjc' // Asegúrate de usar un token válido
    };
  },
  mounted() {
    this.obtenerCirugia();
  },
  methods: {
    obtenerCirugia() {
      const id = this.$route.params.id; // Suponiendo que el ID está en los parámetros de la ruta
      axios.get(`https://renderbackend-dwke.onrender.com/cirugias/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => {
        this.cirugia = response.data;
      })
      .catch(error => {
        console.error('Error al obtener los datos de la cirugía:', error.response ? error.response.data : error.message);
      });
    },
    editarCirugia() {
      const id = this.$route.params.id; // Suponiendo que el ID está en los parámetros de la ruta
      const fechaActual = new Date().toISOString();
      const cirugiaActualizada = {
        ...this.cirugia,
        Fecha_Actualizacion: fechaActual
      };

      axios.put(`https://renderbackend-dwke.onrender.com/cirugias/${id}`, cirugiaActualizada, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('Cirugía actualizada:', response.data);
        this.$router.push({ name: 'tablac' });
      })
      .catch(error => {
        console.error('Error al actualizar la cirugía:', error.response ? error.response.data : error.message);
      });
    },
    closeForm() {
      this.$router.push('/tablaC'); // Redirecciona a la lista de cirugías o a otra vista según sea necesario
    }
  }
};
</script>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
}
button:hover {
  color: #000;
}
</style>
