import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ItemList from "./app/pages/AddressBook/AddressBookList";
import ItemForm from "./app/pages/AddressBook/AddressBookForm";
import items from "./app/pages/AddressBook/AddressBook.reducers";
import { Layout, Row, Col } from "antd";
const { Content } = Layout;

// Setup Redux store with Thunks
const reducers = combineReducers({ items });
const store = createStore(reducers, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <Layout>
      <Layout>
        <Content style={{ marginTop: "100px", marginBottom: "100px" }}>
          <Row
            justify="space-around"
            type="flex"
            style={{ alignItems: "center" }}
          >
            <Col span={12} style={{ textAlign: "center" }}>
              <ItemList />
              <br />
              <ItemForm />
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  </Provider>
);

export default App;
