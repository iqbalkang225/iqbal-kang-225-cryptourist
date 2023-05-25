import styles from './Markets.module.css'
import { useOutletContext } from "react-router-dom";

const Markets = () => {

    const coinData = useOutletContext();

    const { tickers } = coinData



    return (
        <div className = {styles.markets}>
            <div className = {styles.header}>
                <span> # </span>

                <span> Exchange </span>

                <span> Pair </span>

                <span> Volume  </span>

                <span className = {styles.link}> Trade at </span>
            </div>

            <ul>
                {   
                    tickers && 
                    tickers.map((ticker, index) => {
                        // console.log( ticker['trade_url'].slice(0,5))
                        return <li className = {styles.coin} key = {index}>
                            <span> {index + 1} </span>
                            <span> {ticker.market.name} </span>
                            <span> {ticker.base} / {ticker.target} </span>
                            <span> ${ticker.volume.toLocaleString()} </span>
                            <a 
                                className = {`${styles.link} ${styles.color}`}
                                href = {ticker['trade_url']}> 
                                {
                                    ticker['trade_url']
                                    ? ticker['trade_url'].slice(0, 30)
                                    : 'null'
                                } </a>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default Markets