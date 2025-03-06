console.log("hello")
document.getElementById("login-btn").addEventListener("click",(event)=>{
    event.preventDefault();
    document.body.style.backgroundColor="blue";
   
    const Id = document.getElementById("studentId").value
    const password = document.getElementById("password").value
    
    if(Id.length === 11){
        
        if(password === "1234"){
            console.log("welcome")
            window.location.href="./dashboard.html"
        }
        else{
            console.log("Invalid password")
        }
        
    }
    else{
        console.log("Invalid Id")
    }
})

