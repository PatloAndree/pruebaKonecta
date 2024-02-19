import React, { useState, useEffect } from "react";
import imagenAvatar from "../assets/avatar.png";
import axios from "axios";


function Inicio() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");

  const [usuarios,setUsuarios] = useState([]);

  function EnviarData (event) {
     event.preventDefault();
    console.log(nombre);
    console.log(apellidos);
    console.log(dni);
    console.log(telefono);
  }

  useEffect(() => {
    listarUsuarios();
  }, []);


   const listarUsuarios = async () => {
     try {
       const response = await axios.get(
         "http://192.168.18.30/Backend/controllers/usuarioController.php"
       );
       setUsuarios(response.data);
       console.log(response.data);
     } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    
   };

    const grabarUsuarios = async (event) => {
         event.preventDefault();
          const registro = JSON.stringify({
            nombre: nombre,
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
          url: "alertas/agregarAlerta",
          data: registro,
        })
          .then(async function (d) {
        
          })
          .catch(function (error) {
            console.log(error);
          });
    
    };



  return (
    <div className="container-fluid vh-25 d-flex justify-content-center align-items-center">
      <div className="card w-75">
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
                      <label for="exampleInputPassword1" className="form-label">
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
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <label className="form-check-label" for="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={grabarUsuarios}
                  >
                    Registrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card w-75">
        <div className="row justify-content-center align-items-center">
             <div className="col-6">
            <div className="card">
              {
                usuarios.map((valor,index) => 
                  <ul key={index}>
                    <p>{valor.id}</p>
                    <p>{valor.nombres }</p>
                    <p>{valor.apellidos}</p>
                    <p>{valor.dni}</p>
                    <p>{valor.telefono}</p>
                  </ul>
                )
              }
            </div>
            <p>jdjasdjad</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
