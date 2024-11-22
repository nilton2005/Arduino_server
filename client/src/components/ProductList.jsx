import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

const ProductList = ({ products, onUpdateStock }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Precio</TableCell>
          <TableCell>Stock</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onUpdateStock(product.id, product.stock + 1)}
              >
                +1 Stock
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductList;
