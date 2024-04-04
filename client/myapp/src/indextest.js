import React from "react"
import  ReactDOM  from "react-dom"
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Img from "./image/luffy.jpg"


ReactDOM.render(<>
<h1 style={{marginTop:140,color:"green"}}>yoo</h1>,

<div className="bg-black text-light">fwafwaf fwafwa faawfaw</div>

<div className="btn btn-outline-danger px-5 my-5">or bete</div>



{/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Toggle top offcanvas</button>

<div className="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div className="offcanvas-header">
    <h5 id="offcanvasTopLabel">Offcanvas top</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    ...
  </div>
</div>  */}

<img src= {Img} alt="luffy" />








</>,
document.getElementById("root")
)