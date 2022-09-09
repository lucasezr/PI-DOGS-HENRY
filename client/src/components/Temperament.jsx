import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTemperaments } from '../actions'

export default function () {
    const allTemps = useSelector((state)=> state.temperaments) // me trae del reducer el estado de temperaments
    const dispatch = useDispatch()

    useEffect (() => {
        dispatch(getAllTemperaments())
    }, [dispatch]) 

    return (
        allTemps && allTemps.map((el) => {
            return (
                <div> {el} </div>
            )
        }) 
    ) 
}