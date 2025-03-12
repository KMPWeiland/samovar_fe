import { useEffect, useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SubscriptionsContainer from '../SubscriptionsContainer/SubscriptionsContainer';
import DetailView from '../DetailView/DetailView';

function App() {
  // const dummySubscriptions = [
  //   { id: 111,
  //   title: "Premium",
  //   price: 61,
  //   status: "Active",
  //   frequency: 7,
  //   customer_id: 114
  //   }, 
  //   { id: 222,
  //     title: "Standard",
  //     price: 85,
  //     status: "Cancelled",
  //     frequency: 2,
  //     customer_id: 120
  //     }
  // ]
  
  const [subscriptionsData, setSubscriptionsData] = useState({ data: [] });
  const [ selectedSubscriptionId, setSelectedSubscriptionId ] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [ view, setView] = useState("subscriptions_list")

  function getSubscriptions() {
    fetch('http://localhost:3000/api/v1/subscriptions')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched subscriptions:", data);
        setSubscriptionsData(data);
      })
      .catch(error => console.log("ERROR fetching subscriptions:", error.message));
  }

  useEffect(() => {
    getSubscriptions();
  }, [])

  function handleView(target, id) {
    console.log(`Changing view to ${target} with subscription ID: ${id}`);
    setView(target);
    
    if (id) {
      setSelectedSubscriptionId(id);

      if (target === "DetailView") {
        fetchSubscriptionDetails(id);
      }
    }
  }

  function fetchSubscriptionDetails(id) {
    if (!id) {
      console.log("No valid subscription ID provided.");
      return;
    }
    console.log("Fetching details for subscription ID:", id);
    console.log("THE selectedSubscriptionId: ", id);

    fetch(`http://localhost:3000/api/v1/subscriptions/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched subscription DETAILS:", data);
        setSelectedSubscription(data.data);
      })
      .catch(error => console.log("ERROR: ", error.message))
    }

  const handleSubscriptionClick = (id) => {
   handleView("DetailView", id);
  };


  function deleteSubscription(id, event) {
    if (event) {
      event.stopPropagation();
    }

    console.log(`Deleting subscription with ID: ${id}`);

    if (subscriptionsData.data) {
      const updatedData = subscriptionsData.data.filter(subscription => subscription.id !== id);
      setSubscriptionsData({ ...subscriptionsData, data: updatedData });
    }
    // const filteredSubscriptions = subscriptionsData.data.filter(subscription => subscription.id !== id)
    // setSubscriptionsData(filteredSubscriptions)
  }

  // function handleDeleteSubscription(id){
  //   fetch(`'http://localhost:3001/api/v1/subscriptions/${id}`, {
  //     method: "DELETE"
  //     headers: {
  //       'Content-type': 'application/json'
  //     }
  //   })
  
  // }

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
        <p><i>Premium global teas, to your front door</i></p>
        <h2>Admin Portal</h2>
        <p>The following is a record of all your subscriptions</p>
        <p>Sort by Price</p>
        {!subscriptionsData.data?.length === 0 && <h2>No subscriptions yet!</h2> }
        <SubscriptionsContainer subscriptions={subscriptionsData} 
                                deleteSubscription={deleteSubscription} 
                                onSubscriptionClick={handleSubscriptionClick}
        /> 
      </main>
    )
  } else if ( view === "DetailView" && selectedSubscriptionId) {
    const subscription = subscriptionsData.data?.find( sub => sub.id === selectedSubscriptionId);
    return (
      <main className='App'>
        <h1>~Samovar~</h1>
        <p><i>Premium global teas, to your front door</i></p>
        <h2>Admin Portal</h2>
        <p>Subscription Details</p>
        <div className='detail-view'>
          <DetailView subscription={selectedSubscription} />
          <button onClick={() => handleView("subscriptions_list")}>Back to Subscriptions</button>
        </div>
      </main>
    );
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

