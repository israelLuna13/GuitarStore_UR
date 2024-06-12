import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import { cartReducer, initialState } from "./reducers/cartReducer";

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  //sincronizamos el localstorage con el carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  //sincronizamos el localstorage con favoritos
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(state.fav));
  }, [state.fav]);

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
        favoritos={state.fav}
        cartTotal={0}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* muestra un componente por cada objeto en la bd
              cada objeto que itere el map debe de tener un id
            */}
          {state.data.map((guitar) => {
            return (
              <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
            );
          })}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
