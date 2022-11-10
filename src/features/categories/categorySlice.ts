import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Result, Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  description: null | string;
}

const endpointUrl: string = "/categories";

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE"
  }
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getCategories: query<Results, void>({
      query: () => endpointUrl,
      providesTags: ["Categories"]
    }),
    deleteCategory: mutation<Result, {id: string}>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"]
      
    })
  })
})

const category: Category = {
  id: "69ac8640-c55d-5033-9e61-51d42f7d4592",
  name: "Olive",
  description: "Earum quo at dolor tempore nisi.",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:59:09+0000",
  updated_at: "2022-08-15T10:59:09+0000",
}

export const initialState = [
  category,
  {...category, id:"c3e067d5-0b9f-5379-9061-b3b5a93c015f", name: "Peach"},
  {...category, id:"2ae109f3-d5a2-5fb2-b812-95238f025408", name: "Apple"},
  {...category, id:"80cab0d3-8047-5024-a34d-f91b24acf729", name: "Banana"},
]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory(state, action){
      state.push(action.payload)
    },
    updateCategory(state, action){
      const index = state.findIndex(category => category.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteCategory(state, action){
      const index = state.findIndex(category => category.id === action.payload.id);
      state.splice(index, 1)
    },

  }
})

export const selectCategories = (state: RootState) => state.categories

export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find(category => category.id === id)

  return category || {
    id: "", 
    name: "", 
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    description: "", 
  }
}

export default categoriesSlice.reducer
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation
} = categoriesApiSlice