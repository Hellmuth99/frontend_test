import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchBar from "material-ui-search-bar";

import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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

export default function BasicTable() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { nombre } = useParams();

  const [calles, setCalles] = useState([]);
  const [searched, setSearched] = useState([]);

  const Listar = () => {
    axios.get`http://postulacion_back.test/api/callesdatos`.then(
      (response) => {
        setCalles(response.data);
      },

      (error) => {
        alert("error al registrar");
      }
    );
  };

  const Listar2 = async (nombre) => {
    const response = await fetch(
      `http://postulacion_back.test/api/callesdatos2/${nombre}`
    );
    const data = await response.json();

    console.log(data);
  };

  useEffect(() => {
    Listar();
  }, []);

  useEffect(() => {
    Listar2();
  }, []);

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

  const requestSearch = (searchedVal) => {
    const filteredRows = calles.filter((row) => {
      return row.calle_nombre.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setCalles(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    Listar();
  };

  return (
    <Grid
      container
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
        <div>
          <Button
            variant="contained"
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
      </Grid>

      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <Table
            sx={{ minWidth: 1000 }} //ancho de la tabla
            aria-label="customized table"
            position="absolute"
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
