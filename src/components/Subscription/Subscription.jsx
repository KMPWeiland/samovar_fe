import './Subscription.css'
import teaIcon from '../../assets/tea-svgrepo-com.svg'

function Subscription({ id, title, price, status, onClick, deleteSubscription }) {
  return (
    <div className='subscription-card' onClick={() => onClick(id)}>
      <i class="fa fa-coffee"></i>
      <p><i>Subscription ID #{id}</i></p>
      <h3 className='subscription-title-list-view'>{title}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
      <button className='deleteButton' onClick={(e)=> {
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