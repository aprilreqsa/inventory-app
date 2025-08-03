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
import { addCategory, Category,setCategory, updateCategory } from "@/lib/features/categorySlice";
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import LoaderSpinner from "../LoaderSpinner";


export default function AddCategory() {
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.category.category)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setCategory({
      ...category,
      [name]: value
    }))
    
  };
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
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
      setLoading(false)
    }
    const data: Category = await response.json();
    dispatch(setCategory({
      id:"",
      name: "",
      description:""
    }))
    dispatch(addCategory(data)); 
    setLoading(false)
  };
  const handleUpdate = async(e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    const response = await fetch(`/api/categories`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    })
    if(!response.ok){
      throw new Error("Failed to update")
      setLoading(false)
    }
    dispatch(updateCategory(category))
    dispatch(setCategory({
      id:"",
      name:"",
      description:""
    }))
    setLoading(false)
  }
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
                  value={category.name}
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
                  value={category.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {category.id ? 
          <Button 
          onClick={handleUpdate}
          className="w-full">
            {loading ? "Loading" : "Update Category"}
            {loading && <LoaderSpinner />}
            
          </Button> :
          <Button 
          onClick={handleSubmit}
          type="submit" 
          className="w-full">
            {loading ? "Loading" : "Add Category"}
            {loading && <LoaderSpinner />}
          </Button>
          }
          
          
          {category.id && 
          <Button 
          onClick={()=> dispatch(setCategory({
            id:"",
            name:"",
            description:""
          }))}
          className="w-full">
            Clear
          </Button>
          }
          
        </CardFooter>
      </Card>
  );
}
