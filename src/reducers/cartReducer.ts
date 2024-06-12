import { Guitar, CartItem, FavItem } from "../types";
import { db } from "../data/db";

export type CartActions =
  ////these actions were functions that were in folder useState
  | { type: "add-to-cart"; payload: { item: Guitar } }
  | { type: "add-to-fav"; payload: { item: Guitar } }
  | { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
  | { type: "remove-from-fav"; payload: { id: Guitar["id"] } }
  | { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
  | { type: "increase-quantity"; payload: { id: Guitar["id"] } }
  | { type: "clear-cart" };

//constantes
const MAX_ITEM = 5;
const MEN_ITEM = 1;

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
  fav: FavItem[];
};

// if localstorage is empty return a array empty
const initialFav = (): CartItem[] => {
  const localStorageFav = localStorage.getItem("favoritos");
  return localStorageFav ? JSON.parse(localStorageFav) : [];
};

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

//State initial
export const initialState: CartState = {
  data: db,
  cart: initialCart(),
  fav: initialFav(),
};

//funtions to execute
export const cartReducer = (
  state: CartState = initialState,

  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    let updateCart: CartItem[];
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );
    if (itemExists) {
      //si existe en el carrtio
      updateCart = state.cart.map((item) => {

          //si la guitarra que se esta agregando es igual a la que ya esta en el state     
        if (item.id === action.payload.item.id) {
          //si canatidad de una guitarra todavia es menor a 5 , el usuario solo puede agreagr 5 veces una misma guitarra
          if (item.quantity < MAX_ITEM) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
      //si es la primera vez que selecciona una guitarra o una diferente a la que esta en el state
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      //guardamos una copia del state.cart y le sumamaos el newitem
      updateCart = [...state.cart, newItem];
    }
    return {
      ...state,
      cart: updateCart,
    };
  }

  //es igual que la funcion addtocart
  if (action.type === "add-to-fav") {
    const itemExists = state.fav.find(
      (guitar) => guitar.id === action.payload.item.id
    );
    let updateFav: FavItem[];
    if (itemExists) {
      //si existe en el carrtio
      updateFav = state.fav.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity === MEN_ITEM) {
            return { ...item };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem: FavItem = { ...action.payload.item, quantity: 1 };
      updateFav = [...state.fav, newItem];
    }
    return {
      ...state,
      fav: updateFav,
    };
  }

  
  if (action.type === "remove-from-cart") {
    const updateCart = state.cart.filter(
      (item) => item.id !== action.payload.id
    );
    return {
      ...state,
      cart: updateCart,
    };
  }

  if (action.type === "remove-from-fav") {
    const updateFav = state.fav.filter((item) => item.id !== action.payload.id);

    //  setFavoritos((prevFav) => prevFav.filter((guitar) => guitar.id !== id));

    return {
      ...state,
      fav: updateFav,
    };
  }

  //metodo para reducir la cantidad de una guitarra
  if (action.type === "decrease-quantity") {

    const updateCart = state.cart.map((item) => {
      //si el id que ya esta en el state es igual al id que llega y por lo menos hay una 1 de una guitarra
      if (item.id === action.payload.id && item.quantity > 1) {
        
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart: updateCart,
    };
  }

  if (action.type === "increase-quantity") {
    const updateCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < 5) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: updateCart,
    };
  }

  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
