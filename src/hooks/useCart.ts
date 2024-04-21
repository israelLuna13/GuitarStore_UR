import { useState,useEffect } from 'react'
import { db } from '../data/db'
import { useMemo } from 'react'
import type {CartItem,Guitar} from '../types'


//solo debe haber logica aqui por eso es js 
const useCart = () =>{

    //validamos el en el localstorage hay algo, si lo hay mentenemos eso en el state 
    const initialCart= () :CartItem[] =>{

        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart): []
    }

    const initialFav = ():Guitar[] =>{
        const localStorageFav = localStorage.getItem('favoritos')
         return localStorageFav ? JSON.parse(localStorageFav): []
    }


    const [data] = useState(db)
    const [cart,setCart] = useState(initialCart)
    const [favoritos,setFavoritos] = useState(initialFav)
    //constantes
    const MAX_ITEM = 5
    const MEN_ITEM = 1

    //sincronizamos el localstorage con el carrito
    useEffect(()=>{

        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])

    
    //sincronizamos el localstorage con favoritos
    useEffect(()=>{
        localStorage.setItem('favoritos',JSON.stringify(favoritos))
    },[favoritos])

    //el state de react es asincrono
    function addToCart(item : Guitar){
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if(itemExists >= 0){//si existe en el carrtio
            const updateCart =[...cart] //tomamos una copia del state
            updateCart[itemExists].quantity++ // en la posicion donde se repita aumentamos el valor de cantidad
            setCart(updateCart)

        }else{
            const newItem : CartItem = {...item,quantity : 1}
            setCart([...cart,newItem])
        }


      }

      function addToFav(item :Guitar){
        const itemExists = favoritos.findIndex(guitar => guitar.id === item.id)
        if(itemExists >= 0){//si existe en el carrtio
           const updateFav = [...favoritos]
            setFavoritos(updateFav)
            // const updateCart =[...cart] //tomamos una copia del state
            // updateCart[itemExists].quantity++ // en la posicion donde se repita aumentamos el valor de cantidad
            // setCart(updateCart)

        }else{
            setFavoritos([...favoritos,item])
        }
        // }else{
        //     item.quantity = 1
        //     setCart([...cart,item])
        // }


      }

      function removeFromCart(id : Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))

      }

        function removeFromFav(id : Guitar['id']){
        setFavoritos(prevFav => prevFav.filter(guitar => guitar.id !== id))

      }

      //incrementar el numero de guitarras
      function increaseQuantity(id : Guitar['id']){
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEM ){
                return{
                    ...item,
                    quantity: item.quantity + 1

                }
            }
            return item
        })
        setCart(updateCart)
      }

      //decrementar el numero de guitarras
      function decrementQuantity (id : Guitar['id']){
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity > MEN_ITEM ){
                return{
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart)
      }

      function clearCart(){
        setCart([])
      }

        function clearFav(){
        setFavoritos([])
      }


      //state derivado

const isEmpty      =  useMemo(() => cart.length === 0,[cart])

const isEmptyFav   =  useMemo(() => favoritos.length === 0,[favoritos])
const cartTotal    =  useMemo( () =>cart.reduce((total,item) => total += (item.quantity * item.price),0),[cart])
    return {
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
        clearFav,
        isEmpty,
        cartTotal,
        isEmptyFav



    }
}

export default useCart