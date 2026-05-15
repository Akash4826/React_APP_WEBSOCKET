import { useState, useEffect, useCallback } from 'react';



function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi', 'melon', 'peach', 'pear', 'plum', 'strawberry'];

  function saveData(data) {

    alert("Data saved successfully")
    console.log("Save data")
  }

  function throttle() {

    let delay = 5000;
    let lasTmeCalled = 0;

    console.log(lasTmeCalled)

    return function () {

      let currentTime = Date.now()
      console.log(currentTime - lasTmeCalled, delay)
      if ((currentTime - lasTmeCalled) > delay) {

        lasTmeCalled = currentTime

        saveData(results)

      }
      else {
        console.log(currentTime, lasTmeCalled, "else")


        alert("Wait for saving data don't click continuosly")
      }

    }


  }
  const handleSubmit = useCallback(throttle(), []);

  useEffect(() => {
    console.log("searching for", search);
    if (search === '') {
      setResults([]);
      return;
    }
    let timerId = setTimeout(() => {
      console.log("searching for internal", search);

      setResults(fruits.filter(fruit => fruit.includes(search)));

    }, 2000)
    return () => { clearTimeout(timerId) }


  }, [search]);

  return (
    <>
    <h2> Search Fruits </h2>
      <input value={search} name="Search Box" placeholder='search...' onChange={(e) => setSearch(e.target.value)} />
     
     {/* <p>List of Fruits</p> */}
      <ul>
        {results.length > 0 ? results.map((e, index) => {
          return <li key={index}>{e}</li>
        }) : null
        }
      </ul>
      <button onClick={handleSubmit}>Save Data</button>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default Home;
