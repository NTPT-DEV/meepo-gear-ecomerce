import { useState } from "react"
import FormCategory from "./FormCategory"
import ListCategory from "./ListCategory"


const CategoryDashboard = () => {
  const [updateAddCategory , setUpdateAddCategory] = useState<boolean>(false)

  return (
    <div>
      <FormCategory setUpdateAddCategory={setUpdateAddCategory}/> 
      <ListCategory updateAddCategory={updateAddCategory} />
    </div>
  )
}
export default CategoryDashboard