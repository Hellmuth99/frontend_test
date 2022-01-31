import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid } from "@mui/material";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@mui/icons-material/Edit";

import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

// import Swal from "sweetalert2";
// import Swal from "sweetalert2";

// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

// import { BorderColorIcon, DeleteIcon } from "@mui/icons-material";
// import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import {
  RequestAreas,
  RequestProvincias,
  RequestRegiones,
  RequestCiudades,
  InsertNewUser,
  RequestCalles,
  DelateModerador,
} from "./api/requests";
import swal from "sweetalert";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3584a7",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

// const swal = new Swal();
export default function BasicTable() {
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const [mensaje, setMensaje] = useState("");
  const [severity, setSeverity] = useState("success");
  const navigate = useNavigate();

  const [calles, setCalles] = useState([]);

  const Listar = () => {
    axios.get(`http://postulacion_back.test/api/callesdatos`).then(
      (response) => {
        setCalles(response.data);
      },

      (error) => {
        alert("error al registrar");
      }
    );
  };

  useEffect(() => {
    Listar();
  }, []);
  // useEffect(() => {
  //   RequestCalles().then((data) => {
  //     setCalles(data);
  //   });
  // }, []);

  // console.log(calles);
  //________________________________________________________

  // const Eliminar = (id) => {
  //   axios.delete(`http://postulacion_back.test/api/calles/datos/${id}`).then(
  //     (response) => {
  //       if (response.status == 200) {
  //         alert("ELIMINACION CORRECTA");
  //         // Listar();
  //         // Limpiar();
  //       }
  //     },

  //     (error) => {
  //       alert("error al registrar");
  //     }
  //   );
  // };

  // const Eliminar = (id) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this imaginary file!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   });
  //   axios
  //     .delete(`http://postulacion_back.test/api/calles/datos/${id}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         swal("Calle eliminada con éxito", {
  //           icon: "success",
  //         });
  //       } else {
  //         swal("La Calle no ha sido Borrada");
  //       }
  //     });
  // };
  const Eliminar = (id) => {
    swal({
      title: "¿Estás seguro de eliminar la calle?",
      text: "Una vez eliminado, ¡no podrá recuperar este registro!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://postulacion_back.test/api/calles/datos/${id}`)
          .then((response) => {
            if (response.status === 200) {
              swal("Calle eliminada con éxito", {
                icon: "success",
              });
              Listar();
            } else {
              swal("La Calle no ha sido Borrada");
              Listar();
            }
          });
      } else {
        swal("Acción Cancelada");
        Listar();
      }
    });
  };

  // const Eliminar = (id) => {
  //   axios
  //     .delete(`http://postulacion_back.test/api/calles/datos/${id}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         swal("calle eliminada con éxito");
  //         Listar();
  //         // handleClick();
  //         // setSeverity("info");
  //         // setMensaje("Calle Borrada con Exito");
  //       } else {
  //         Listar();
  //         // handleClick();
  //         // setSeverity("error");
  //         // setMensaje("La Calle no ha sido Borrada");
  //       }
  //     });
  // };
  // const Eliminar = () => {
  //   DelateModerador({ calle_id: id });
  // };

  // const borrarCalle = (id) => {
  //   const response = fetch(
  //     `http://postulacion_back.test/api/calles/datos/${id}`,
  //     {
  //       method: "delete",
  //     }
  //   ).then((response) => {
  //     if (response.status === 204) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Moderador eliminado con exito!",
  //         showConfirmButton: false,
  //         showClass: {
  //           popup: "animate__animated animate__fadeInDown",
  //         },
  //         hideClass: {
  //           popup: "animate__animated animate__fadeOutUp",
  //         },
  //         timer: 2500,
  //       });
  //       RequestCalles();
  //       // handleClick();
  //       setSeverity("info");
  //       setMensaje("Calle Borrada con Exito");
  //     } else {
  //       RequestCalles();
  //       // handleClick();
  //       setSeverity("error");
  //       setMensaje("La Calle no ha sido Borrada");
  //     }
  //   });
  // };

  // const mostrarAlerta = () => {
  //   console.log("aqui");
  //   swal({
  //     title: "Auto close alert!",
  //     text: "¿Estás seguro que deseas eliminar esta calle?",
  //     icon: "warning",
  //     button: "aceptar",
  //     // timer: 2000,
  //     // buttons: ["no", "si"],
  //     // showCancelButton: false,
  //     // showConfirmButton: false,
  //   });
  // }).then(
  //   function () {},
  //   // handling the promise rejection
  //   function (dismiss) {
  //     if (dismiss === "timer") {
  //       //console.log('I was closed by the timer')
  //     }
  //   }
  // );
  // };

  // const mostrarAlerta = () => {
  //   Swal("esta es una alert");
  // };

  return (
    <Grid
      container
      // width="100px"
      // height="100px"
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={6}>
        <h1 style={{ color: "white" }}>Tabla de calles</h1>
      </Grid>
      <Grid item xs={6}>
        {/* <div>
          <Button
            variant="contained"
            style={{
              width: "100%",
              marginLeft: "310%",
            }}
            onClick={() => setShow(true)}
          >
            Nueva Calle
          </Button>
          <Modal onClose={() => setShow(false)} show={show} />
        </div> */}
        <div>
          <Button
            variant="contained"
            // color="success"
            startIcon={<AddIcon />}
            style={{
              width: "100%",
              marginLeft: "240%",
            }}
            onClick={() => navigate(`/agregar`)}
          >
            Agregar Calle
          </Button>
        </div>
        {/* <Button variant="contained" href="/modal">
          Nueva Calle
        </Button> */}
      </Grid>

      <Grid item xs={6}>
        <TableContainer component={Paper}>
          {/* <div>
            <h1>Tabla</h1>
            <Button variant="contained" href="#contained-buttons">
              Link
            </Button>
          </div> */}
          <Table
            sx={{ minWidth: 1000 }} //ancho de la tabla
            aria-label="customized table"
            position="absolute"
            // width="500px"
            justifyContent="center"
            alignItems="center"
            border-spacing="10px 5px"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Calle</StyledTableCell>
                <StyledTableCell align="center">Ciudad</StyledTableCell>
                <StyledTableCell align="center">Provincia</StyledTableCell>
                <StyledTableCell align="center">Región</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calles.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell align="center">{row.idCalle}</TableCell>
                  <TableCell align="center">{row.nombreCalle}</TableCell>
                  <TableCell align="center">{row.nombreCiudad}</TableCell>
                  <TableCell align="center">{row.nombreProvincia}</TableCell>
                  <TableCell align="center">{row.nombreRegion}</TableCell>
                  <TableCell align="center"> */}

                  <TableCell align="center">{row.calle_id}</TableCell>
                  <TableCell align="center">{row.calle_nombre}</TableCell>
                  <TableCell align="center">{row.ciudad_nombre}</TableCell>
                  <TableCell align="center">{row.provincia_nombre}</TableCell>
                  <TableCell align="center">{row.region_nombre}</TableCell>
                  <TableCell align="center">
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/editar/${row.calle_id}`)}
                    >
                      Editar
                    </Button>

                    {/* <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                      onClick={() => borrarCalle(row.idCalle)}
                    >
                      Eliminar
                    </Button> */}
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={() => Eliminar(row.calle_id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
