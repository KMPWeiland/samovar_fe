import Subscription from '../Subscription/Subscription';
import './SubscriptionsContainer.css';

function SubscriptionsContainer({subscriptions}) {
  const subscriptionCards = subscriptions.map(subscription => {  
    return (
      <Subscription
      id={subscription.id}
      title={subscription.title}
      price={subscription.price}
      status={subscription.status}
      />
    )
  })

  return (
    <div className='subscriptions-container'>
      {subscriptionCards}
    </div>
  )
 
}

export default SubscriptionsContainer;