import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CheckoutPage from "./components/CheckoutPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CarContextProvider from "./components/contexts/CarContext";
import Home from "./pages/Home";
import Car from "./pages/Car";
import ShopCartContextProvider from "./components/contexts/ShopCartContext";
import UserContextProvider from "./components/contexts/UserContext";
import UsersContextProvider from "./components/contexts/UsersContext";
import CheckoutConfirmation from "./components/CheckoutConfirmation";
import AboutPage from "./pages/AboutPage";
import NotFound from "./components/http/NotFound";
import Profile from "./pages/Profile";
import MyOrders from './components/MyOrders';
export default function App() {
	return (
		<UserContextProvider>
			<UsersContextProvider>
				<CarContextProvider>
					<ShopCartContextProvider>
						<div className="App">
							<Router>
								<Navbar />
								<Switch>
									<Route exact path="/">
										<Home />
									</Route>
									<Route exact path="/about">
										<AboutPage />
									</Route>
									<Route exact path="/car/:vin">
										<Car />
									</Route>
									<Route exact path="/checkout">
										<CheckoutPage />
									</Route>
									<Route exact path="/confirmation">
										<CheckoutConfirmation />
									</Route>
									<Route exact path="/myorders">
										<MyOrders />
									</Route>
									<Route exact path="/profile">
										<Profile/>
									</Route>
									<Route>
										<NotFound />
									</Route>
								</Switch>
								<Footer />
							</Router>
						</div>
					</ShopCartContextProvider>
				</CarContextProvider>
			</UsersContextProvider>
		</UserContextProvider>
	);
}
