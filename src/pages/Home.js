import styles from './Home.module.css'
import Coin from "../components/Coin"
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import Button from '../components/Button'
import { useCoinsContext } from '../context/coins-context'
import { useState } from 'react'

const Home = () => {
    const coinsCtx = useCoinsContext()

    return (
        <main className = "section-center">

            <div className = {styles.location}>
                <span>Location:</span>
                <select onChange = {(e) => {coinsCtx.onChangeCurrency(e.target.value)}} value = {coinsCtx.selectedCurrency}>
                    <option value = "aud"> AUS </option>
                    <option value = "inr"> IND </option>
                    <option value = "gbp"> UK </option>
                    <option value = "usd"> USA </option>
                </select>
            </div>

            <div className = {styles.header}>
                <Button 
                    className = {styles.rank}
                    onClick = {coinsCtx.onSortRank} > 
                    <span> # </span>
                    {
                        coinsCtx.sortRank ? 
                        <BiChevronUp className = {`${styles.icon} ${styles.sorted}`} /> : 
                        <BiChevronDown className = {styles.icon} />
                    }
                </Button>

                <span> name </span>

                <Button
                    onClick = {coinsCtx.onSortPrice}> price({coinsCtx.selectedCurrency.toUpperCase()}) 
                    {
                        coinsCtx.sortPrice ? 
                        <BiChevronUp className = {`${styles.icon} ${styles.sorted}`} /> : 
                        <BiChevronDown className = {styles.icon} /> 
                    }
                    </Button>

                <Button className = {styles.supply}> supply </Button>

                <Button className = {styles['market-cap']}> market cap <BiChevronDown className = {styles.icon} /> </Button>

                <Button> 24hr% <BiChevronDown className = {styles.icon} /> </Button>
            </div>

            <ul>
                {
                    coinsCtx.filteredList.map(coin => {
                        
                        const coinData = {
                            id: coin.id,
                            symbol: coin.symbol,
                            name: coin.name,
                            image: coin.image,
                            price: coin['current_price'],
                            rank: coin['market_cap_rank'],
                            marketCap: coin['market_cap'],
                            percentageChange: coin['price_change_percentage_24h'],
                            supply: coin['total_supply'],
                            inWatchList: coin.inWatchList
                        }

                        // const {id, symbol, name, image, current_price: price,
                        //     market_cap: marketCap,
                        //     price_change_percentage_24h: percentageChange,
                        //     market_cap_rank: rank,
                        //     total_supply: supply} = coin

                        return <Coin key = {coin.id} {...coinData} />
                    })
                }
            </ul>

        </main>
    )
}

export default Home