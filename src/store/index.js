import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import companyDetailsSlice from './slices/companyDetailsSlice';
import vacancySlice from './slices/vacancySlice';



const store = configureStore({
    reducer: {
        user: userSlice,
        companyDetails: companyDetailsSlice,
        vacancy: vacancySlice
    },
})

export default store