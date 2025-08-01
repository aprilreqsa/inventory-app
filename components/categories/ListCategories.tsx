"use client";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
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
import { Category, setCategories } from "@/lib/features/categorySlice";

export default function ListCategories() {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: Category[] = await res.json();
      dispatch(setCategories(data));
    };

    fetchData();
  }, [categories]);
  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/categories`, {
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
    <Table className="max-w-sm">
      <TableCaption>List Categories</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Category Name</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>
              <button
                onClick={() =>{if(category?.id){handleDelete(category.id)}} }
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
