import { createContext, useContext, useState } from "react";

const CoinContext = createContext()

const CoinProvider = (props) => {
    const [coinData, setCoinData] = useState({ww:1})

    return (
        <CoinContext.Provider value = {coinData}>
            {props.children}
        </CoinContext.Provider>
    )
}

export const useCoinContext = () => useContext(CoinContext)

export default CoinProvider