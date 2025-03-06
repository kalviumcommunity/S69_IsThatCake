import { useState } from "react";

export default function SignupForm(){
    const[formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    });
    
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const response=await fetch("api/signup",{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });

        if(response.ok){
            alert('Signup successful');
            setFormData({name:" ", email: " ", password:" "});
        }else{
            alert("Signup failed. Try again.");
        }
    };

    return(
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                   type="text"
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   placeholder="Full Name"
                   required
                   />
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input

                   type="password"
                   name="password"
                   value={formData.password}
                   onChange={handleChange}
                   placeholder="Password"
                   required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
    

}