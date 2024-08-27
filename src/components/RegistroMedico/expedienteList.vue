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
          @input="buscarExpedientes"
          placeholder="Buscar por Id del paciente..."
          style="width: 80%; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
      </div>
    </div>
    <br>

    <div style="width: 100%; overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
        <thead>
          <tr>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Id del Expediente</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Id del Paciente</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Hora de la Consulta</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Diagnóstico</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Tratamiento Relacionado</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Observaciones</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Estatus</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(Expediente, index) in ExpedientesFiltrados" :key="index">
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Expediente.ID }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Expediente.Persona_ID }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Expediente.Hora_Consulta }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Expediente.Diagnostico }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Expediente.Tratamiento_Relacionado }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Expediente.Observaciones }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Expediente.Estatus }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">
              <button 
                class="mt-2 botonEliminar"
                style="background-color: #e9351d; color: white; border: none; padding: 8px 12px; font-size: 14px; cursor: pointer; border-radius: 4px;"
                @click="eliminarExpediente(Expediente.ID)">
                Eliminar
              </button>
              &nbsp;&nbsp;&nbsp;
              <router-link :to="{ name: 'editarE', params: { id: Expediente.ID } }">
                <button 
                  class="mt-2 botonEditar"
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



  <script>
  /* eslint-disable */
  export default {
    data() {
      return {
        Expedientes: [], 
        message: '',
        paginaActual: 1,
        itemsPorPagina: 10,
        textoBusqueda: '', 
      };
    },
    computed: {
        ExpedientesFiltrados() {
        if (this.textoBusqueda.trim() === '') {
          return this.Expedientes;
        }
        const busqueda = this.textoBusqueda.toLowerCase();
        return this.Expedientes.filter(Expediente =>
          Expediente.ID.toLowerCase().includes(busqueda) ||
          Expediente.Persona_ID.toLowerCase().includes(busqueda) ||
          Expediente.Diagnostico.toLowerCase().includes(busqueda) ||
          Expediente.Hora_Consulta.toLowerCase().includes(busqueda)
        );
      }
    },
    mounted() {
      this.obtenerExpedientes();
    },
    methods: {
      obtenerExpedientes() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkFydHVybyIsIkNvcnJlb19FbGVjdHJvbmljbyI6InN0cmluZyIsIkNvbnRyYXNlbmEiOiIxMjMiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6InN0cmluZyJ9.SsK8F6Kdj41MK2iip-McFVoVrm2__IQOOcRu4DNjRdE'
        fetch(`https://backenhospital.onrender.com/expedienteAll/?skip=${this.paginaActual - 1}&limit=${this.itemsPorPagina}`,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener la lista de los Expedientes.');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);  
          this.Expedientes = data;
        })
        .catch(error => {
          this.message = "Error: " + error.message;
        });
      },
      eliminarExpediente(ID) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkFydHVybyIsIkNvcnJlb19FbGVjdHJvbmljbyI6InN0cmluZyIsIkNvbnRyYXNlbmEiOiIxMjMiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6InN0cmluZyJ9.SsK8F6Kdj41MK2iip-McFVoVrm2__IQOOcRu4DNjRdE'
        fetch(`https://backenhospital.onrender.com/expedienteDelete/${ID}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al eliminar el expediente.');
          }
          this.message = "¡Expediente eliminada exitosamente!";
          this.obtenerExpedientes();
          setTimeout(() => {
            this.message = '';
          }, 3000);
        })
        .catch(error => {
          this.message = "Error: " + error.message;
        });
      },
      buscarExpedientes() {}
    }
  }
  </script>
  
<style scoped>
  .botonEliminar:hover {
    background-color: #fc5858;
  }
  
  .botonEditar:hover {
    background-color: #ffb546;
  }
</style>
  