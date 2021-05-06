import style from '../css/MyOrders.module.css';

// fetches props from MyOrders.js and maps through each car to then render them out
const Order = (props) => {
  const oneOrder = props.order.map((oneOrder, i) => {
    return (
      <div className={style.oneOrderContainer} key={i}>
          <img 
            src={`/assets/car-pictures/${oneOrder.make}-${oneOrder.model}-${oneOrder.year}.jpg`}
            alt="Car from order"
            className={style.orderImg}
          />
          <div className={style.orderText}>
            <p>{oneOrder.make}</p>
            <p>{oneOrder.model}</p>
            <p>{oneOrder.year}</p>
            <p>${Number(oneOrder.price).toLocaleString()}</p>
          </div>
      </div>
    )
  })
  
  return <div>{oneOrder}</div>
}

export default Order;
