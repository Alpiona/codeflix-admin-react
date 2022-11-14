import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Category, useCreateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";


export const CategoryCreate = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [createCategory, status] = useCreateCategoryMutation();
  const [isDisabled, setIsDisabled] =  useState(false)
  const [categoryState, setCategoryState] = useState<Category>({
    id: "", 
    name: "", 
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    description: "", 
  })


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCategory(categoryState);
    enqueueSnackbar("Success creating category!", {variant:"success"})
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
    if(status.isSuccess){
      setIsDisabled(true)
      enqueueSnackbar("Category created successfully!", {variant: "success"})
    } else if(status.error){
      enqueueSnackbar("Category not created!", {variant: "error"})
    }
  }, [status, enqueueSnackbar])

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>

        <CategoryForm
          category={categoryState}
          isDisabled={isDisabled}
          isLoading={false}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  )
}