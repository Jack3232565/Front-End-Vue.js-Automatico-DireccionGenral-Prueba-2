<template>
  <div>
    <div v-if="message" style="margin-top: 10px;">
      {{ message }}
    </div>

    <div class="container text-center">
      <!-- Barra de búsqueda -->
      <div style="margin-bottom: 10px;">
        <input 
          type="text" 
          v-model="textoBusqueda" 
          @input="buscarCitas"
          placeholder="Buscar por Id del paciente..."
          style="width: 80%; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
      </div>
    </div>
    <br>

    <div style="width: 100%; overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
        <thead>
          <tr>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Id de la Cita</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Id del Paciente</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Hora de la Cita</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Teléfono</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Correo electrónico del contacto</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Motivo de la Cita</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Estatus</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(Cita, index) in CitasFiltrados" :key="index">
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Cita.ID }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Cita.Persona_ID }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Cita.Hora_Cita }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Cita.Telefono }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Cita.Correo_Electronico }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Cita.Motivo_Cita }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Cita.Estatus }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">
              <button 
                class="mt-2"
                style="background-color: #e9351d; color: white; border: none; padding: 8px 12px; font-size: 14px; cursor: pointer; border-radius: 4px;"
                @click="eliminarCita(Cita.ID)">
                Eliminar
              </button>
              &nbsp;&nbsp;&nbsp;
              <router-link :to="{ name: 'editar', params: { id: Cita.ID } }">
                <button 
                  class="mt-2"
                  style="background-color: #faab00; color: white; border: none; padding: 8px 12px; font-size: 14px; cursor: pointer; border-radius: 4px;">
                  Editar
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
  .botonEliminar:hover {
    background-color: #fc5858;
  }
  
  .botonEditar:hover {
    background-color: #ffb546;
  }
</style>

<script>
  /* eslint-disable */
  export default {
    data() {
      return {
        Citas: [], 
        message: '',
        paginaActual: 1,
        itemsPorPagina: 10,
        textoBusqueda: '', 
      };
    },
    computed: {
      CitasFiltrados() {
        if (this.textoBusqueda.trim() === '') {
          return this.Citas;
        }
        const busqueda = this.textoBusqueda.toLowerCase();
        return this.Citas.filter(Cita =>
          Cita.ID.toLowerCase().includes(busqueda) ||
          Cita.Persona_ID.toLowerCase().includes(busqueda) ||
          Cita.Telefono.toLowerCase().includes(busqueda) ||
          Cita.Correo_Electronico.toLowerCase().includes(busqueda)
        );
      }
    },
    mounted() {
      this.obtenerCitas();
    },
    methods: {
      obtenerCitas() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkFydHVybyIsIkNvcnJlb19FbGVjdHJvbmljbyI6InN0cmluZyIsIkNvbnRyYXNlbmEiOiIxMjMiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6InN0cmluZyJ9.SsK8F6Kdj41MK2iip-McFVoVrm2__IQOOcRu4DNjRdE'
        fetch(`https://backenhospital.onrender.com/citaAll/?skip=${this.paginaActual - 1}&limit=${this.itemsPorPagina}`,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener la lista de las citas.');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);  
          this.Citas = data;
        })
        .catch(error => {
          this.message = "Error: " + error.message;
        });
      },
      eliminarCita(ID) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkFydHVybyIsIkNvcnJlb19FbGVjdHJvbmljbyI6InN0cmluZyIsIkNvbnRyYXNlbmEiOiIxMjMiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6InN0cmluZyJ9.SsK8F6Kdj41MK2iip-McFVoVrm2__IQOOcRu4DNjRdE'
        fetch(`https://backenhospital.onrender.com/citaDelete/${ID}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al eliminar la cita.');
          }
          this.message = "¡Cita eliminada exitosamente!";
          this.obtenerCitas();
          setTimeout(() => {
            this.message = '';
          }, 3000);
        })
        .catch(error => {
          this.message = "Error: " + error.message;
        });
      },
      buscarCitas() {}
    }
  }
</script>
  

  