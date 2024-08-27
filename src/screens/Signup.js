import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import './Signup.css'

function Signup() {

    const [credentials, setcredentials] = useState({name:"", email:"", password:"", geolocation:""})

    const handleSubmit = async(e)=>{

        e.preventDefault();
        console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation}))
        const response = await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        });
        const json = await response.json()
        alert("i am here")
        console.log(json);

        if(!json.success){
            alert("enter valid credentials")
        }
    }
    const onChange =(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
    <>

    <div className="container">
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1"/>
        </div>
        
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
    </form>
    </div>


{/* <div className="container" >
    <form onSubmit={handleSubmit}  >
        <h2 className="title" style={{ width:"auto", textAlign:"center", margin:"2vh"}}>Signup</h2>
        <div class="row g-3">
            <div class="col-sm-2">
                <label htmlFor="name" className="form-label">Name:</label>
            </div>
            <div class="col-sm-5 ">
                <input type="text" class="form-control" placeholder="First name" aria-label="First name"/>
            </div>
            <div class="col-sm-5">
                <input type="text" class="form-control" placeholder="Last name" aria-label="Last name"/>
            </div>
        </div>
        
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Date of Birth</label>
            <input type="date" className="form-control" name='date' value={credentials.date} onChange={onChange} id="exampleInputPassword1"/>
        </div>

        <div class="row g-3">
            <div class="col-sm-3">
                <label htmlFor="name" className="form-label">Institute:</label>
            </div>
            <div class="col-sm-3 ">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                    <label class="form-check-label" for="gridRadios1">Student</label>
            </div>
            <div class="col-sm-5">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                    <label class="form-check-label" for="gridRadios1">Admin</label>
            </div>
        </div>

        
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
    </form>
    </div> */}
    </>
  )
}

export default Signup