import { useCoinsContext } from '../context/coins-context'
import Coin from './Coin'
import styles from './WatchList.module.css'

const WatchList = () => {

    const coinsCtx = useCoinsContext()
    

    const watchList = coinsCtx.coinsList.filter(coin => {
        return coin.inWatchList === true
    })

    return (
        <div className = {styles.watchlist}>
            <h3> WatchList </h3>
            <ul className = {styles.WatchList}>
                {
                    watchList.length < 1 ? <p> No coins in WatchList </p> :
                    watchList.map(coin => {

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

                        return <Coin key = {coin.id} {...coinData} />
                    })
                }
            </ul>
        </div>
    )
}

export default WatchList