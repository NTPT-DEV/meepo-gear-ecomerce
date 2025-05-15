// import { create } from "zustand";


export interface CategoryType {
  id: string;
  name: string;
  categoryImage: {
    public_id: string;
    secure_url: string;
  }[];
}