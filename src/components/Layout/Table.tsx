/* eslint-disable @typescript-eslint/no-explicit-any */

import DataTable from "react-data-table-component";

interface TableProps<T> {
  data: T[];
  columns: any[];
  customStyles: any;
}

const Table = <T,>({ data, columns, customStyles }: TableProps<T>) => {
  return (
    <>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={data}
          pagination
          customStyles={customStyles}
        />
      </div>
      <footer className="text-center font-light text-gray-600 pt-5 ">
        <div >
          <strong className="hover:text-neutral-950">Project by Alex Talavera</strong>
        </div>
      </footer>
    </>
  );
};

export default Table;
