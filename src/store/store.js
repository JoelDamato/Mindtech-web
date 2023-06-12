import { create } from "zustand";
import axios from "axios";
import apiUrl from "../../api";

const useStore = create((set) => ({
  allProducts: [],
  getAllProducts: async () => {
    try {
      const response = await axios.get(apiUrl + "products/all");
      set({ allProducts: response.data.products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  oneProduct: [],
  getOneProduct: async (id) => {
    try {
      const response = await axios.get(apiUrl + "products/one?one=" + id);
      set({ oneProduct: response.data.product });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  login: async (token) => {
    try {
      set({ token: token });
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  },
  logout: async () => {
    try {
      set({ token: undefined });
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  },
  selectCheckboxes: [],
  setSelectCheckboxes: (checkboxes) =>
  set((state) => ({
  selectCheckboxes: checkboxes,
    })),
  deleteProducts: async (dataDelete) => {
    try {
        await axios.delete('http://localhost:3000/products/delete', dataDelete);
        console.log('borrado con exito');
      } catch (err) {
        console.log(err);
    }
  },
  createProduct: async (newProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products/create",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error(error.message);
    }
  },

}));

export default useStore;
