import './Subscription.css'

function Subscription({ id, title, price, status, onClick, deleteSubscription }) {
  return (
    <div className='subscription-card' onClick={() => onClick(id)}>
      <p><i>Subscription ID #{id}</i></p>
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
      <button onClick={(e)=> {
        e.stopPropagation(); 
        deleteSubscription(id, e);
      }}
     > 
        Delete Subscription
      </button>
  </div>
  )
}

export default Subscription;