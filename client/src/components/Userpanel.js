
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Account from "./images/profile.png";


function Userpanel() {
const navigate = useNavigate()
const [userdata,setUserData]=useState({})
const calluserpage = async()=>{
try{
const res=await fetch("/userpanel",{
method:"get",
headers:{
  Accept:"application/json",
  "Contect-Type":"application/json"
},
credentials:"include"
});
const data=await res.json()
// console.log(data)
setUserData(data)
if(!res.status===200){
  const error = new Error(res.error)
  throw error
}}
catch(err){
  console.log(err)
  navigate("/signin")
}}
useEffect(()=>{
  calluserpage()
},[]);

return(
<>


<div class="container mt-5 p-3 border rounded-2">
    <div class="row">
<div class="col-3">
  <div className="border rounded-3 text-center">
<div class="card border-0 " >
  <img src={Account} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h4 class="card-title">{userdata.Username}</h4>
    <p class="card-text">Always Ready To Code</p>
    <a href="#" class="btn btn-outline-light mb-3">Edit Profile</a>


  </div>
</div>
</div>
</div>

<div class="col-9 text-light">
<div className="border rounded-3 text-center">
 <div className="container courses">
   
          <div className="courses_nav my-4">
            <ul className="nav nav-pills p-2 " id="mytab">
              <li className="nav-item ">
                <a className="nav-link active text-light" data-bs-toggle="pill" href="#aa">
               Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" data-bs-toggle="pill" href="#bb">
                Courses
                </a>
              </li>
              <li className="">
                <a className="nav-link text-light" data-bs-toggle="pill" href="#cc">
               Fee
                </a>
              </li>
              
            </ul>
          </div>

          <div className="tab-content">
            <div className="tab-pane fade show active" id="aa">
              <div className="row">
                <div className="col-lg-3 col-sm-6 p-4">
<table>
<tr>
             <td> <h1>Name</h1></td> 
             <td> <h1>Email</h1></td>
             <td>  <h1>Phone number</h1></td>
             </tr>
             <tr>

             <td> {userdata.Username}</td>
             <td> {userdata.Email}</td>  
             <td>  {userdata.Phone_number}</td>
               </tr>
               </table>
                </div>
                
              </div>
            </div>
            <div className="tab-pane fade" id="bb">
              <div className="row">
                <div className=" p-4">
                <h1>courses</h1><input type="text"/>
                </div>
                
              </div>
            </div>

            <div className="tab-pane fade" id="cc">
              <div className="row">
                <div className="p-4">
                <h1>{userdata.message}</h1>
                </div>
               
              </div>
            </div>

      
</div> 
</div> 
</div> 





    </div>
   </div>
   </div>
 

</>)
}




export default Userpanel;