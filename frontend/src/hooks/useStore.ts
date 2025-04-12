import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../entities/store/store"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()