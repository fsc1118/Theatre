import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Main } from './component/main';
import { NotFound } from './component/NotFound/NotFound'
import { TicketPicker } from './component/TicketPicker/TicketPicker'
import { ReviewOrder } from './component/ReviewOrder/ReviewOrder'
import { UserSettings } from './component/UserSettings/UserSettings'
import { MovieMainPage } from './component/MovieMainPage/MovieMainPage'
import { FindMovie } from './component/FindMovie/FindMovie'

export let App = () => {

    return (
        <BrowserRouter>
            <div className="App">
                <Main />
                <Routes>
                    <Route path='/' element = {<MovieMainPage />} />
                    <Route path='/userSettings' element = {<UserSettings />} />
                    <Route path='/findMovie' element = {<FindMovie />} />
                    <Route path='/buyTicket/:movieId' element={<TicketPicker />} />
                    <Route path='/reviewOrder' element={<ReviewOrder />} />
                    <Route path='/movies/all' element={<MovieMainPage />} />
                    <Route path='/movies/showing' element={<MovieMainPage />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

