import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import  Home  from "../pages/Home";
import DetailSurat  from "../pages/DetailSurat";


export const router =createBrowserRouter([{
    path:"/",
    element:<App/>,
    children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:'/surat/:nomor',
            element:<DetailSurat/>
        },
        {
            path:'*',
            element:<Navigate to="/" replace />
        }
    ]
}])