import { useEffect, useState } from 'react'
import './DetailView.css'
import teaIcon from '../../assets/tea-svgrepo-com.svg'
import awardBadge from '../../assets/award-badge-svgrepo-com.svg'
import awardTrophy from '../../assets/award-trophy-with-star-shape-svgrepo-com.svg'
import oliveBranches from '../../assets/olive-branches-award-symbol-svgrepo-com.svg'


function DetailView( {subscription} ){
  const [subscriptionDetails, setSubscriptionDetails] = useState({})
  if (!subscription) {
    return <div>Loading...</div>;
  }
 
  let iconToShow = teaIcon; 
  
  if (subscription.attributes.title === "Premium") {
    iconToShow = awardBadge;
  } else if (subscription.attributes.title === "Deluxe") {
    iconToShow = awardTrophy;
  } else if (subscription.attributes.title === "Gold") {
    iconToShow = awardTrophy;
  } else if (subscription.attributes.title === "Silver") {
    iconToShow = oliveBranches;
  } else if (subscription.attributes.title === "Platinum") {
    iconToShow = awardBadge;
  } else if (subscription.attributes.title === "Business") {
    iconToShow = awardBadge;
  }

  return (
    <div>
      <img className='subscription-icon' src={iconToShow} alt="Subscription Icon" />
      <h3>Subscription Level: {subscription.attributes.title || 'Unknown Subscription'}</h3>
      <div className='details-content'>
      <p>Subscription ID #{subscription.attributes.id}</p>
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
            <ul className="tea-list">
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
}

export default DetailView;