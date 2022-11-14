import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Category, useGetCategoryQuery, useUpdateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {
  const id = useParams().id || "";
  const {data: category, isFetching} = useGetCategoryQuery({id});
  const [updateCategory, status] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>({
    id: "", 
    name: "", 
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    description: "", 
  })

  const dispatch = useAppDispatch();
  const { enqueueSnackbar} = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updateCategory(categoryState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setCategoryState({...categoryState, [name]:value})
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target
    setCategoryState({...categoryState, [name]:checked})
  }

  useEffect(() => {
    if(category) {
      setCategoryState(category.data)
    }
  }, [category])

  useEffect(()=> {
    if (status.isSuccess){
      enqueueSnackbar("Category updated successfully!", {variant: "success"});
    } else if (status.error) {
      enqueueSnackbar("Category not updated!", {variant: "error"});
    }
  }, [enqueueSnackbar, status])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isDisabled={status.isLoading}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  )
}