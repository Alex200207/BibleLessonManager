/* eslint-disable @typescript-eslint/no-explicit-any */

import DataTable from "react-data-table-component";

interface TableProps<T> {
  data: T[];
  columns: any[];
}

const Table = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <>
      <div className="overflow-x-auto ">
        {" "}
        {/* Contenedor con Tailwind */}
        <DataTable
          columns={columns}
          data={data}
          pagination
          customStyles={{
            table: {
              style: {
                border: "1px solid #d2d6dc", // Borde delgado para la tabla
                outline: "none",
                borderRadius: " 12px 12px 0 0 ",
                overflow: "hidden",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              },
            },
            headCells: {
              style: {
                backgroundColor: "#f8fafc",
                color: "#000", // Color blanco para el encabezado
                fontWeight: "bold",
                textTransform: "uppercase",
                // "&:hover": {
                //   backgroundColor: "#374151", // Fondo oscuro cuando se pasa el mouse
                // },
                ".dark &": {
                  backgroundColor: "#2d3748", // Fondo más oscuro para el modo oscuro
                  color: "#e2e8f0", // Texto más claro en modo oscuro
                },
              },
            },
            cells: {
              style: {
                padding: "0.75rem",
                fontSize: "14px",
                textAlign: "center",
                ".dark &": {
                  color: "#e5e7eb", // Texto claro en modo oscuro
                },
              },
            },
            rows: {
              style: {
                backgroundColor: "#f9fafb", // Fondo claro para filas en modo claro
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "#ebf4ff", // Fondo claro al pasar el ratón
                },
                ".dark &": {
                  color: "#e5e7eb", // Texto claro en filas en modo oscuro
                  backgroundColor: "#1a202c", // Fondo más oscuro en modo oscuro
                  "&:hover": {
                    backgroundColor: "#2d3748", // Fondo más oscuro al pasar el ratón
                  },
                },
              },
            },
            pagination: {
              style: {
                backgroundColor: "#edf2f7", // Fondo claro para la paginación
                color: "#4a5568", // Color del texto en modo claro
                borderRadius: "0 0 12px 12px",
                ".dark &": {
                  backgroundColor: "#2d3748", // Fondo oscuro en la paginación
                  color: "#cbd5e0", // Texto más claro en modo oscuro
                },
              },
            },
          }}
        />
      </div>
      <footer className="text-center text-lg mt-5 rounded-md bg-slate-100 dark:bg-black dark:text-white text-zinc-700 pt-5 pb-5 underline ">
        Created By Alex Talavera
      </footer>
    </>
  );
};

export default Table;
