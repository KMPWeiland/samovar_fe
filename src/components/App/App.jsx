import { useEffect, useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SubscriptionsContainer from '../SubscriptionsContainer/SubscriptionsContainer';
import DetailView from '../DetailView/DetailView';

function App() {
  const dummySubscriptions = [
    { id: 111,
    title: "Premium",
    price: 61,
    status: "Active",
    frequency: 7,
    customer_id: 114
    }, 
    { id: 222,
      title: "Standard",
      price: 85,
      status: "Cancelled",
      frequency: 2,
      customer_id: 120
      }
  ]
  const [subscriptionsData, setSubscriptionsData] = useState(dummySubscriptions);
  const [ seletedSubscriptionId, setSeletedSubscriptionId ] = useState(null);
  const [ view, setView] = useState("subscriptions_list")

  // function getSubscriptions() {
  //   fetch('https://localhost3000.../subscriptions')
  //     .then(response => response.json())
  //     .then(data => {
  //       subscriptionsData(data);
  //     })
  //     .catch(error => console.log(error.message))
  // }

  // useEffect(() => {
  //   getSubscriptions();
  // }, [])

  function handleView(target, id) {
    setView(target);
    
    if (id) {
      setSeletedSubscriptionId(id)
    }
  }

  const handleSubscriptionClick = (id) => {
    handleView("DetailView", id);
  };

  // const handleSubscriptionClick = (subscription) => {
  //   setSeletedSubscriptionId(subscription)
  // }

  // const handleBackToSubscriptionsList = (subscription) => {
  //   setSeletedSubscriptionId(null)
  // }

  if (view === "subscriptions_list") {
    return ( 
      <main className='App'>
        <h1>Samovar</h1>
        <h2>Premium global teas, to your front door</h2>
        <p>The following is a record of all your subscriptions:</p>
        {!dummySubscriptions.length && <h2>No subscriptions yet!</h2> }
        <SubscriptionsContainer subscriptions={subscriptionsData}
        onSubscriptionClick={handleSubscriptionClick}
        /> 
      </main>
    )
  } else if ( view === "DetailView" && seletedSubscriptionId) {
    const subscription = subscriptionsData.find( sub => sub.id === seletedSubscriptionId);
    return (
      <main className='App'>
        <h1>Samovar</h1>
        <h2>Premium global teas, to your front door</h2>
        <div className='detail-view'>
          <DetailView subscription={subscription} />
        </div>
      </main>
    )
  }

  }


export default App;



// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

