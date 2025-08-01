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
import { addSupplier, Supplier } from "@/lib/features/supplierSlice";

export default function AddCategory() {
  const dispatch = useDispatch();

  const [supplier, SetSupplier] = useState<Supplier>({
    name: "",
    contact: "",
    address: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetSupplier((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    const data : Supplier = await response.json();
    SetSupplier({
        name: "",
        contact: "",
        address: ""
    })
    dispatch(addSupplier(data));
  };
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
                  value={supplier?.name}
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
                  value={supplier?.contact}
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
                  value={supplier?.address}
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
            Add Supplier
          </Button>
        </CardFooter>
      </Card>
  );
}
