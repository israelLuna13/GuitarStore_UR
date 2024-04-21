import Header from './components/Header'
import Guitar from './components/Guitar'
import useCart from './hooks/useCart'

function App() {

    const { 
        data,
        cart,
        favoritos,
        addToCart,
        addToFav,
        removeFromCart,
        removeFromFav,
        decrementQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
        isEmptyFav,
    } = useCart()


  return (
    <>
    <Header
    cart={cart}
    removeFromCart = {removeFromCart}
    removeFromFav = {removeFromFav}
    increaseQuantity = {increaseQuantity}
    decrementQuantity = {decrementQuantity}
    clearCart = {clearCart}
    favoritos = {favoritos}
    isEmpty ={isEmpty}
    isEmptyFav = {isEmptyFav}
    cartTotal ={cartTotal}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {/* muestra un componente por cada objeto en la bd
              cada objeto que itere el map debe de tener un id
            */}
            {data.map((guitar) =>{
                return (
                    <Guitar
                    key ={guitar.id}
                    guitar = {guitar}
                    addToCart = {addToCart}
                    addToFav = {addToFav}
                    
                    />

                )
            })}


        </div>
    </main>
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
