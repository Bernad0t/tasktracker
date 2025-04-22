import { createContext, useContext } from "react";

interface IManageTools{
    handleClose: () => void
}

export const ManageProjectModalContext = createContext<IManageTools | null>(null)
export const useGetManageProjectModalContext = () => useContext(ManageProjectModalContext)