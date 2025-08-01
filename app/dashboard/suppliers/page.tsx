import AddSupplier from "@/components/suppliers/AddSupplier";
import ListSuppliers from "@/components/suppliers/ListSuppliers";


export default function Page(){
    
  
    return (
        <div className="grid grid-cols-2 gap-4 ">
            <AddSupplier />
            <ListSuppliers />
        </div>
    )
    
}