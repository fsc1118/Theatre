import 'bootstrap/dist/css/bootstrap.css'
import { Image } from "react-bootstrap"
import "./MovieDescriptionSidebar.css"
import React, { useState, useEffect } from "react"

/**
 *
 * @author Min Lu
 *
 * The Seat Selection Component. Allow user to pick an available seat.
 * */
export let MovieDescriptionSidebar = (props: any) => {
    const text = "Harry Potter's (Daniel Radcliffe) third year at Hogwarts starts off badly when he learns deranged killer Sirius Black (Gary Oldman) has escaped from Azkaban prison and is bent on murdering the teenage wizard. While Hermione's (Emma Watson) cat torments Ron's (Rupert Grint) sickly rat, causing a rift among the trio, a swarm of nasty Dementors is sent to protect the school from Black. A mysterious new teacher helps Harry learn to defend himself, but what is his secret tie to Sirius Black?"
    return (
        <div className="MovieDescriptionSidebar">
            <h4 className="MovieDescriptionSidebar-h4">Harry Potter and the Prizoners of Azkaban</h4>
            <Image className="MovieDescriptionSidebar-img" src="https://barcodeindex.s3.amazonaws.com/images/636276592538.jpg"/>
            <p className="MovieDescriptionSidebar-p">{text}</p>
        </div>
    )

}