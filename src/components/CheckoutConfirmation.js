import { useLocation } from 'react-router-dom';
import style from '../css/Confirmation.module.css';

export default function CheckoutConfirmation() {
    // fetches the values in state from history.push in CheckoutForm.js
    const { state } = useLocation();

    // maps through each car in shoppingCart that was fetched from state
    const confirmCars = state.shoppingCart.map((confirmCars, i) => {
        return (
            <div className={style.boughtItem} key={i}>
                <div className={style.confirmImg}>
                    <img
                        src={`/assets/car-pictures/${confirmCars.make}-${confirmCars.model}-${confirmCars.year}.jpg`}
                        alt="product"
                    />
                </div>
                <div className={style.carInfoText}>
                    <div className={style.carInfoTextWrapper}>
                        <div className={style.pElOneTwo}>
                            <p><strong>{confirmCars.make}</strong></p>
                            <p> {confirmCars.model}</p>
                            <p> {confirmCars.year}</p>
                        </div>
                        <p>{confirmCars.descShort}</p>
                        <div className={style.carPrice}>
                            <p><strong>Price:</strong> ${Number(confirmCars.price).toLocaleString()}</p>
                        </div>
                    </div>
            </div>
        </div>
        );
    })

    return (
        <div className={style.confirmationPage} id="order">
            <div className={style.confirmText}>
                <h2>THANK YOU</h2>
                <h3>Your order is now placed</h3>
            </div>
            <div className={style.confirmationContainer}>
                <div className={style.carData}>
                    {confirmCars}
                </div>
                <div className={style.buyerSellerContainer}>
                    <div className={style.buyerSellerWrapper}>
                        <div className={style.buyer}>
                            <h2><strong>Buyer</strong></h2>
                            <p><strong>Full Name:</strong> {state.name}</p>
                            <p><strong>Email:</strong> {state.email}</p>
                            <p><strong>Adress:</strong> {state.address}</p>
                            <p><strong>County:</strong> {state.county}</p>
                            <p><strong>Zip Code:</strong> {state.zip}</p>
                            <p><strong>Delivery Option: </strong>{state.select}</p>
                        </div>
                        <div className={style.seller}>
                            <h2><strong>Seller</strong></h2>
                            <p><strong>Name:</strong> Bilgagnat AB</p>
                            <p><strong>Adress:</strong> Something somewhere</p>
                        </div>
                    </div>
                    <div className={style.dateContainer}>
                        <p>Date of Order: {state.date}</p>
                    </div>
                    <div className={style.totalPriceText}>
                        <p><strong>Total Price:</strong> ${state.totalPrice}</p>
                    </div>
                </div>
                <div className={style.buttonContainer}>
                    <button onClick={window.print}>Print Confirmation</button>
                    <button>Send to Email</button>
                </div>
            </div>
        </div>
    );
}
