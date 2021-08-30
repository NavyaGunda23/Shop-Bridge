import ProductList from './Component/ProductList'

import AddNewItem from './Component/AddNewItem'

import { BrowserRouter as Router, Switch, Route , Link } from 'react-router-dom';


function App() {
  return (
    <div >
     
        <Router >
          <Switch>
            <Route path = "/" exact component = {ProductList} />
            <Route path = "/AddNewItem" exact component = {AddNewItem} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
