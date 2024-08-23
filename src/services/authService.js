import axios from 'axios';


export async function obtenerDatosConToken(token) {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOb21icmVfVXN1YXJpbyI6IkJydW5vIiwiQ29ycmVvX0VsZWN0cm9uaWNvIjoic3RyaW5nIiwiQ29udHJhc2VuYSI6ImJydW5vIiwiTnVtZXJvX1RlbGVmb25pY29fTW92aWwiOiJzdHJpbmcifQ.x2mprKqz7Af2HLrWycpWLlYqI9xtG9SWJOQ8Pgn4qqg"

    const response = await axios.get('http://127.0.0.1:8000/cirugias/', {
      headers: {
        
        'Authorization': `Bearer ${token}`  // Incluye el token en los encabezados
      }
    });
    
    return response.data;  // Maneja la respuesta según lo necesites
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;  // Maneja el error adecuadamente
  }
}
