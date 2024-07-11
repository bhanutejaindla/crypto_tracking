// import React,{ createContext, useEffect, useState } from "react";

// export const CoinContext=createContext();

// const CoinContextProvider=(props)=>{
    
//     const [allCoin,setAllCoin]=useState([]);
//     const [currency,setCurrency]=useState({
//         name:"usd",
//         symbol:"$"
//     });
    
//     const fetchAllcoin =async ()=>{
//         const options = {
//             method: 'GET',
//             headers: {
//               accept: 'application/json',
//               'x-cg-demo-api-key': 'CG-fuQy2nY2tmZNz6hkpJsDYVw7 '
//             }
//           };
          
//           fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency={currency.name}`, options)
//             .then(response => response.json())
//             .then(response => setAllCoin(response))
//             .catch(err => console.error(err));
//     }

// useEffect(()=>{
//     fetchAllcoin(); 
// },[currency])
//     const contextValue ={
//             allCoin,currency,setCurrency
//     }
//     return(
//         <CoinContext.Provider value={contextValue}>
//             {props.children}
//         </CoinContext.Provider>
//     )
// }

// export default CoinContextProvider;

import React, { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllcoin = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-fuQy2nY2tmZNz6hkpJsDYVw7',
      },
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
      const data = await response.json();
      if (Array.isArray(data)) {
        setAllCoin(data);
      } else {
        setAllCoin([]);
        console.error('Data fetched is not an array:', data);
      }
    } catch (err) {
      console.error('Error fetching coin data:', err);
      setAllCoin([]);
    }
  };

  useEffect(() => {
    fetchAllcoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
