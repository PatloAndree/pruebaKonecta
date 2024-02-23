import React, { useState, useEffect } from "react";
import imagenAvatar from "../assets/avatar.png";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "react-js-loader";

function Inicio() {
  const [idUsuario, setIdUsuario] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");

  const [editarOpcion, setEditarOpcion] = useState(false);

  const [loading, setLoading] = useState(false);

  const [usuarios, setUsuarios] = useState([]);

  function limpiarData() {
    setNombre("");
    setApellidos("");
    setDni("");
    setTelefono("");
    setIdUsuario("");
  }

  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        //  "http://192.168.18.30/Backend/controllers/usuarioController.php"
        "http://localhost/newVersion/public/getUsuarios"
        );
        setTimeout(() => {
          setUsuarios(response.data);
        console.log(response.data);
        setLoading(false);
      }, 200);
  
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setLoading(false);
      }
      
  };

  const grabarUsuario = async (event) => {
    if (nombre != "" && dni != "") {
      event.preventDefault();
      const registro = JSON.stringify({
        nombres: nombre,
        apellidos: apellidos,
        dni: dni,
        telefono: telefono,
      });
      console.log(nombre);
      console.log(apellidos);
      console.log(dni);
      console.log(telefono);
      await axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        // url: "http://192.168.18.30/Backend/controllers/usuarioController.php",
        url: "http://localhost/newVersion/public/agregarUsuario",

        data: registro,
      })
        .then(async function (d) {
          console.log("Registro aceptado");
          listarUsuarios();
          limpiarData();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const editarData = (id, nombreE, apellidosE, dniE, telefonoE) => {
    if (nombreE != "") {
      setNombre(nombreE);
      setApellidos(apellidosE);
      setDni(dniE);
      setTelefono(telefonoE);
      setIdUsuario(id);
      setEditarOpcion(true);
    }
  };

  const editarUsuario = async (event) => {
    event.preventDefault();

    const registro = JSON.stringify({
      nombres: nombre,
      apellidos: apellidos,
      dni: dni,
      telefono: telefono,
      id: idUsuario,
    });

    console.log("hola esto envio");
    console.log(registro);
    await axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      // url: `http://192.168.18.30/Backend/controllers/usuarioController.php?id=${idUsuario}}`,
      url: `http://localhost/newVersion/public/editarUsuario`,
      data: registro,
    })
      .then(async function (d) {
        console.log("Registro aceptado");
        listarUsuarios();
        limpiarData();
        setEditarOpcion(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const eliminarUsuario = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost/newVersion/public/eliminarUsuario?id=${id}`
      );
      console.log(response.data);
      listarUsuarios();

      // Manejar la respuesta si es necesario
    } catch (error) {
      console.error("Error al eliminar usuario Api:", error);
      // Manejar el error si es necesario
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end p-2 border border-1 align-items-center">
        <Link
          to={"/Login"}
          className="text-white text-decoration-none btn btn-primary btn-sm "
        >
          Salir
        </Link>
      </div>
      <div className="flex-column vh-50">
        <div className="d-flex justify-content-center w-100 mt-5 mb-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <p>Imagen del usuario</p>
              <img src={imagenAvatar} className="w-25"></img>
            </div>

            <div className="col-6">
              <div className="card">
                <div className="m-4">
                  <form>
                    <div className="row">
                      <div className=" col-6 mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Nombre
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">
                          Poner su nombre por favor
                        </div>
                      </div>
                      <div className=" col-6 mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Apellidos
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          value={apellidos}
                          onChange={(e) => setApellidos(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">
                          Poner su correo por favor
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Dni
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleInputEmail1"
                          value={dni}
                          onChange={(e) => setDni(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">
                          Poner su correo por favor
                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <label
                          for="exampleInputPassword1"
                          className="form-label"
                        >
                          Telefono
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="exampleInputPassword1"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                        />
                      </div>
                    </div>
                    {editarOpcion == false ? (
                      <button
                        className="btn btn-primary"
                        onClick={grabarUsuario}
                      >
                        Registrar
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={editarUsuario}
                      >
                        Editar
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="d-flex justify-content-center w-100 mt-5 ">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 border border-1">
              <h3>Lista de usuarios</h3>
              <table className="table table-bordered">
                <thead>
                  <th>Código</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Dni</th>
                  <th>Telefono</th>
                  <th className="center"></th>
                </thead>
                <tbody>
                  {loading ? (
                    <Loader
                      type="hourglass"
                      bgColor="gray"
                      color="gray"
                      title={"Cargando"}
                      size={40}
                    />
                  ) : (
                    usuarios.map((valor, index) => (
                      <tr key={index}>
                        <td>{valor.id}</td>
                        <td>{valor.nombres}</td>
                        <td>{valor.apellidos}</td>
                        <td>{valor.dni}</td>
                        <td>{valor.telefono}</td>
                        <td>
                          <i
                            className="bi bi-pencil"
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() =>
                              editarData(
                                valor.id,
                                valor.nombres,
                                valor.apellidos,
                                valor.dni,
                                valor.telefono
                              )
                            }
                          ></i>
                        </td>
                        <td>
                          <i
                            className="bi bi-trash"
                            style={{ cursor: "pointer", color: "red  " }}
                            onClick={() => eliminarUsuario(valor.id)}
                          ></i>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
