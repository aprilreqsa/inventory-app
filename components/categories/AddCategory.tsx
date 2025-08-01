"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory, Category } from "@/lib/features/categorySlice";

export default function AddCategory() {
  const dispatch = useDispatch();

  const [category, SetCategory] = useState<Category>({
    name: "",
    description: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetCategory((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    const data: Category = await response.json();
    SetCategory({
        name: "",
        description: "",
    })
    dispatch(addCategory(data)); // Dispatch the action to add the
  };
  return (
    
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h2 className="text-lg font-semibold">Categories</h2>
            <p className="text-sm text-gray-500">Manage your categories here.</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Category Name</Label>
                <Input
                  name="name"
                  id="name"
                  placeholder="Enter category name"
                  required
                  type="text"
                  value={category?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  name="description"
                  id="description"
                  placeholder="Enter category description"
                  required
                  type="text"
                  value={category?.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
          onClick={handleSubmit}
          type="submit" 
          className="w-full">
            Add Category
          </Button>
        </CardFooter>
      </Card>
  );
}
