import { useCoinsContext } from '../context/coins-context'
import Coin from './Coin'
import styles from './WatchList.module.css'

const WatchList = () => {

    const coinsCtx = useCoinsContext()
    console.log(coinsCtx.watchList)

    return (
        <div className = {styles.watchlist}>
            <h3> WatchList </h3>
            <ul className = {styles.WatchList}>
                {
                    coinsCtx.watchList.map(coin => {
                        return <Coin key = {coin.id} {...coin} />
                    })
                }
            </ul>
        </div>
    )
}

export default WatchList