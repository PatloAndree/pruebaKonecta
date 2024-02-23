// import React, { useState, useEffect } from "react";
// import {Link} from "react-router-dom"
// import imagenAvatar from "../assets/avatar.png";
// import axios from "axios";

// function Login() {
//   const [idUsuario, setIdUsuario] = useState(0);
//   const [nombre, setNombre] = useState("");
//   const [apellidos, setApellidos] = useState("");
//   const [dni, setDni] = useState("");
//   const [telefono, setTelefono] = useState("");

//   const [editarOpcion, setEditarOpcion] = useState(false);

//   const [usuarios, setUsuarios] = useState([]);

//   function limpiarData() {
//     setNombre("");
//     setApellidos("");
//     setDni("");
//     setTelefono("");
//     setIdUsuario("");
//   }

//   useEffect(() => {
//     listarUsuarios();
//   }, []);

//   const validarLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/login", // Cambia la URL por la correspondiente a tu backend
//         {
//           email: email,
//           password: password,
//         }
//       );
//       console.log(response.data);
//       // Aquí puedes manejar la respuesta del servidor, como redireccionar a una nueva página
//     } catch (error) {
//       console.error("Error al iniciar sesión:", error);
//       setError("Usuario o contraseña incorrectos");
//     }
//   };



//   return (
//     <div class="d-flex justify-content-center align-items-center flex-nowrap vh-100 w-100">
//       <div className="row">
//         <div className="col">
//           <section className="vh-50">
//             <div className="container-fluid h-custom">
//               <div className="row d-flex justify-content-center align-items-center h-100">
//                 <div className="col-md-9 col-lg-6 col-xl-5 border-end">
//                   <img
//                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//                     className="img-fluid"
//                     alt="Sample image"
//                   ></img>
//                 </div>

//                 <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//                   <form>
//                     <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
//                       <p className="lead fw-normal mb-0 me-3">Konecta</p>
//                       <button
//                         type="button"
//                         className="btn btn-primary btn-floating mx-1"
//                       >
//                         <i className="fab fa-facebook-f"></i>
//                       </button>

//                       <button
//                         type="button"
//                         className="btn btn-primary btn-floating mx-1"
//                       >
//                         <i className="fab fa-twitter"></i>
//                       </button>

//                       <button
//                         type="button"
//                         className="btn btn-primary btn-floating mx-1"
//                       >
//                         <i className="fab fa-linkedin-in"></i>
//                       </button>
//                     </div>

//                     <div className="divider d-flex align-items-center my-4">
//                       <p className="text-center fw-bold mx-3 mb-0">Iniciar sesión</p>
//                     </div>

//                     <div className="form-outline mb-4">
//                       <input
//                         type="email"
//                         id="form3Example3"
//                         className="form-control form-control-lg"
//                         placeholder="Ingrese su dirección de correo"
//                       />
//                       <label className="form-label" for="form3Example3">
//                         Correo
//                       </label>
//                     </div>

//                     <div className="form-outline mb-3">
//                       <input
//                         type="password"
//                         id="form3Example4"
//                         className="form-control form-control-lg"
//                         placeholder="Ingrese su contraseña"
//                       />
//                       <label className="form-label" for="form3Example4">
//                         Contraseña
//                       </label>
//                     </div>

//                     <div className="d-flex justify-content-between align-items-center">
//                       <div className="form-check mb-0">
//                         <input
//                           className="form-check-input me-2"
//                           type="checkbox"
//                           value=""
//                           id="form2Example3"
//                         />
//                         <label className="form-check-label" for="form2Example3">
//                           Recuerdame
//                         </label>
//                       </div>
//                       <a href="#!" className="text-body">
//                         ¿Olvido su contraseña?
//                       </a>
//                     </div>

//                     <div className="text-center text-lg-start mt-4 pt-2">
//                       {/* <button type="button" className="btn btn-primary btn-lg"> */}
//                         <Link
//                           to="/Inicio"
//                           className="text-white text-decoration-none btn btn-primary btn-lg"
//                         >
//                           Ingresar
//                         </Link>
//                       {/* </button> */}
//                       <p className="small fw-bold mt-2 pt-1 mb-0">
//                         <Link to="/Inicio">Registrar</Link>
//                       </p>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);


    const listarUsuarios = async () => {
      try {
        const response = await axios.get(
          //  "http://192.168.18.30/Backend/controllers/usuarioController.php"
          "http://127.0.0.1:8000/api/usuarios/listar"
        );
        setTimeout(() => {
          setUsuarios(response.data);
          console.log(response.data);
        }, 200);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    useEffect(() => {
      return () => {
        // listarUsuarios();
      };
    }, []);


  const validarLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/newVersion/public/validarLogin", // Cambia la URL por la correspondiente a tu backend
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      // Aquí puedes manejar la respuesta del servidor, como redireccionar a una nueva página
      if (response.data.status == 1) {
          navigate("/Inicio");
        
      }else{
          
          setError("Usuario o contraseña invalidas");

      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={validarLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
        <p className="mt-3">
          ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>

      {/* <p>{JSON.stringify(usuarios)}</p> */}
    </div>
  );
}

export default Login;
