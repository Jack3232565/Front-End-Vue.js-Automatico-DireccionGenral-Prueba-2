async function obtenerServiciosMedicos() {
    return new Promise((resolve, reject) => {
        fetch("https://privilegecare-deploy-gqmt.onrender.com/servicios_medicos/")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener los servicios médicos");
                }
                return res.json();
            })
            .then((servicios) => {
                resolve(servicios);
            })
            .catch((error) => {
                console.error("Error al enviar la petición de servicios médicos al servidor: " + error);
                reject(error);
            });
    });
}

export {obtenerServiciosMedicos}