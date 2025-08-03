"use client";
import { RootState } from "@/lib/store";
import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { setSuppliers, Supplier, setSupplier, removeSupplier } from "@/lib/features/supplierSlice";

export default function ListSuppliers() {
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/suppliers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!res.ok) {
        return Response.json({res})
      }
      const data: Supplier[] = await res.json();
      dispatch(setSuppliers(data)); // masukkan ke redux
    };

    fetchData();
  }, [dispatch]);
  const handleDelete = async (supplier : Supplier) => {
    const response = await fetch(`/api/suppliers/${supplier.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error("Failed to delete supplier");
    }
    dispatch(removeSupplier(supplier))
  };
  const handleEdit = async(supplier : Supplier) =>{
    dispatch(setSupplier({
      id: supplier.id,
      name: supplier.name,
      contact: supplier.contact,
      address: supplier.address
    }))
  }
  return (
    <Table className="max-w-md">
      <TableCaption>List Supplier</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Supplier Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((supplier, index) => (
          <TableRow key={supplier.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{supplier.name}</TableCell>
            <TableCell>{supplier.contact}</TableCell>
            <TableCell>{supplier.address}</TableCell>
            <TableCell className="space-x-2">
              <button
                onClick={() => handleDelete(supplier)}
                className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(supplier)}
                className="text-sm px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
