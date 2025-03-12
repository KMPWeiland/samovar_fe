import { useEffect, useState } from 'react'
import './DetailView.css'
import teaIcon from '../../assets/tea-svgrepo-com.svg'
import awardBadge from '../../assets/award-badge-svgrepo-com.svg'
import awardTrophy from '../../assets/award-trophy-with-star-shape-svgrepo-com.svg'
import oliveBranches from '../../assets/olive-branches-award-symbol-svgrepo-com.svg'


function DetailView( {subscription} ){
  const [subscriptionDetails, setSubscriptionDetails] = useState({})

  console.log("subscription IN DETAIL VIEW: ", subscription)
  // console.log("subscription ATTRIBUTES: ", subscription.attributes)
  if (!subscription) {
    return <div>Loading...</div>;
  }

  // useEffect(() => {
  //   fetchSubscriptionDetails();
  // }, [])

  // function fetchSubscriptionDetails() {
  //   fetch(`http://localhost:3000/api/v1/subscriptions/$subscriptionId`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setSubscriptionDetails(data);
  //     })
  //     .catch(error => console.log("ERROR: ", error.message))
  //   }

  //   const attributes = subscriptionDetails.attributes || subscriptionDetails;
  //   const customer = subscriptionDetails.relationships?.customer?.data;
  //   const teas = subscriptionDetails.relationships?.teas?.data || [];

  let iconToShow = teaIcon; 
  
  if (subscription.attributes.title === "Premium") {
    iconToShow = awardBadge;
  } else if (subscription.attributes.title === "Deluxe") {
    iconToShow = awardTrophy;
  } else if (subscription.attributes.title === "Gold") {
    iconToShow = oliveBranches;
  }

  return (
    <div>
      <img src={iconToShow} alt="Subscription Icon" />
      <h3>Subscription Level: {subscription.attributes.title || 'Unknown Subscription'}</h3>
      <div className='details-content'>
      <p>Subscription ID: {subscription.attributes.id}</p>
        <p>Price:  ${subscription.attributes.price}</p>
        <p>Status:{subscription.attributes.status}</p>
        <p>Frequency:  Every {subscription.attributes.frequency} weeks</p>
        {subscription.relationships.customer && (
          <div className='customer-info'>
            <h4>Customer Information</h4>
            <p>Customer ID #{subscription.relationships.customer.data.id}</p>
            <p>Name: {subscription.relationships.customer.data.first_name} {subscription.relationships.customer.data.last_name}</p>
          </div>
        )}
        {subscription.relationships.teas.data.length > 0 && (
          <div className='teas-info'>
            <h4>Teas in Subscription</h4>
            <ul>
              {subscription.relationships.teas.data.map(tea => (
                <li key={tea.id}>
                  <i>{tea.name}</i> | {tea.tea_type}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div> 
  )
  
  
  // function fetchSubscriptionDetails() {
  //   fetch(`https://localhost3000.com/api/v1/subscriptions/${subscriptionId}`)
  //     .then(response => response.json())
  //     .then(data => setDetails(data))
  //   .catch(error => console.log(error.message))
  // }

  // useEffect(() => {
  //   fetchSubscriptionDetails();
  // }, [])

  // function formatTeas(teas) {
  //   if(!genres) return null;
  //   return genres.map((genre) => {
  //     return (
  //       <p key={genre} className='genre'>{genre}</p>
  //     );
  //   })
  // }

 

  // return (
  //   <section className='subscription-detail-view'>
  //     <img src={IMAGE FOR SUBSCRIPTION} alt={subscriptionDetails.title}/>
  //     <div className='subscription-details'>
  //       <h2>{subscriptionDetails.title}</h2>
      //   <p>{subscriptionDetails.status}</p>
  //       <div className='teas'>
  //         {formatTeas(subscriptionDetails.teas)}
  //       </div>
  //       <div className='customers'>
  //         {formatTeas(subscriptionDetails.customers)}
  //       </div>
  //       <p className='Overview'>{subscriptionDetails.overview}</p>
  //     </div>
  //   </section>
  // );
}

export default DetailView;