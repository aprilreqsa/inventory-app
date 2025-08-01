"use client";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product, setProducts } from "@/lib/features/productSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function ListProducts() {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: Product[] = await res.json();
      dispatch(setProducts(data)); // masukkan ke redux
    };

    fetchData();
  }, [products]);
  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/products`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete supplier");
    }
  };
  return (
    <Table>
      <TableCaption>List Product</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description || "No description"}</TableCell>
            <TableCell>
              {product.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </TableCell>
            <TableCell>
              <button
                onClick={() => handleDelete(product?.id!)}
                className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
