import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { increment, decrement, incrementByAmount } from "../store/reducers/counterReducer"
// import Message from "./messaging"

function MainPage() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch();
    const [ amount, setAmount ] = useState(1);
    const url = 'https://example-flights.com';
    const [ flightdata, setFlightData]=useState()

// Define the flight search criteria payload
useEffect(()=>{
    const searchData = {
      origin: 'DEL',            // Delhi, India
      destination: 'BOM',       // Mumbai, India
      departureDate: '2026-06-20',
      passengers: { adults: 1, children: 0 },
      cabinClass: 'ECONOMY'
    };

    async function searchFlights() {
      try {
        const response = await fetch(url, {
          method: 'POST', // Specifies this is a POST request
          headers: {
            'Content-Type': 'application/json', // Tells the API you are sending JSON
            'Authorization': 'Bearer YOUR_API_KEY' // Your API secret token
          },
          body: JSON.stringify(searchData) // Converts the JS object into a JSON string
        });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    setFlightData(results)
    console.log('Available flights found:', results);
  } catch (error) {
    console.error('Error executing POST request:', error);
  }
}
searchFlights()
}
,[])

    return (

        <>
            <label for="counterIp">Counter : {count}</label>
            <input
                id="counterIp" name="counter_ip"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} 
            />
            <button onClick={() => dispatch(incrementByAmount(Number(amount) || 0))}>Increment by Amount</button>

            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            {flightdata}

            {/* <Message/> */}

        </>
    )

}
export default MainPage