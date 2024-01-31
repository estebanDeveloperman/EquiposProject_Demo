import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import DetalleEquipoModal from "../components/modal";

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchAllEquipos = async () => {
      try {
        const res = await axios.get("http://localhost:8800/equipos");
        const equiposData = res.data;

        // Obtener la información del último mantenimiento para cada equipo
        const equiposConMantenimiento = await Promise.all(
          equiposData.map(async (equipo) => {
            const resMantenimiento = await axios.get(
              `http://localhost:8800/equipos/${equipo.id}/mantenimiento`
            );
            const ultimoMantenimiento = resMantenimiento.data[0];

            return { ...equipo, ultimoMantenimiento };
          })
        );
        console.log(equiposConMantenimiento);
        setEquipos(equiposConMantenimiento);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEquipos();
  }, []);
  
  const handleVerDetalles = (equipo) => {
    setEquipoSeleccionado(equipo);
    setShowModal(true);
  };

  // Filtrar equipos según el término de búsqueda
  const equiposFiltrados = equipos.filter((equipo) =>
    Object.values(equipo).some((value) => {
      // Verificar si el valor es undefined o null antes de llamar a toString
      if (value !== undefined && value !== null) {
        return value.toString().toLowerCase().includes(filtro.toLowerCase());
      }
      return false;
    })
  );

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
        <div className="bloque_filtros">
          <input
            type="text"
            className="input_filtro"
            placeholder="Buscar..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="custom-thead">
              <tr>
                <th scope="col">N</th>
                <th scope="col">Nombre</th>
                <th scope="col">Marca</th>
                <th scope="col">Modelo</th>
                <th scope="col">Serie</th>
                <th scope="col">Etiqueta Patrimonial</th>
                <th scope="col">Ubicacion</th>
                <th scope="col">OTM</th>
                <th scope="col">Últ. Mantenimiento</th>
                <th scope="col">Botón 1</th>
                <th scope="col">Botón 2</th>
              </tr>
            </thead>
            <tbody>
              {console.log(equipos)}
              {equiposFiltrados.map((equipo, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td title={equipo.nombre}>{equipo.nombre}</td>
                  <td>{equipo.marca}</td>
                  <td>{equipo.modelo}</td>
                  <td>{equipo.serie}</td>
                  <td>{equipo.etiqueta_patrimonial}</td>
                  <td>{equipo.ubicacion}</td>
                  <td>{equipo.otm}</td>
                  {equipo.ultimoMantenimiento !== undefined ? (
                    <td>
                      {format(
                        new Date(
                          equipo.ultimoMantenimiento.fecha_mantenimiento
                        ),
                        "dd/MM/yyyy"
                      )}
                    </td>
                  ) : (
                    <td>-</td>
                  )}

                  {console.log(equipo.ultimoMantenimiento)}
                  {/* <td>{equipo.ultimoMantenimiento.fecha_mantenimiento}</td> */}
                  <td>
                    {/* <button
                      className="delete btn btn-danger"
                      onClick={() => handleDelete(equipo.id)}
                    >
                      Eliminar
                    </button> */}
                    <button
                      className="btn btn-primary"
                      onClick={() => handleVerDetalles(equipo)}
                    >
                      Detalles
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

          <DetalleEquipoModal
            show={showModal}
            onHide={() => setShowModal(false)}
            equipo={equipoSeleccionado}
          />
          {/* <button className="btn btn-success agregar"> */}
          {/* </button> */}
        </div>
      </div>
    </>
  );
};

export default Equipos;
