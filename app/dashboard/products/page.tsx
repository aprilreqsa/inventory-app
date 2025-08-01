
import AddProduct from "@/components/products/AddProduct";
import ListProducts from "@/components/products/ListProducts";


export default function Page(){
    
  
    return (
        <div className="grid grid-cols-2 gap-4 ">
            <AddProduct />
            <ListProducts />
        </div>
    )
    
}