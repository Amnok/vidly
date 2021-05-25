import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

export default function Table({ columns, sortColumn, onSort, data }) {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}
