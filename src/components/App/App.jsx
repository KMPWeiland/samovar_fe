import { useEffect, useState } from 'react'
import samovar from '../../assets/small-samovar.png'
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
        console.log('Subscriptions received in the app:', data);
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
        console.log('SORTED Subscriptions received in the app:', data);
        setSubscriptionsData(data);
      })
      .catch(error => console.log("ERROR fetching sorted subscriptions:", error.message));
  }

  function handleView(target, id) {
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
      return;
    }
    fetch(`http://localhost:3000/api/v1/subscriptions/${id}`)
      .then(response => response.json())
      .then(data => {
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
    fetch(`http://localhost:3000/api/v1/subscriptions/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
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

  if (view === "subscriptions_list") {
    return ( 
      <main className='App'>
        <div className='header'>
          <h1>SAMOVAR</h1>
          <img src={samovar} alt="Samovar Image" />
          <p className="brush-script"><i>Premium global teas, to your front door</i></p>
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
