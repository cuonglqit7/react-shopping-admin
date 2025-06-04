import React from "react";
import "./App.css";
import Routers from "./routes/Routers";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {},
                components: {},
            }}
        >
            <Provider store={store}>
                <Routers />;
            </Provider>
        </ConfigProvider>
    );
}

export default App;
