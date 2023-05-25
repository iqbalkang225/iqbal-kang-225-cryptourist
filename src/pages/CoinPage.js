import styles from  './CoinPage.module.css'

import ButtonsTab from '../components/ButtonsTab'
import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { coinURL } from '../config/apiURL'
import { useParams } from 'react-router'

const CoinPage = () => {
    const { id } = useParams()

    const [coinData, setCoinData] = useState([])

    useEffect( () => {
        const fetchCoinList = async (id) => {
            try {
                const response = await fetch(coinURL(id))
                const data = await response.json()
                setCoinData(data)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchCoinList(id)
    }, [] )


    return (
        <main className = "section-center">
            <ButtonsTab>
                <NavLink 
                    to = ""
                    end = {true}
                    className = { ({isActive}) => isActive ? `${styles.btn} ${styles.active}` : styles.btn }
                    > OverView </NavLink>
                <NavLink 
                    to = "markets"
                    className = { ({isActive}) => isActive ? `${styles.btn} ${styles.active}` : styles.btn }
                > Markets </NavLink>
            </ButtonsTab>

            { <Outlet context = {coinData} /> }

            
        </main>
    )
}

export default CoinPage