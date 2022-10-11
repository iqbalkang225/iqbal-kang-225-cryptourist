import { createContext, useContext, useEffect, useReducer } from "react"
import { coinsURL } from '../config/apiURL'

const CoinsContext = createContext()

const initialState = {
    coinsList: [],
    filteredList: [],
    watchList: [],
    selectedCurrency: 'usd',
    currencySymbol: "$",
    // sortRank: false
}

const currencySymbols = [
    { name: 'inr', symbol: "₹" },
    { name: 'usd', symbol: "$" },
    { name: 'gbp', symbol: "£" },
    { name: 'aud', symbol: "$" }
]

const coinsReducer = (state, action) => {
    switch(action.type) {
        case "LOAD_COINS":
            return {
                ...state,
                coinsList : action.coins,
                filteredList: action.coins
            }
        
        case "SEARCH":
            const enteredCoin = action.name.toLowerCase()
            const filteredCoins = state.coinsList.filter(coin => coin.name.toLowerCase().includes(enteredCoin))
            return {...state, filteredList: filteredCoins}

        case "SORT_BY_RANK":
            if(state.sortRank) {
                const sortedArray = state.coinsList.sort( (a, b) => a.market_cap_rank - b.market_cap_rank )
                return {...state, filteredCoins: sortedArray, sortRank: false}
            }
            else {
                const sortedArray = state.coinsList.sort( (a, b) => b.market_cap_rank - a.market_cap_rank )
                return {...state, filteredCoins: sortedArray, sortRank: true}
            }

        case "SORT_BY_PRICE":
            if(state.sortPrice) {
                const sortedArray = state.coinsList.sort( (a, b) => a.current_price - b.current_price )
                return {...state, filteredCoins: sortedArray, sortPrice: false}
            }
            else {
                const sortedArray = state.coinsList.sort( (a, b) => b.current_price - a.current_price )
                return {...state, filteredCoins: sortedArray, sortPrice: true}
            }

        case "CHANGE_CURRENCY":
            const country = currencySymbols.find(item => item.name === action.value)
            return {...state, selectedCurrency: action.value, currencySymbol: country.symbol}
        
        case "ADD_TO_WATCHLIST":
            // const coinIndex = state.watchList.findIndex(coin => coin.id === action.value.id)
            // if(coinIndex === -1) return {...state, watchList: [...state.watchList, action.value]}
            // else {
            //     const filteredWatchList = state.watchList.filter(coin => coin.id !== action.value.id)
            //     return {...state, watchList: filteredWatchList}
            // }
            const coinIndex = state.coinsList.findIndex(coin => coin.id === action.value.id)
            return {
                ...state,
                coinsList: [...state.coinsList,  state.coinsList[coinIndex].inWatchList = !state.coinsList[coinIndex].inWatchList ]
            }

    }
    return {...state}
}

const CoinsProvider = ( {children} ) =>{

    const [appState, dispatchAction] = useReducer(coinsReducer, initialState)

    useEffect( () => {
        const fetchCoinsList = async (currency) => {
            try {
                const response = await fetch(coinsURL(currency))
                const data = await response.json()

                dispatchAction({
                    type : "LOAD_COINS",
                    coins : data
                })
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchCoinsList(appState.selectedCurrency)
    }, [appState.selectedCurrency] )

    const searchHandler = (name) => dispatchAction({
            type: "SEARCH",
            name
        })
    

    const sortRankHandler = () => dispatchAction( {type: "SORT_BY_RANK"} )

    const sortPriceHandler = () => dispatchAction( {type: "SORT_BY_PRICE"} )

    const changeCurrencyHandler = (value) => dispatchAction({
        type : "CHANGE_CURRENCY",
        value
    })

    const watchListHandler = (value) => dispatchAction({
        type: "ADD_TO_WATCHLIST",
        value
    })

    const coinsData = {
        coinsList: appState.coinsList,
        filteredList: appState.filteredList,
        watchList: appState.watchList,
        sortRank: appState.sortRank,
        sortPrice : appState.sortPrice,
        selectedCurrency: appState.selectedCurrency,
        currencySymbol: appState.currencySymbol,
        onSortPrice: sortPriceHandler,
        onSearch: searchHandler,
        onSortRank: sortRankHandler,
        onChangeCurrency: changeCurrencyHandler,
        onWatchList: watchListHandler
    }

    return (
        <CoinsContext.Provider value = {coinsData}>
            { children }
        </CoinsContext.Provider>
    )
}

export const useCoinsContext = () => useContext(CoinsContext)

export default CoinsProvider