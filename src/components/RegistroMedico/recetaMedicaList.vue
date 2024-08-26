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
          @input="buscarRecetas"
          placeholder="Buscar..."
          style="width: 80%; padding: 8px; border-radius: 4px; border: 1px solid #ddd;">
      </div>
    </div>
    <br>

    <div style="width: 100%; overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; table-layout: fixed;">
        <thead>
          <tr>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Id de Receta</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Nombre</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Fecha de nacimiento</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Peso</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Talla</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Edad</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Presión arterial</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Diagnóstico</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Prescripción Médica</th>
            <th style="border: 1px solid #1fbcfa; padding: 10px; background-color: #246ab9;">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(Receta, index) in RecetasFiltrados" :key="index">
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Receta.ID }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Receta.Nombre }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Receta.Fecha_Nacimiento }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Receta.Peso }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Receta.Talla }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Receta.Edad }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Receta.Presion_arterial }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Receta.Diagnostico }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">{{ Receta.Prescripcion_Medica }}</td>
            <td style="border: 1px solid #1fbcfa; padding: 10px;">
              <button 
                class="mt-2 botonEliminar"
                style="background-color: #e9351d; color: white; border: none; padding: 8px 12px; font-size: 14px; cursor: pointer; border-radius: 4px;"
                @click="eliminarReceta(Receta.ID)">
                Eliminar
              </button>
              &nbsp;&nbsp;&nbsp;
              <router-link :to="{ name: 'editarR', params: { id: Receta.ID } }">
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
        Recetas: [], 
        message: '',
        paginaActual: 1,
        itemsPorPagina: 10,
        textoBusqueda: '', 
      };
    },
    computed: {
        RecetasFiltrados() {
        if (this.textoBusqueda.trim() === '') {
          return this.Recetas;
        }
        const busqueda = this.textoBusqueda.toLowerCase();
        return this.Recetas.filter(Receta =>
            Receta.ID.toLowerCase().includes(busqueda) ||
            Receta.Nombre.toLowerCase().includes(busqueda) ||
            Receta.Diagnostico.toLowerCase().includes(busqueda) ||
            Receta.Fecha_Nacimiento.toLowerCase().includes(busqueda)
        );
      }
    },
    mounted() {
      this.obtenerRecetas();
    },
    methods: {
        obtenerRecetas() {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkFydHVybyIsIkNvcnJlb19FbGVjdHJvbmljbyI6InN0cmluZyIsIkNvbnRyYXNlbmEiOiIxMjMiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6InN0cmluZyJ9.SsK8F6Kdj41MK2iip-McFVoVrm2__IQOOcRu4DNjRdE'
        fetch(`https://backenhospital.onrender.com/recetaAll/?skip=${this.paginaActual - 1}&limit=${this.itemsPorPagina}`,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al obtener la lista de las recetas.');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);  
          this.Recetas = data;
        })
        .catch(error => {
          this.message = "Error: " + error.message;
        });
      },
      eliminarReceta(ID) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkFydHVybyIsIkNvcnJlb19FbGVjdHJvbmljbyI6InN0cmluZyIsIkNvbnRyYXNlbmEiOiIxMjMiLCJOdW1lcm9fVGVsZWZvbmljb19Nb3ZpbCI6InN0cmluZyJ9.SsK8F6Kdj41MK2iip-McFVoVrm2__IQOOcRu4DNjRdE'
        fetch(`https://backenhospital.onrender.com/recetaDelete/${ID}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al eliminar la receta.');
          }
          this.message = "¡Receta eliminada exitosamente!";
          this.obtenerRecetas();
          setTimeout(() => {
            this.message = '';
          }, 3000);
        })
        .catch(error => {
          this.message = "Error: " + error.message;
        });
      },
      buscarRecetas() {}
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