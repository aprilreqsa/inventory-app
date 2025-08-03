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
import { Category, removeCategory, setCategories, setCategory } from "@/lib/features/categorySlice";

export default function ListCategories() {
  const category = useSelector((state: RootState) => state.category.category)
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
  }, [dispatch]);
  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error("Failed to delete supplier");
    }
    dispatch(removeCategory({id}))
  };
  const handleEdit = async(category : Category) => {
    dispatch(setCategory({
      id: category.id,
      name: category.name,
      description: category.description
    }))
  }
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
            <TableCell className="space-x-2">
              <button
                onClick={() => {if(category.id) {
                  handleDelete(category.id)}}}
                className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
              onClick={()=> handleEdit(category)}
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
