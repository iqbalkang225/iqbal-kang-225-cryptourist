import styles from  './CoinPage.module.css'
import { useCoinsContext } from '../context/coins-context'
import { coinURL, coinHistory } from '../config/apiURL'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import ButtonsTab from '../components/ButtonsTab'
import { NavLink } from 'react-router-dom'
import img from '../assets/eth.svg'
import Chart from '../components/Chart'
import { BsArrowDownUp } from 'react-icons/bs'

const CoinPage = () => {
    const [coinData, setCoinData] = useState([])
    const [coinHistoryData, setCoinHistoryData] = useState([])
    const coinsCtx = useCoinsContext()
    const { id } = useParams()
    
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

    useEffect( () => {
        const selectedCurrency = coinsCtx.selectedCurrency;

        const fetchCoinHistory = async (id, days, currency) => {
            try {
                const response = await fetch(coinHistory(id, days, currency))
                const data = await response.json()
                setCoinHistoryData(data)
                console.log(coinHistoryData)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchCoinHistory(id, 365, selectedCurrency)
    }, [] )



    
    const {description, name, image,links, symbol, market_cap_rank: rank, market_data: data } = coinData

    if(!data) return;

    const getSelectedCurrencyData = (item) => data[item][coinsCtx.selectedCurrency]

    const formattedValue = (value) => Math.floor(value).toLocaleString()
 
    return (
        <main className = "section-center">
            <ButtonsTab>
                <NavLink to = "/" className = {`${styles.btn} ${styles.active}`} > OverView </NavLink>
                <NavLink to = "/" className = {styles.btn}> Markets </NavLink>
            </ButtonsTab>

            <div className = {styles['overview-container']}>
                <div className = {styles.overview}>

                    <div className = {styles.header}>
                        <div className = {styles['left-group']}>
                            <div className = {styles['name-group']}>
                                <img src = {image.large}/>
                                <p> {name} <span> ({symbol}) </span> </p>
                            </div>
                            <span className = {styles.price}> ${getSelectedCurrencyData('current_price')} </span>
                        </div>

                        <div className = {styles['right-group']}>
                            <div className = {styles['supply-group']}>
                                <p> total supply </p>
                                <p> { formattedValue(data['total_supply']) } </p>
                            </div>

                            <div className = {styles['supply-group']}>
                                <p> circulating supply </p>
                                <p> { formattedValue(data['circulating_supply']) } </p>
                            </div>

                            <div className = {styles['supply-group']}>
                                <p> max supply </p>
                                <p> {data['max_supply'] ? formattedValue(data['max_supply']) : "∞"} </p>
                            </div>

                        </div>
                    </div>

                    <div className = {styles.chart}>
                        <Chart history = {coinHistoryData} />
                    </div>
                </div>

                <div className = {styles.statistics}>
                    <h3> Btc statistics </h3>
                    <ul className = {styles.list}>
                        <li>
                            <p> Rank </p>
                            <p> { rank } </p>
                        </li>
                        <li>
                            <p>Market Cap</p>
                            <p> {formattedValue(getSelectedCurrencyData('market_cap'))} </p>
                        </li>
                        <li>
                            <p>24hr Low</p>
                            <p> {getSelectedCurrencyData('low_24h')} </p>
                        </li>
                        <li>
                            <p>24hr High</p>
                            <p>{ getSelectedCurrencyData('high_24h') }</p>
                        </li>
                        <li>
                            <p> Volume </p>
                            <p> {getSelectedCurrencyData('total_volume')} </p>
                        </li>
                        <li>
                            <p> All-Time High </p>
                            <p>{ getSelectedCurrencyData('ath') }</p>
                        </li>
                        <li>
                            <p> All-Time Low </p>
                            <p> {getSelectedCurrencyData('atl')} </p>
                        </li>
                        <li>
                            <p> Website </p>
                            <a className = {styles.link} href = {links.homepage[0]}> {links.homepage[0]} </a>
                        </li>

                        <li>
                            <p> Explorers </p>
                            <ul className = {styles.link}>
                                {links['blockchain_site'].map((link,index) => {
                                   if(index >= 2) return
                                   return <li key = {index}> 
                                        <a href = {link}> {link.slice(0, 20)} </a> 
                                    </li>                  
                                })}

                            </ul>
                            
                        </li> 

                        
                        
                    </ul>
                </div>

                <div className = {styles.info}>
                { description.en }
                </div>

                <div className = {styles.converter}>
                    <form className = {styles['input-group']}>
                        <span> Btc </span>
                        <input type = "number" />
                    </form>

                    <BsArrowDownUp className = {styles.icon} />

                    <form className = {styles['input-group']}>
                        <span> Usd </span>
                        <input type = "number" />
                    </form>
                </div>
            </div>
        </main>
    )
}

export default CoinPage