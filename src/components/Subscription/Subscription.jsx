import './Subscription.css'

function Subscription({ id, title, price, status }) {
  return (
    <div className='subscription-card'>
      <p><i>Subscription ID #{id}</i></p>
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
      <button>Delete Subscription</button>
    </div>
  )
}

export default Subscription;