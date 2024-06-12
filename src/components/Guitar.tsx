import type { Guitar } from "../types";
import type { CartActions } from "../reducers/cartReducer";
import { Dispatch } from "react";

//tipado de los props , cuando pasan a otros componente pierden su tipo de dato
type GuitarProps = {
  guitar: Guitar;
  dispatch: Dispatch<CartActions>;
};

function Guitar({ guitar, dispatch }: GuitarProps) {
  
  const { name, image, description, price } = guitar;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          // el dispatch manda llamar la accion a ejecutar y se le pasa el argumento que necesita
          onClick={() =>
            dispatch({ type: "add-to-cart", payload: { item: guitar } })
          }
        >
          Agregar al Carrito
        </button>

        <button
          type="button"
          className="btn btn-dark w-100"
         // el dispatch manda llamar la accion a ejecutar y se le pasa el argumento que necesita

          onClick={() =>
            dispatch({ type: "add-to-fav", payload: { item: guitar } })
          }
        >
          Agregar a favoritos
        </button>
      </div>
    </div>
  );
}

export default Guitar;
