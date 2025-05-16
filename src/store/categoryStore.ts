import { create } from "zustand";

 interface CategoryType {
  id: string;
  name: string;
  categoryImage: {
    public_id: string;
    secure_url: string;
  }[];
}

interface CategoryStore { 
  categories : CategoryType[];
  setCategories : ( item : CategoryType[]) => void ; 
  removeCategory : (id : string) => void
}

export const useCategoryStore = create<CategoryStore>((set) => ({
 categories : [] , 
 setCategories : (item) => set({categories : item}) , 
  removeCategory : (id)  => {
    set((state) => ({
      categories : state.categories.filter((item)=> item.id !== id )
    }))
  }
}))
