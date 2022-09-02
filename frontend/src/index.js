import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import {RecoilRoot} from "recoil"

const Root = () => {
    return(
        <RecoilRoot>
             <App />
        </RecoilRoot>
    )
}


ReactDOM.render(<Root/>, document.getElementById("root"));
