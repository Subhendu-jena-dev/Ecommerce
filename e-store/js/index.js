
const navlist=document.querySelector(".navlist")

const arr=["Home","About","Contactus"]
arr.map((ele)=>{
    const li=document.createElement("li")
    const a = document.createElement("a")
    a.href = `#${ele.toLowerCase()}`
    a.innerText = ele
    li.appendChild(a)
    li.setAttribute("class","listitem")
    li.setAttribute("id", ele)
   navlist.appendChild(li)
})

const home=document.querySelector("#Home")
home.addEventListener("click",()=>{window.location.href="index.html"})
const About=document.querySelector("#About")
About.addEventListener("click",()=>window.location.href="./pages/About.html")
const Contactus=document.querySelector("#Contactus")
Contactus.addEventListener("click",()=>window.location.href="./pages/Contact.html")

const loginbtn=document.querySelector(".loginbutton")
const loginbox=document.querySelector("#loginbox")
const closebtn=document.querySelector("#closebtn")
const loginemail=document.querySelector("#email")
const loginpassowrd=document.querySelector("#password")
const otp=document.querySelector("#otp")
loginbtn.addEventListener("click",()=>{
    loginbox.style.display="block";
})
closebtn.addEventListener("click",(e)=>{
    e.preventDefault()
     clearForm();
    loginbox.style.display="none";
})



const registrationnbtn=document.querySelector("#registrationbutton")
const closebtn2=document.querySelector("#closebtn2")

registrationnbtn.addEventListener("click",(e)=>{
    e.preventDefault();  
    registrationbox.style.display="block";
     loginbox.style.display = "none";
    
})
closebtn2.addEventListener("click",()=>{
     clearForm();
    registrationbox.style.display="none";
})

// code for going from registration page to login page
const loginbtn2=document.querySelector("#loginbutton2")
loginbtn2.addEventListener("click",()=>{
     clearForm();
    loginbox.style.display="block";
    registrationbox.style.display="none";
  
})


// login form logic

const loginotp=document.querySelector("#loginotp")
loginotp.addEventListener("click",generateOtp)
//!login form getting local storage data
let backenddata=null
let userdata
const fetchbackenddata=()=>{ 
    backenddata=localStorage.getItem("userdetails") 
    userdata=JSON.parse(backenddata)||[]
    console.log(userdata);
 }


// login form passoward animation
loginpassowrd.addEventListener("input" ,(e)=>{
    if(loginpassowrd.value.length<5){
       loginpassowrd .style.backgroundColor="red"
    }
    else{
        loginpassowrd.style.backgroundColor="lightgreen"
    }
})


//!login form submit logic
const loginform=document.querySelector("#loginform")

loginform.addEventListener("submit",(e)=>{
    e.preventDefault();
    fetchbackenddata()
if(loginemail.value!==""&& loginpassowrd.value!==""&& loginpassowrd.value.length>4&&otp.value!==""){
  
   if(loginemail.value==userdata.email && loginpassowrd.value==userdata.password){
    if(otp.value==otpvalue){
        clearForm();
        alert("login Sucessfully")
        loginform.style.display="none"
        window.location.href="./pages/dashbord.html"
    }
    else{
        alert(" invalid otp")
    }

   }
   else{
    alert("invalid credential")
   }
}




})
//!login form submit logic end

//!otp generation
let otpvalue;
function generateOtp(){
otpvalue=Number(Math.round(Math.random()*1000000));
alert(`your otp is: ${otpvalue}`)
}

//!otp geeneration end

function clearForm(){
    loginemail.value=""
        loginpassowrd.value=""
        otp.value=""
        registrationemail.value=""
        registrationname.value=""
        registrationpassword.value=""
        registrationphoneno.value=""
        otp2.value=""

}


//registration page logic

const registrationbox=document.querySelector("#registrationbox")
const registrationname=document.querySelector("#name2")
const registrationphoneno=document.querySelector("#phonenumber2")
const registrationemail=document.querySelector("#email2")
const registrationpassword=document.querySelector("#password2")
const registrationimage=document.querySelector("#image")

const otp2=document.querySelector("#otp2")
const registrationotp=document.querySelector("#registrationotp")

registrationotp.addEventListener("click",generateOtp)


const registrationform=document.querySelector("#registrationform")
console.log(registrationform);
//registration form password animation

registrationpassword.addEventListener("input" ,(e)=>{
    if(registrationpassword.value.length<5){
        registrationpassword.style.backgroundColor="red"
    }
    else{
        registrationpassword.style.backgroundColor="lightgreen"
    }
})


registrationform.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(registrationname.value!=""&&registrationemail.value!=""&&registrationpassword.value!=""&&registrationphoneno.value!=""&& registrationimage.value!=""&&registrationpassword.value.length>4){
    if(otp2.value==otpvalue){

    const data={
        [registrationname.name]:registrationname.value,
        [registrationemail.name]:registrationemail.value,
        [registrationpassword.name]:registrationpassword.value,
        [registrationphoneno.name]:registrationphoneno.value,
        [registrationimage.name]:registrationimage.value

    }
    const res=JSON.stringify(data)
   
    localStorage.setItem("userdetails",res)
    alert("sucessfully registerd")
         clearForm()
     }
     else{
        alert(" invalid otp")
        
     }
    }
    else{
        
        alert("please enter the details correctly");
    }
    

})








