

import '../styles/globals.css'
import React, {useEffect} from 'react';
import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter();

  
  useEffect(() => {
    router.events.on('routeChangeComplete', () => setProgress(100))
    router.events.on('routeChangeStart', () => setProgress(40))
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
        const localCart = JSON.parse(localStorage.getItem('cart'))
        calcSubTotal(localCart)
        }
    } catch (error) {
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setUser({value:myuser.token, email:myuser.email})
    }
    setKey(Math.random())
    
  }, [router.query])

  const calcSubTotal = (cart) => {
    let subt = 0
    let keys = Object.keys(cart)
    for (let i = 0; i< Object.keys(cart).length; i++) {
      subt += cart[keys[i]].qty * cart[keys[i]].price
    }
    setSubTotal(subt)
  }

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0
    let keys = Object.keys(myCart)
    for (let i = 0; i< keys.length; i++) {
      subt += myCart[keys[i]].qty * myCart[keys[i]].price
    }
    setSubTotal(subt)
  }

const addToCart = (itemCode, qty, price, name) => {
    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else {
      newCart[itemCode] = {qty:1, price, name}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  const removeFromCart = (itemCode, qty, price, name) => {
    let newCart = cart
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }

    saveCart(newCart)
    setCart(newCart)
  }

  const buyNow = (itemCode, qty, price, name) => {
    let newCart = {}
    newCart[itemCode] = {qty, price, name}
    setCart(newCart)
    saveCart(newCart)
    addToCart(itemCode, 1, 12, name)
    router.push('/checkout')
  }

  const logout = () => {
    localStorage.removeItem('myuser')
    clearCart()
    setUser({value:null})
    setKey(Math.random())
    router.push("/")
  }

  return (
    <>
    <LoadingBar color = "#f11946" progress = {progress} waitingTime = {500} onLoadFinished = {()=>setProgress(0)}/>
    <Navbar2 logout={logout} user = {user} key={key} cart = {cart} addToCart = {addToCart} removeFromCart = {removeFromCart} clearCart = {clearCart} subTotal = {subTotal}/>
    <Component buyNow = {buyNow} cart = {cart} addToCart = {addToCart} removeFromCart = {removeFromCart} clearCart = {clearCart} subTotal = {subTotal} {...pageProps} />
    <Footer/>
    </>
  )
}

export default MyApp
