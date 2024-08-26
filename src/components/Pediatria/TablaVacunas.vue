<template>
    <div class="p-6 bg-gray-100 min-h-screen">
        <div v-if="message" class="text-red-600 font-bold mb-4">
            {{ message }}
        </div>

        <h1 class="text-2xl font-bold mb-6 text-gray-800">Listado de Vacunas</h1>

        <div class="overflow-x-auto bg-white shadow-md rounded-lg">
            <table class="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr class="bg-gray-800 text-white">
                        <th class="py-3 px-4 text-left">Id del Bebé</th>
                        <th class="py-3 px-4 text-left">Vacuna administrada</th>
                        <th class="py-3 px-4 text-left">Dosis(ml)</th>
                        <th class="py-3 px-4 text-left">Vía de Administración</th>
                        <th class="py-3 px-4 text-left">Lote</th>
                        <th class="py-3 px-4 text-left">Fecha de Aplicación</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(vacuna, index) in vacunas" :key="index" class="border-b">
                        <td class="py-3 px-4">{{ vacuna.nacimientos_id }}</td>
                        <td class="py-3 px-4">{{ vacuna.vacuna_administrada }}</td>
                        <td class="py-3 px-4">{{ vacuna.dosis }}</td>
                        <td class="py-3 px-4">{{ vacuna.via_administracion }}</td>
                        <td class="py-3 px-4">{{ vacuna.numero_lote }}</td>
                        <td class="py-3 px-4">{{ vacuna.fecha_administracion }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-6 flex justify-start space-x-4">
            <router-link :to="{ name: 'Nacimientos'}">
                <button class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    <i class="fas fa-syringe"></i> Home
                </button>
            </router-link>
            <router-link :to="{ name: 'VacunasForm'}">
                <button class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    <i class="fas fa-syringe"></i> Registrar Vacuna
                </button>
            </router-link>
        </div>

        <div class="mt-4 flex justify-between items-center">
            <div class="flex space-x-4">
                <button @click="paginar('anterior')" :disabled="paginaActual === 1"
                    class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400">
                    Anterior
                </button>
                <button @click="paginar('siguiente')" :disabled="vacunas.length < itemsPorPagina"
                    class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400">
                    Siguiente
                </button>
            </div>
            <div class="text-gray-700 font-bold">
                Página {{ paginaActual }}
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            vacunas: [],
            message: '',
            paginaActual: 1,
            itemsPorPagina: 10,
            textoBusqueda: '' // Elimina esta línea si ya no es necesario
        };
    },
    mounted() {
        this.obtenerVacunas();
    },
    methods: {
        obtenerVacunas() {
            const id = this.$route.params.id;
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6InlhaXIiLCJDb3JyZW9fRWxlY3Ryb25pY28iOiJzdHJpbmciLCJDb250cmFzZW5hIjoiMTIzNCIsIk51bWVyb19UZWxlZm9uaWNvX01vdmlsIjoic3RyaW5nIn0.aEXy_fgDdUHif1wzhfpxddKVg4fWAyGR3fd1p-SWDOc'; 

            fetch(`https://privilegecare-deploy.onrender.com/pediatria/vacunas/${id}/?page=${this.paginaActual - 1}&limit=${this.itemsPorPagina}`,{
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema al obtener la lista de Vacunas. O el paciente no tiene ninguna Vacuna');
                    }
                    return response.json();
                })
                .then(data => {
                    this.vacunas = data;
                })
                .catch(error => {
                    this.message = "Error: " + error.message;
                });
        },
        paginar(direccion) {
            if (direccion === 'anterior' && this.paginaActual > 1) {
                this.paginaActual--;
            } else if (direccion === 'siguiente') {
                this.paginaActual++;
            }
            this.obtenerVacunas(); // Corrige el nombre del método
        }
    }
}
</script>

<style scoped>
.error-message {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}

h1 {
    color: rgb(31, 41, 55);
}

.tabla1 {
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: rgb(31, 41, 55);
    color: white;
}

.nav-button {
    background-color: rgb(31, 41, 55);
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
}

.nav-button:hover {
    background-color: #1d2d44;
}

.pagination {
    margin-top: 10px;
}

.pagination-button {
    background-color: black;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
}

.pagination-button:disabled {
    background-color: grey;
    cursor: not-allowed;
}

.pagination-info {
    margin-top: 10px;
    font-weight: bold;
}
</style>
