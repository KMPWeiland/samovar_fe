import { useState } from 'react'
import './DetailView.css'

function DetailView(subscriptionId){
  const [subscriptionDetails, setSubscriptionDetails] = useState({})

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

  return (
    <h2>SUBSCRIPTION DETAILS COMING</h2>
  )

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