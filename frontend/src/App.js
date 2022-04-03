import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Home from './screens/Home';
import Product from './screens/Product';
import Login from './screens/Login';
import Register from './screens/Register';
import ProductDetails from './screens/ProductDetails';
import ProductList from './screens/ProductList';
import NewProduct from './screens/NewProduct';
import ProductEdit from './screens/ProductEdit';
import PlaceOrder from './screens/PlaceOrder';
import Footer from './components/Footer';
import Order from './screens/Order';

function App() {
  return (
    <div >
      <Router>
      <Header />
       <main className="py-3">
          <Container >
              <Route  path="/" component={Home} exact/>
              <Route path="/login"  component={Login} />
              <Route path="/register"  component={Register} />
              <Route path="/product/:id" component={ProductDetails} />
              <Route path="/product"  component={Product} exact/>
              <Route path="/admin/dashboard"  component={ProductList} exact/>
              <Route path="/newProduct"  component={NewProduct} exact/>
              <Route   path="/admin/product/:id/edit" component={ProductEdit}  exact />
              <Route path="/placeOrder"  component={PlaceOrder}  />
              <Route path="/order"  component={Order}  />

          </Container >
        </main>
        <Footer />
      </Router>
     
    </div>
  );
}

export default App;
