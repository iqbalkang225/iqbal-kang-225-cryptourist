import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { BiMenuAltRight } from 'react-icons/bi'
import { useRef, useState } from "react"
import 'animate.css';
import { useCoinsContext } from "../context/coins-context"
import WatchList from "./WatchList"

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    const [enteredCoin, setEnteredCoin] = useState('')

    const coinsCtx = useCoinsContext()

    const searchRef = useRef()

    const toggleNavList = () => setIsOpen(prevState => !prevState)

    const onChangeHandler = (e) => {
        setEnteredCoin(e.target.value)
        coinsCtx.onSearch(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        coinsCtx.onSearch(enteredCoin)
        toggleNavList()
        setEnteredCoin('')
        searchRef.current.focus()
    }

    return (
        <nav className = {styles.navbar}>

            <Link to = '/' className = {styles.logo} >
                <img src = {logo} alt = "cryptourist logo" />
            </Link>

            <button 
                className = {`btn ${styles['nav-open']}`}
                onClick = {toggleNavList} > 
            { <BiMenuAltRight/> } 
            </button>

            {
                isOpen &&
                <div className = {styles.backdrop}></div>
            }

            <ul className = {`${styles['nav-list']} ${isOpen ? styles['show'] : ''}`}>
                <li> <Link to = '/' onClick = {toggleNavList}> home </Link> </li>
                <li> <Link to = '/' onClick = {toggleNavList} className={styles.news}> news </Link> </li>
                <li> <Link to = '/watchlist' onClick = {toggleNavList}> watchlist </Link> </li>
            </ul>      

            <form 
                onSubmit = {onSubmitHandler}
                className = {`${styles.search} ${isOpen ? styles['show'] : ''}`}>
                <input
                    type = "text"
                    placeholder = "Enter coin name"
                    ref = {searchRef}
                    value = {enteredCoin}
                    onChange = {onChangeHandler}
                />
                <button className = {`btn ${styles['search-btn']}`}> Search </button>
            </form>      
        </nav>
    )
}

export default Navbar