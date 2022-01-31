import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { TheatersRounded } from "@material-ui/icons";
import MaterialDatatable from "material-datatable";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import swal from "sweetalert";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// import {
//   RequestAreas,
//   RequestProvincias,
//   RequestRegiones,
//   RequestCiudades,
//   InsertNewUser,
//   RequestCalles,
// } from "./api/requests";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
}));

export default function NewCalle() {
  const classes = useStyles();
  const [accion, setAccion] = useState("Guardar");
  const [id, setId] = useState(null);
  const [idUpdate, setIdUpdate] = useState();

  const [regiones, setRegiones] = useState([]);
  const [region, setRegion] = useState("");

  const [provincias, setProvincias] = useState([]);
  const [provincia, setProvincia] = useState("");

  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("");

  const [calles, setCalles] = useState([]);
  const [calle, setCalle] = useState();

  const getRegiones = async () => {
    const response = await fetch(`http://postulacion_back.test/api/regiones`);
    const data = await response.json();
    setRegiones(data);
    console.log(data);
  };

  useEffect(() => {
    getRegiones();
  }, []);

  const getProvincias = async (id) => {
    const respuesta = await fetch(
      `http://postulacion_back.test/api/provincias/regiones/${id}`
    );
    const data = await respuesta.json();
    setProvincias(data);
  };

  const getCiudades = async (id) => {
    const respuesta = await fetch(
      `http://postulacion_back.test/api/ciudades/provincias/${id}`
    );
    const data = await respuesta.json();
    setCiudades(data);
  };

  const Limpiar = () => {
    setRegion();
    setProvincia();
    setCiudad();
    setCalle();
  };
  //___________________________________________________________________

  const Guardar = () => {
    axios
      .post(`http://postulacion_back.test/api/calles/insert`, {
        calle_nombre: calle,
        ciudad_id: ciudad,
      })
      .then((response) => {
        if (response.status == 200) {
          alert("REGISTRO CORRECTO");
          Limpiar();
          setCalle();
        } else {
          alert("error al registrar");
          Limpiar();
        }
      });
  };

  const updateCalle = () => {
    fetch(`http://postulacion_back.test/api/calles/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        calle_nombre: calle,
        ciudad_id: ciudad,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        swal("Calle actualizada con éxito", {
          icon: "success",
        });
      } else {
        swal("La Calle no ha sido Borrada");
      }
    });
  };

  const handleEditButton = () => {
    id === undefined ? Guardar() : updateCalle();
  };
  //________________________________________________________________________

  //______________________________________________________

  //____________________________________________________________________
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro Calle
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Nombre de la calle"
                value={calle}
                onChange={(event) => {
                  setCalle(event.target.value);
                }}
                // variant="outlined"
                // required
                // fullWidth
                // id="lastName"
                // label="Password"
                // name="lastName"
                // autoComplete="lname"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="Regiones">Regiones</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={region}
                  label="Regiones"
                  // onChange={onDropChange}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    getProvincias(e.target.value);
                    setCiudad([]);
                    console.log(e);
                  }}
                >
                  {regiones.map((region) => {
                    return (
                      <MenuItem value={region.region_id}>
                        {region.region_nombre}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="Regiones">Provincias</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={provincia}
                label="Provincias"
                // onChange={onDropChange}
                onChange={(e) => {
                  setProvincia(e.target.value);
                  getCiudades(e.target.value);
                }}
              >
                {provincias.map((pr) => {
                  return (
                    <MenuItem value={pr.provincia_id}>
                      {pr.provincia_nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="Ciudades">Ciudades</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ciudad}
                  label="Ciudades"
                  // onChange={onDropChange}
                  onChange={(e) => {
                    setCiudad(e.target.value);
                  }}
                >
                  {ciudades.map((c) => {
                    return (
                      <MenuItem value={c.ciudad_id}>{c.ciudad_nombre}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              Guardar();
            }}
            // onClick={handleEditButton}
          >
            Guardar
            {/* {id == undefined ? "Agregar" : "Editar"} */}
            {/* {accion} */}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="default"
            className={classes.submit}
            href="/"
            // onClick={() => Eliminar()}
          >
            Cancelar
          </Button>
          {/* <Grid container justify="flex-end">
            <MaterialDatatable
              title={"Registro De Usuarios"}
              data={data}
              columns={columns}
              options={options}
            />
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
