import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function NewCalle() {
  const classes = useStyles();
  const [accion, setAccion] = useState("Guardar");
  const [idUpdate, setIdUpdate] = useState();

  const [regiones, setRegiones] = useState([]);
  const [region, setRegion] = useState("");

  const [provincias, setProvincias] = useState([]);
  const [provincia, setProvincia] = useState("");

  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("");

  const [calles, setCalles] = useState([]);
  const [calle, setCalle] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const getRegiones = async () => {
    const response = await fetch(`http://postulacion_back.test/api/regiones`);
    const data = await response.json();
    setRegiones(data);
    console.log(data);
  };

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
    setCalle("");
    setRegion();
    setProvincia();
    setCiudad();
  };
  //___________________________________________________________________

  const Guardar = () => {
    axios
      .post(`http://postulacion_back.test/api/calles/insert`, {
        calle_nombre: calle,
        ciudad_id: ciudad,
      })
      .then((response) => {
        if (response.status == 201) {
          swal("Calle registrada con éxito", {
            icon: "success",
          });

          Limpiar();
        } else {
          alert("Error al registrar");
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
        navigate(`/`);
      } else {
        swal("La Calle no ha sido actualizada");
      }
    });
  };

  useEffect(() => {
    const getDatos = async () => {
      const response = await fetch(
        `http://postulacion_back.test/api/callesdatos/${id}`
      );
      const data = await response.json();
      console.log(data);
      setCalle(data[0].calle_nombre);
      setRegion(data[0].region_id);
      getProvincias(data[0].region_id);
      setProvincia(data[0].provincia_id);
      getCiudades(data[0].provincia_id);
      setCiudad(data[0].ciudad_id);
    };
    if (id !== undefined) {
      console.log(id);
      getDatos();
    }
    getRegiones();
  }, []);

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", marginTop: 20 }}>
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
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ marginTop: "20px" }} id="Regiones">
                    Regiones
                  </InputLabel>
                  <Select
                    sx={{ marginBottom: "10px", marginTop: "20px" }}
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={region}
                    label="Regiones"
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
                  sx={{ marginBottom: "10px" }}
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={provincia}
                  label="Provincias"
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
                    sx={{ marginBottom: "10px" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ciudad}
                    label="Ciudades"
                    onChange={(e) => {
                      setCiudad(e.target.value);
                    }}
                  >
                    {ciudades.map((c) => {
                      return (
                        <MenuItem value={c.ciudad_id}>
                          {c.ciudad_nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              fullWidth
              label={id === undefined ? "Guardar" : "Editar"}
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={id === undefined ? Guardar : updateCalle}
            >
              Guardar
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
              href="/"
            >
              Cancelar
            </Button>
          </form>
        </div>
      </Container>
    </Card>
  );
}
