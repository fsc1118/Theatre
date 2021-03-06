import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from "react"

import { Main } from './component/main';
import { NotFound } from './component/NotFound/NotFound'
import { TicketPicker } from './component/TicketPicker/TicketPicker'
import { ReviewOrder } from './component/ReviewOrder/ReviewOrder'
import { UserSettings } from './component/UserSettings/UserSettings'
import { MovieMainPage } from './component/MovieMainPage/MovieMainPage'
import { ShowingMovies } from './component/ShowingMoviesFilterPage/ShowingMovies'
import { AllMovies } from './component/AllMovies/AllMovies'
import { PurchaseComplete } from './component/PurchaseComplete/PurchaseComplete'
import { PastPurchases } from './component/PastPurchases/PastPurchases'
import { TopMovies } from './component/TopMovies/TopMovies'

import { getUsernameFromCookie } from "./Util/Cookie_Utilities";

import './App.css'

export let App = () => {

    const [isLogin, setIsLogin] = useState(getUsernameFromCookie() !== null)

    useEffect(()=>{
        let timer = setInterval(()=>{
            setIsLogin(getUsernameFromCookie() !== null)
        }, 500)
        return ()=> {
            clearInterval(timer)
        }
    })

    return (
        <BrowserRouter>
            <div className="App">
                <Main />
                <Routes>
                    <Route path='/' element = {<MovieMainPage />} />
                    <Route path='/index.html' element = {<MovieMainPage />} />
                    <Route path='/user' element={<UserSettings/>}/>
                    <Route path='/past_purchases' element={<PastPurchases />} />
                    <Route path='/topMovies' element = {<TopMovies />} />
                    <Route path='/buyTicket/:movieId' element={isLogin? <TicketPicker /> : <Navigate to="/" />} />
                    <Route path='/reviewOrder' element={isLogin? <ReviewOrder /> : <Navigate to="/" />} />
                    <Route path='/movies/all' element={<AllMovies />} />
                    <Route path='/movies/showing' element={<ShowingMovies />} />
                    <Route path='/purchaseComplete' element={<PurchaseComplete />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <footer><p>Copyright &copy; 2022 CS 348 Group 25</p></footer>
            </div>
        </BrowserRouter>
    );
}

