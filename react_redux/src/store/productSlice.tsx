import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Status = {
    status: "loading" | "idle" | "error",
}

const initialState: Status = {
    status: "idle"
}
const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: initialState.status,
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
        // remove(state, action) {
        //     return state.filter((item) => item.id !== action.payload)
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = "loading";

            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "idle";
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "error";
            })
    }
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunks : "a piece of code that does some delayed work" Rather than execute some logic now , we can write a function body or code that can be used to perform work later.
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
});
// export function fetchProducts() {
//     return async function fetchProductsThunk(dispatch, getState) {
//         dispatch(setStatus({ status: "loading" }))
//         try {
//             const res = await fetch("https://fakestoreapi.com/products");
//             const data = await res.json();

//             dispatch(setProducts(data))
//             dispatch(setStatus({ status: "idle" }))

//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus({ status: "error" }))

//         }
//     }
// }