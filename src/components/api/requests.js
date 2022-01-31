import axios from "axios";
import Swal from "sweetalert2";

async function RequestRegiones() {
  const answer = await axios
    .get(`http://postulacion_back.test/api/regiones`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err && err.response);
    });

  let options = [];
  options = answer.map((element) => {
    let o = {
      id: element.region_id,
      nombre: element.region_nombre,
    };
    // key++;
    return o;
  });
  return options;
}

async function RequestProvincias(data) {
  if (data.region_id === "") {
    return [];
  }
  const answer = await axios
    .post(`http://postulacion_back.test/api/provincias`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err && err.response);
    });
  let options = [];

  options = answer.map((element) => {
    let o = {
      id: element.provincia_id,
      nombre: element.provincia_nombre,
      if_f: element.region_id,
    };

    return o;
  });
  return options;
}

async function RequestCiudades(data) {
  if (data.region_id === "") {
    return [];
  }
  const answer = await axios
    .post(`http://postulacion_back.test/api/ciudades`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err && err.response);
    });
  let options = [];

  options = answer.map((element) => {
    let o = {
      id: element.ciudad_id,
      nombre: element.ciudad_nombre,
    };

    return o;
  });
  return options;
}

async function RequestCalles() {
  const answer = await axios
    .get(`http://postulacion_back.test/api/callesdatos`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (err && err.response);
    });

  let options = [];
  options = answer.map((element) => {
    let o = {
      idCalle: element.calle_id,
      nombreCalle: element.calle_nombre,
      nombreCiudad: element.ciudad_nombre,
      nombreProvincia: element.provincia_nombre,
      nombreRegion: element.region_nombre,
    };
    // key++;
    return o;
  });
  return options;
}

async function DelateModerador(data) {
  console.log(data);
  const answer = await axios
    .post(`http://postulacion_back.test/api/calles/datos`)
    .then((res) => {
      console.log(res);
      if (res.data == "SI") {
        Swal.fire({
          icon: "success",
          title: "Moderador eliminado con exito!",
          showConfirmButton: false,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          timer: 2500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "No se logro eliminar, Intentelo nuevamente",
          confirmButtonText: `Save`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          showConfirmButton: false,
        });
      }
      //return(res.data);
    })
    .catch((err) => {
      if (err && err.response);
    });
  console.log(answer);
}

export {
  RequestRegiones,
  RequestProvincias,
  RequestCiudades,
  RequestCalles,
  DelateModerador,
};
