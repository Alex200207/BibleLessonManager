/* eslint-disable @typescript-eslint/no-explicit-any */

import DataTable from "react-data-table-component";

interface TableProps<T> {
  data: T[];
  columns: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyles: any;
}

const Table = <T,>({ data, columns, customStyles }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <DataTable
        columns={columns}
        data={data}
        pagination
        customStyles={customStyles}
      />
    </div>
  );
};

export default Table;
