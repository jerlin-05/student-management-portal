import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    setStudents: (state, action) => action.payload,
    addStudent: (state, action) => { state.push(action.payload); },
    deleteStudent: (state, action) => state.filter(s => s.id !== action.payload),
    updateStudent: (state, action) => {
      const index = state.findIndex(s => s.id === action.payload.id);
      if (index >= 0) state[index] = action.payload;
    }
  },
});

export const { setStudents, addStudent, deleteStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
