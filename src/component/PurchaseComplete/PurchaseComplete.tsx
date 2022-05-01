import 'bootstrap/dist/css/bootstrap.css'
import { Container, Button } from "react-bootstrap";
import React, { useState, useEffect} from "react"
import { useLocation, useNavigate } from "react-router-dom"


import './PurchaseComplete.css'

export let PurchaseComplete = (props: any) => {
    type PurchaseInfo = {
        movie_name?: string,
        total_paid?: string
    }

    const {state} = useLocation() as { state: PurchaseInfo }
    const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo>({})

    useEffect(() => {
        setPurchaseInfo(state)
        return () => {}
    }, [state])

    const navigate = useNavigate()

    function goBackHome() {
        navigate('/')
    }

    return (
        <>
        { purchaseInfo != {} ?
        <Container className = "PurchaseComplete">
            <br></br>
            <br></br>
            <h1 className="text-center">Order Complete. Your Ticket Has Been Purchased!</h1>
            <br></br>
            <h3 className="text-center">Movie: {purchaseInfo.movie_name}</h3>
            <h3 className="text-center">Total Paid: {purchaseInfo.total_paid}</h3>
            <Button className="PurchaseComplete-btn"
                onClick={(e: any) => goBackHome()}>
                Home
            </Button>
        </Container> :
        undefined}
        </>
    )
}