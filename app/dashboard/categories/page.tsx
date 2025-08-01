import AddCategory from "@/components/categories/AddCategory";
import ListCategories from "@/components/categories/ListCategories";


export default function Page(){
    
  
    return (
        <div className="grid grid-cols-2 gap-4 ">
            <AddCategory />
            <ListCategories />
        </div>
    )
    
}