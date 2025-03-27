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

    
        try {
            const response = await fetch("http://localhost:3000/api/signup", { // ✅ Ensure correct API URL
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json(); // ✅ Parse response JSON
    
            if (response.ok) {
                alert("Signup successful!");
                setFormData({ name: "", email: "", password: "" });
            } else {
                alert(`Signup failed: ${data.message || "Try again."}`); // ✅ Show backend error
            }
        } catch (error) {
            alert("Signup failed. Please check your connection.");
            console.error("Signup Error:", error);
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