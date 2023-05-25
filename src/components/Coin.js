import styles from './Coin.module.css';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import Button from './Button';
import { useCoinsContext } from '../context/coins-context';
import { Link } from 'react-router-dom';

const Coin = (props) => {
  const coinsCtx = useCoinsContext();

  const toggleWatchList = () => {
    coinsCtx.onWatchList(props);
  };

  const { id, symbol, name, image, price, marketCap, percentageChange, rank, supply, inWatchList } = props;

  const addComma = (item) => item.toLocaleString('en-US');

  return (
    <li className={styles.coin}>
      <div className={styles['rank-group']}>
        <Button className={styles.watchlist} onClick={toggleWatchList}>
          {!inWatchList ? <AiOutlineStar /> : <AiFillStar className={styles['watchlist-added']} />}
        </Button>
        <span> {rank} </span>
      </div>

      <div className={styles['name-group']}>
        <img src={image} alt='coin-photo' className={styles.logo} />
        <Link to={`/${id}`}> {name} </Link>
        <span> {symbol} </span>
      </div>

      <span>
        {' '}
        {coinsCtx.currencySymbol} {addComma(price)}{' '}
      </span>

      <span className={styles.supply}> {supply ? addComma(supply) : `∞`} </span>

      <span className={styles['market-cap']}>
        {' '}
        {coinsCtx.currencySymbol} {addComma(marketCap)}{' '}
      </span>

      <div className={`${styles.net} ${percentageChange < 0 ? styles.loss : styles.profit} `}>
        <span> {<BiChevronDown />} </span>
        <span> {percentageChange.toFixed(2)}% </span>
      </div>
    </li>
  );
};

export default Coin;
