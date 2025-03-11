import Subscription from '../Subscription/Subscription';
import './SubscriptionsContainer.css';

function SubscriptionsContainer({subscriptions, onSubscriptionClick}) {
  const subscriptionCards = subscriptions.map(subscription => {  
    return (
      <Subscription
      key={subscription.id}
      id={subscription.id}
      title={subscription.title}
      price={subscription.price}
      status={subscription.status}
      onClick={onSubscriptionClick}
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