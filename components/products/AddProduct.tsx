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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Product } from "@/lib/features/productSlice";
import { Category } from "@/lib/features/categorySlice";
import { Supplier } from "@/lib/features/supplierSlice";

export default function AddProduct() {
  
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSupplier, setSelectSupplier] = useState("");
  
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data : Category[] = await response.json();
      setCategories(data);
    };
    const fetchSuppliers = async () => {
      const response = await fetch("/api/suppliers");
      if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
      }
      const data : Supplier[] = await response.json();
      setSuppliers(data);
    };
    fetchSuppliers();
    fetchCategories();
  }, []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [product, SetProduct] = useState<Product>({
    name: "",
    description: "",
    price: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      setSelectCategory(value);
      SetProduct((prev) => ({ ...prev, categoryId: value }));
    } else if (name === "supplierId") {
      setSelectSupplier(value);
      SetProduct((prev) => ({ ...prev, supplierId: value }));
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData : Product = {name: product.name, description: product.description, price: Number(product.price), categoryId: selectCategory, supplierId: selectSupplier };
    
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    SetProduct({
      name: "",
      description: "",
      price: "",
    });
    setSelectCategory("");
    setSelectSupplier("");
  };
  return (
    
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-sm text-gray-500">Manage your products here.</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Product Name</Label>
                <Input
                  name="name"
                  id="product"
                  placeholder="Enter product name"
                  required
                  type="text"
                  value={product?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  name="description"
                  id="product"
                  placeholder="Enter product description"
                  required
                  type="text"
                  value={product?.description}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Price</Label>
                <Input
                  name="price"
                  id="product"
                  placeholder="Enter product price"
                  required
                  type="number"
                  value={product?.price}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Choose Category</Label>
                <select
                  className="border rounded p-2 w-full"
                  name="categoryId"
                  id="category"
                  value={selectCategory}
                  onChange={handleChangeSelect}
                >
                  <option value="">Select Category</option>
                  {categories.map((category: Category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label>Choose Supplier</Label>
                <select
                  className="border rounded p-2 w-full"
                  name="supplierId"
                  id="supplier"
                  value={selectSupplier}
                  onChange={handleChangeSelect}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier: Supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
          onClick={handleSubmit}
          type="submit" 
          className="w-full">
            Add Product
          </Button>
        </CardFooter>
      </Card>
  );
}
