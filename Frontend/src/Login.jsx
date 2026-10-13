import axios from "axios"
import  { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigation = useNavigate()
  const [data, setData] = useState(
    {
      username:"",
      password:""
    }
  )
  const change=(e)=>
  {
    setData({...data,[e.target.name]:e.target.value})
  }
  const logsubmit = async()=>
  {
    try{
      const response = await axios.post("http://localhost:8080/login",data)
    console.log(response)
    localStorage.setItem("uname",data.username)
    localStorage.setItem("upsw",response.data.password)
    navigation("/dboard")
    }
    catch(err){
      console.log(err.response)
      navigation("/log")
      alert(err.response)
    }

  }
  return (
    <>
       <h1> hey siri</h1>
       <h2>my name is {data.username}</h2>
       <h2>my password is{data.password}</h2>
       <input onChange={change} name="username" placeholder="enter your name"/><br/>
       <input onChange={change} name="password" placeholder="enter your password"/><br/>
       <input type="submit" onClick={logsubmit} value="login"/><br/>

    </>
  )
}

export default Login;