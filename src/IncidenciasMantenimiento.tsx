import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMantenimiento from "./components/SidebarMantenimiento";
import type { EstadoIncidencia } from "./components/SidebarMantenimiento";
import TopBar from "./components/TopBar";
import "./IncidenciasMantenimiento.css";

export interface Incidencia {
  id: string;
  fecha: string;
  descripcion: string;
  imagen?: string;
}

const DATA: Record<EstadoIncidencia, Incidencia[]> = {
  Nuevas: [
    {
      id: "INC-001",
      fecha: "2025-04-01",
      descripcion: "Fallo en sistema de aire acondicionado piso 3",
    },
    {
      id: "INC-002",
      fecha: "2025-04-03",
      descripcion: "Puerta de entrada principal no cierra correctamente",
    },
    {
      id: "INC-003",
      fecha: "2025-04-05",
      descripcion: "Goteras en techo del salón 204",
    },
  ],
  Cerradas: [
    {
      id: "INC-004",
      fecha: "2025-03-20",
      descripcion: "Cambio de bombillas en pasillo B",
    },
    {
      id: "INC-005",
      fecha: "2025-03-22",
      descripcion: "Reparación de silla en sala de juntas",
    },
  ],
  Pendientes: [
    {
      id: "INC-006",
      fecha: "2025-04-10",
      descripcion: "Revisión de cableado eléctrico laboratorio 1",
    },
  ],
};

const IncidenciasMantenimiento: React.FC = () => {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState<EstadoIncidencia>("Nuevas");
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const [detalle, setDetalle] = useState<Incidencia | null>(null);

  const incidencias = DATA[filtro];

  const toggleTodas = () => {
    if (seleccionadas.length === incidencias.length) {
      setSeleccionadas([]);
    } else {
      setSeleccionadas(incidencias.map((i) => i.id));
    }
  };

  const toggleUna = (id: string) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const todasSeleccionadas =
    incidencias.length > 0 && seleccionadas.length === incidencias.length;

  return (
    <div className="dashboard-root d-flex">
      <SidebarMantenimiento
        filtro={filtro}
        onFiltroChange={(f) => {
          setFiltro(f);
          setSeleccionadas([]);
          setDetalle(null);
        }}
      />
      <div className="dashboard-main d-flex flex-column">
        <TopBar />
        <div className="dashboard-content flex-grow-1 p-4">
          {/* Breadcrumb */}
          <div className="im-breadcrumb mb-3">
            <span>Incidencias</span>
            <span className="im-breadcrumb-sep">/</span>
            <span className="im-breadcrumb-active">Gestión de Incidencias</span>
          </div>

          {/* Título filtro */}
          <div className="im-filtro-titulo mb-3">
            <span>{filtro.toUpperCase()}</span>
          </div>

          {/* Tabla */}
          <div className="im-tabla-wrapper">
            <table className="im-tabla">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={todasSeleccionadas}
                      onChange={toggleTodas}
                      className="im-checkbox"
                    />
                  </th>
                  <th>Fecha</th>
                  <th>ID</th>
                  <th>Descripción</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {incidencias.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="im-empty">
                      No hay incidencias {filtro.toLowerCase()}.
                    </td>
                  </tr>
                ) : (
                  incidencias.map((inc) => (
                    <tr
                      key={inc.id}
                      className={
                        seleccionadas.includes(inc.id)
                          ? "im-fila-seleccionada"
                          : ""
                      }
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={seleccionadas.includes(inc.id)}
                          onChange={() => toggleUna(inc.id)}
                          className="im-checkbox"
                        />
                      </td>
                      <td>{inc.fecha}</td>
                      <td>{inc.id}</td>
                      <td>{inc.descripcion}</td>
                      <td>
                        <button
                          className="im-btn-ver"
                          onClick={() =>
                            setDetalle(detalle?.id === inc.id ? null : inc)
                          }
                        >
                          {detalle?.id === inc.id ? "Cerrar" : "Ver detalle"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Panel de detalle expandido */}
          {detalle && (
            <div className="im-detalle-panel">
              <div className="im-detalle-body">
                {/* Imagen */}
                <div className="im-detalle-izq">
                  <span className="im-detalle-label">Imagen / Pruebas</span>
                  <div className="im-detalle-imagen">
                    {detalle.imagen ? (
                      <img src={detalle.imagen} alt="evidencia" />
                    ) : (
                      <div className="im-detalle-imagen-placeholder">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#bbb"
                          strokeWidth="1.2"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <line x1="3" y1="3" x2="21" y2="21" />
                          <line x1="21" y1="3" x2="3" y2="21" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Descripción */}
                <div className="im-detalle-der">
                  <span className="im-detalle-label">Descripción</span>
                  <p className="im-detalle-descripcion">
                    {detalle.descripcion}
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="im-detalle-acciones">
                <button
                  className="im-btn-espera"
                  onClick={() => setDetalle(null)}
                >
                  En espera
                </button>
                <button
                  className="im-btn-cerrar"
                  onClick={() => setDetalle(null)}
                >
                  Cerrar incidencia
                </button>
              </div>
            </div>
          )}

          {/* Barra seleccionadas */}
          {seleccionadas.length > 0 && (
            <div className="im-acciones-barra">
              <span>{seleccionadas.length} seleccionada(s)</span>
              <button
                className="im-btn-accion"
                onClick={() => setSeleccionadas([])}
              >
                Limpiar selección
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidenciasMantenimiento;
