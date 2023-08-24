import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    FilteredProduct: [],
    
}

const FilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_SEARCH( state, action){
        const {allUsers, search}= action.payload
        let newUsers
        if(search != ''){
            newUsers= allUsers.filter((user)=> user.name.toLowerCase().includes(search.toLowerCase()) )
        
        }
        state.FilteredProduct= newUsers
        
    },
    CLOSE_OPEN(state, action){

    }
  }
});

export const {FILTER_SEARCH} = FilterSlice.actions
export const selectFilteredProducts= (state)=> state.filter.FilteredProduct

export default FilterSlice.reducer