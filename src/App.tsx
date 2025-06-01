import React from "react";
import "./App.css";
import Routers from "./routes/Routers";
import { ConfigProvider, App as AppAntd } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorTextHeading: "#1570EF",
                },
                components: {},
            }}
        >
            <AppAntd>
                <Provider store={store}>
                    <Routers />;
                </Provider>
            </AppAntd>
        </ConfigProvider>
    );
}

export default App;
