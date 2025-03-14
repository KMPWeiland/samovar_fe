import Subscription from '../Subscription/Subscription';
import './SubscriptionsContainer.css';

function SubscriptionsContainer({subscriptions, deleteSubscription, onSubscriptionClick}) {
 
  const subscriptionsDetails = subscriptions.data || []
 
  const subscriptionCards = subscriptionsDetails.map((subscription) => {  
    return (
      <Subscription
      key={subscription.id}
      id={subscription.id}
      title={subscription.attributes.title}
      price={subscription.attributes.price}
      status={subscription.attributes.status}
      onClick={onSubscriptionClick}
      deleteSubscription={deleteSubscription}
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







