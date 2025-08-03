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
import { useDispatch, useSelector } from "react-redux";
import { addSupplier, setSupplier, Supplier, updateSupplier } from "@/lib/features/supplierSlice";
import { RootState } from "@/lib/store";
import LoaderSpinner from "../LoaderSpinner";

export default function AddCategory() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const supplier = useSelector((state: RootState) => state.supplier.supplier)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setSupplier({
      ...supplier,
      [name]: value
    }))
  };
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    const response = await fetch("/api/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    });
    if (!response.ok) {
      throw new Error("Failed to add supplier");
    }
    const data : Supplier = await response.json();
    dispatch(setSupplier({
      id:"",
      name:"",
      contact:"",
      address:""
    }))
    dispatch(addSupplier(data));
    setLoading(false)
  };
  const handleEdit = async(e : React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    const response = await fetch(`/api/suppliers/${supplier.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({supplier})
    })
    if(!response.ok) {
      throw new Error("Failed to update supplier")
    }
    dispatch(updateSupplier(supplier))
    dispatch(setSupplier({
      id:"",
      name:"",
      contact:"",
      address:""
    }))
    setLoading(false)
  }
  return (
    
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h2 className="text-lg font-semibold">Supplier</h2>
            <p className="text-sm text-gray-500">Manage your suppliers here.</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Supplier Name</Label>
                <Input
                  name="name"
                  id="name"
                  placeholder="Enter category name"
                  required
                  type="text"
                  value={supplier.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Contact</Label>
                <Input
                  name="contact"
                  id="contact"
                  placeholder="Enter category contact"
                  required
                  type="text"
                  value={supplier.contact}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Address</Label>
                <Input
                  name="address"
                  id="address"
                  placeholder="Enter category address"
                  required
                  type="text"
                  value={supplier.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {supplier.id ?
          <Button 
          onClick={handleEdit}
          className="w-full">
            {loading ? "Loading..." : "Update"}
            {loading && <LoaderSpinner />}
          </Button> :
          <Button 
          onClick={handleSubmit}
          type="submit" 
          className="w-full">
            {loading ? "Loading..." : "Add Supplier"}
            {loading && <LoaderSpinner />}
          </Button>
          }
          {supplier.id &&
          <Button
          className="w-full"
          onClick={()=> dispatch(setSupplier({
            id:"",
            name:"",
            contact:"",
            address:""
          }))}
          >
            Clear
          </Button>
          }
          
        </CardFooter>
      </Card>
  );
}
