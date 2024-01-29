import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const fetchAllEquipos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/equipos");
        setEquipos(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEquipos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/equipos/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // return <div>
  //   <h1>CRUD Equipos</h1>
  //   <div className="equipos">
  //       {equipos.map(equipo => (
  //           <div className="equipo" key={equipo.id}>
  //               <h2>{equipo.nombre}</h2>
  //               <p>{equipo.marca}</p>
  //               <p>{equipo.modelo}</p>
  //               <p>{equipo.serie}</p>
  //               <p>{equipo.etiqueta_patrimonial}</p>
  //               <p>{equipo.ubicacion}</p>
  //               <p>{equipo.otm}</p>
  //               <p>{equipo.observaciones}</p>
  //               <button className="delete" onClick={() => handleDelete(equipo.id)}>Eliminar</button>
  //               <button className="update"><Link to={`/update/${equipo.id}`}>Editar</Link></button>
  //           </div>
  //       ))}
  //   </div>
  //   <button><Link to="/add">Agregar Nuevo Equipo</Link></button>
  // </div>;
  return (
    <>
      <div>
        <div className="cabecera">
          <div>
            <Link to="/add" className="add_link">
              Agregar Nuevo Equipo
            </Link>
          </div>
          <h1>CRUD Equipos</h1>
          <div className="vacio"></div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "#0F029E",
                color: "white",
                zIndex: 100,
              }}
            >
              <tr>
                <th scope="col">N</th>
                <th scope="col">Nombre</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Serie</th>
                <th scope="col">Etiqueta Patrimonial</th>
                <th scope="col">Ubicacion</th>
                <th scope="col">OTM</th>
                <th scope="col">Observaciones</th>
                <th scope="col">Botón 1</th>
                <th scope="col">Botón 2</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {equipos.map((equipo, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td title={equipo.nombre}>{equipo.nombre}</td>
                  <td>{equipo.marca}</td>
                  <td>{equipo.modelo}</td>
                  <td>{equipo.serie}</td>
                  <td>{equipo.etiqueta_patrimonial}</td>
                  <td>{equipo.ubicacion}</td>
                  <td>{equipo.otm}</td>
                  <td>{equipo.observaciones}</td>
                  <td>
                    <button
                      className="delete btn btn-danger"
                      onClick={() => handleDelete(equipo.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td>
                    <button className="update btn btn-warning">
                      <Link to={`/update/${equipo.id}`}>Editar</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <button className="btn btn-success agregar"> */}
          {/* </button> */}
        </div>
      </div>
    </>
  );
};

export default Equipos;
