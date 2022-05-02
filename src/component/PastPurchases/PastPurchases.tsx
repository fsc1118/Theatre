import { Container, Dropdown } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState, Fragment } from "react"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';

import './PastPurchases.css'

import { NoResults } from '../NoResults/NoResults'
import { getUsernameFromCookie } from "../../Util/Cookie_Utilities";

export let PastPurchases = (props: any) => {

    interface FilteredTicketPurchases {
        movie_name: string,
        purchase_datetime: string,
        show_datetime: string,
        ticket_price: number,
        room_id: number,
        seat_num: number
    }
    const username = getUsernameFromCookie()

    const [ minprice, setMinPrice ] = useState(0)
    const [ maxprice, setMaxPrice ] = useState(999999)
    const [ title, setTitle ] = useState("")
    const [ buttonClicked, setButtonClicked ] = useState(false)
    const [ resultsFound, setResultsFound ] = useState(true)
    const [ userId, setUserId ] = useState(-1)

    const [ tickets, setTickets ] = useState<FilteredTicketPurchases []>([])

    const getTicketPurchasesData = async(pricemin: number, pricemax: number, movietitle: string) => {
        const data_request = `/api/ticket/filter/userid=${username}_minprice=${pricemin}_maxprice=${pricemax}_title=${movietitle}`
    
        try {
            const response = await fetch(data_request);
            const data = await response.json()
            setTickets(data)
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const handleClick = (e: any) => {
        getTicketPurchasesData(minprice, maxprice, title)
        setButtonClicked(true)
    }

    function priceBoundsCheck (price: number, minormax: number) {
        var filterPrice = 0.0;
        if (!isNaN(price))
            filterPrice = price;
        if (filterPrice < 0) 
            filterPrice = 0;
        else if (filterPrice > 999999)
            filterPrice = 999999;
        if (minormax == 1)
            setMinPrice(filterPrice);
        else   
            setMaxPrice(filterPrice);
    }

    const getUserId = async(username: string) => {
        const userId_request = `/api/user/${username}`
        try {
            const response = await fetch(userId_request)
            const user_id_data = await response.json()
            setUserId(user_id_data)
        } catch (error) {
            console.log("Error: ")
            console.log(error)
        }
    }

    useEffect(() => {
        getTicketPurchasesData(minprice, maxprice, title)
        if (tickets.length == 0) {
            setResultsFound(false)
        } else {
            setResultsFound(true)
        }
        if (username) {
            getUserId(username)
        }
    }, [buttonClicked, tickets.length])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const rowLetters = ["A", "B", "C", "D", "E", "F"]


    return(        
    <Container className = "PastPurchases">
        <h1>My Past Ticket Purchases</h1>
        <div className = "Filters">
            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 2, minWidth: 120 }}>
                    <h4>Filters</h4>
                </FormControl>
                <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                    <TextField id="minprice"
                                label="MinPrice"
                                variant="outlined"
                                value={minprice}
                                type="number"
                                onChange={(e) => priceBoundsCheck(parseFloat(e.target.value), 1)}/>
                </FormControl>
                <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                    <TextField id="maxprice"
                                label="MaxPrice"
                                variant="outlined"
                                value={maxprice}
                                type="number"
                                onChange={(e) => priceBoundsCheck(parseFloat(e.target.value), 2)}/>
                </FormControl>
                <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                    <TextField id="title"
                                label="Title"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}/>
                </FormControl>
                <FormControl variant="outlined" sx={{ m: 2, minWidth: 120 }}>
                    <Button variant="outlined" onClick={(e) => handleClick(e)}>Filter</Button>
                </FormControl>
            </Box>
        </div>

        <Box sx={{ flexGrow: 1 }}>
            {resultsFound?
                <Grid container spacing={{ xs: 4, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {tickets.map((item, index) => (
                    <Grid item xs={2} sm={3} md={5} key={index}>
                        <Item>
                            <p><b>Movie name:</b> {item.movie_name}</p>
                            <p><b>Purchased on:</b> {new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(item.purchase_datetime))}</p>
                            <p><b>Showing on:</b> {new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(item.show_datetime))}</p>
                            <p><b>Room:</b> {item.room_id}</p>
                            <p><b>Seat number:</b> {rowLetters[Math.floor((item.seat_num-1)/5)]}{(item.seat_num%5)!=0?item.seat_num%5:5}</p>
                            <p><b>Ticket price:</b> {item.ticket_price}</p>
                        </Item>
                    </Grid>
                  ))}
                </Grid> : <NoResults />
            }
            </Box>
    </Container>)
}
