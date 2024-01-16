import { createSlice } from "@reduxjs/toolkit";
//const[count,setCount]=useState()
//const[name,setName]=useState('manu')
const INITIAL_STATE =
   {
     user:{}
    }

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
  setUser:(state,action)=>{
   state.user=action.payload
  }
  }
})

export const {setUser}=userSlice.actions
export default userSlice.reducer  
