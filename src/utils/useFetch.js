import { useEffect } from "react";

const useFetch = () => {

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

}

export default useFetch