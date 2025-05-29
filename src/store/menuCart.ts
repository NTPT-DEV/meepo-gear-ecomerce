
import { create } from 'zustand'


type menuCartTypeStore = { 
    menuCart : boolean 
    handleMenuCart : () => void
}

export const useMenuCartStore = create<menuCartTypeStore>((set) => ({
    menuCart : false , 

    handleMenuCart : () => 
    set((state) => ({ 
    menuCart : !state.menuCart
    }))
}))



