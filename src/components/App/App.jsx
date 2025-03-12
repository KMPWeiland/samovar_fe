import { useEffect, useState } from 'react'
import samovar from '../../assets/small-samovar.png'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SubscriptionsContainer from '../SubscriptionsContainer/SubscriptionsContainer';
import DetailView from '../DetailView/DetailView';

function App() {
 
  
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

  function getSortedSubscriptions() {
    fetch('http://localhost:3000/api/v1/subscriptions?sort=price')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched SORTED subscriptions:", data);
        setSubscriptionsData(data);
      })
      .catch(error => console.log("ERROR fetching sorted subscriptions:", error.message));
  }

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

    
    // const filteredSubscriptions = subscriptionsData.data.filter(subscription => subscription.id !== id)
    // setSubscriptionsData(filteredSubscriptions)
  

  // function handleDeleteSubscription(id){
    fetch(`http://localhost:3000/api/v1/subscriptions/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        console.log(`Successfully deleted subscription ${id}`);

        if (subscriptionsData.data) {
          const updatedData = subscriptionsData.data.filter(subscription => subscription.id !== id);
          setSubscriptionsData({ ...subscriptionsData, data: updatedData });
        }

      } else {
        console.error(`Failed to delete subscription ${id}`);
      }
    })
    .catch(error => console.error("Error:", error));
  }


  // const handleSubscriptionClick = (subscription) => {
  //   setSeletedSubscriptionId(subscription)
  // }

  // const handleBackToSubscriptionsList = (subscription) => {
  //   setSeletedSubscriptionId(null)
  // }

  if (view === "subscriptions_list") {
    return ( 
      <main className='App'>
        <div className='header'>
          <h1>SAMOVAR</h1>
          <img src={samovar} alt="Samovar Image" />
          <p class="brush-script"><i>Premium global teas, to your front door</i></p>
        </div>
        <h2 className='admin-portal-heading'>Admin Portal</h2>
        <p className='portal-view-type'>The following is a record of all your subscriptions</p>
        <a href="#" className='sort-button' onClick={(e) => { 
          e.preventDefault();
          getSortedSubscriptions();
        }}>
          <strong>Sort by Price</strong>
        </a>
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
        <h1>SAMOVAR</h1>
        <p><i>Premium global teas, to your front door</i></p>
        <h2 className='admin-portal-heading'>Admin Portal</h2>
        <p className='portal-view-type'>Subscription Details</p>
        <div className='detail-view'>
          <DetailView subscription={selectedSubscription} />
          <button className='backToListButton' onClick={() => handleView("subscriptions_list")}>Back to Subscriptions</button>
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

