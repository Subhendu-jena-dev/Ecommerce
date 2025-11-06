//!fetching backend data

const backenddata=JSON.parse(localStorage.getItem("userdetails"))


const cardcontainer=document.querySelector("#cardcontainer")
const alllinks=document.querySelectorAll("#users,#shop,#setting,#dashbord")

let activeLink=null;



// user logic start
const users=document.querySelector("#users")
let allusers=[]
const fetchusers=async ()=>{
    const response=await fetch("https://api.github.com/users")
    const result=await response.json()
    console.log(result);
    allusers=result
    console.log(allusers);
    displayusers(allusers)
    
}




function displayusers(allusers){
    cardcontainer.replaceChildren()
    if(allusers.length===0){
        const card=document.createElement("div")
        card.setAttribute("class","card2")
        card.innerHTML=`
        <h3> No User Found
        </h3>
        `
        cardcontainer.appendChild(card)
    }
    else{
    allusers.map((ele)=>{
  
        const card=document.createElement("div")
        card.setAttribute("class","card")
        card.innerHTML=`
        <img src=${ele.avatar_url} alt=${ele.login}>
        <h3> ${ele.login}
        </h3>
        `
        cardcontainer.appendChild(card)
    })
  }
}


//user logic end

//!search bar logic

const searchinput=document.querySelector("#searchbar")


searchinput.addEventListener("input",()=>{
    const query=searchinput.value.toLowerCase()
    if(activeLink==="User"){
        if(query.length===0){
                   displayusers(allusers)
             }
        else{
           const filterusers=allusers.filter((user)=>user.login.toLowerCase().startsWith(query))
         displayusers(filterusers)
           }

    }

   else if(activeLink==="Shop"){
      if(query.length===0){
          displayproducts(allproduct)
        }
     else{
 
    const filterproduct=allproduct.filter((product)=>product.title.toLowerCase().startsWith(query))
       displayproducts(filterproduct)
   }
   }
   else{
    alert("select one option between user&shop")
   }
})

//!search logic end

//shop logic

let allproduct=[]
const shop=document.querySelector("#shop")
const fakestoredata = async ()=>{
   const responce2=await fetch("https://fakestoreapi.com/products")
   console.log(responce2);
   const result2= await responce2.json()
   console.log(result2);
   allproduct= result2
   displayproducts(allproduct)
}

function displayproducts(product){
cardcontainer.replaceChildren()
    if(product.length===0){
        const card=document.createElement("div")
        card.setAttribute("class","card2")
        card.innerHTML=`
        <h3> No item found 
        </h3>
        `
        cardcontainer.appendChild(card)
    }
    else{
    product.map((ele)=>{
        
  
        const card=document.createElement("div")
        card.setAttribute("class","card3")
        card.innerHTML=`
        <img src=${ele.image} alt=${ele.title} >
        <h2> ${ele.title}</h6>
        <p> ${ele.description}</p>
        <h3>Price :${ Math.round(ele.price*80)}₹</h3>
        <div>
        <button type="button">AddToCart</button>
        <button type="button">Buy</button>
        </div>
        `
        cardcontainer.appendChild(card)
    })
  }
}



//shop logic end

// Setting logic
const setting=document.querySelector("#setting")
const displaysetting=()=>{
    cardcontainer.replaceChildren()
    const card=document.createElement("div")
    card.setAttribute("class","card4")
    card.innerHTML=`
    <h1>Setting</h1>
        
    <button>Darkmode</button>
    <button>Lightmode</button>
    <input type="file" id="profilephoto" placeholder="  Enter your photo" name="photo" />
    `
    cardcontainer.appendChild(card)

}


// dashbordlogic
const dashbord=document.querySelector("#dashbord")
  const displaydashbord=()=>{
    cardcontainer.replaceChildren()
    const card=document.createElement("div")
    card.setAttribute("class","card4")
    card.innerHTML=`
    <h1> Welcome this is the dashbord</h1>
    `
    cardcontainer.appendChild(card)
  }

 displaydashbord()


//sidebar logic
alllinks.forEach((link)=>{
    link.addEventListener("click",()=>{
        
        if(link.innerText==="User"){
            searchinput.value=""
            fetchusers()
            activeLink="User"
        }
        if(link.innerText==="Shop")
        {
            searchinput.value=""
            fakestoredata()
            activeLink="Shop"
        }
        else if(link.innerText==="Setting"){
            displaysetting()
            activeLink="Setting"
        }
        else if(link.innerText==="Dashbord"){
            displaydashbord()
          activeLink="Dashbord"
        }
        dislplaywelcomebanner(activeLink)
        

    })
})

// welcome bar logic
const mainsectionbanner=document.querySelector("#mainsectionbanner")
const welcomenote=document.querySelector("#welcomenote")
const profileimage=document.querySelector("#profilepicture")
welcomenote.innerText=(`Welcome ${backenddata.username} to dashbord `)
profileimage.setAttribute("src",`${backenddata.image}`)
const dislplaywelcomebanner=( activeLink)=>{     
welcomenote.innerText=`Welcome ${backenddata.username} to  ${activeLink}`
}
//    active bar animation logic
const sidebarItems = document.querySelectorAll('#asidenavlist .listitem');
sidebarItems.forEach(item => {
  item.addEventListener('click', function() {
    sidebarItems.forEach((li )=> {li.classList.remove('active')});
    this.classList.add('active');
  });
});


//!logout logic
const logout=document.querySelector("#logout")
logout.addEventListener("click",()=>{window.location.href="./SundariDom.html"})

