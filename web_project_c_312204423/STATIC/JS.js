//activ nav
const ActivePage = window.location.pathname;
console.log(ActivePage);

const activeNav = document.querySelectorAll('nav a').forEach(
    MyLinks => {
        if (MyLinks.href.includes(`${ActivePage}`)) {
            MyLinks.classList.add('Active');
        }
    }
)


//geo locaitom
function GetLocation() {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
        console.log();
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("p").value = "Geo location is not supported";
    }
};

function showPosition(position) {
    document.getElementById('lat').value = position.coords.latitude;
    document.getElementById('long').value = position.coords.longitude;
}

//enable
function enableCreateUser() {
    if (document.getElementById("location").checked) {
      document.getElementById("city").disabled = true;
    }
    if (!document.getElementById("location").checked) {
        document.getElementById("city").disabled = false;
    }
}


//VALIDATION
function verifyFields() {  
    var pw = document.getElementById("pswd").value;  
    //check empty password field  
    if(pw == "") {  
       document.getElementById("message").innerHTML = "Fill the password please!";  
       return false;  
    }  
     
   //minimum password length validation  
    if(pw.length < 8) {  
       document.getElementById("message").innerHTML = "Password length must be atleast 8 characters";  
       return false;  
    }  
    
  //maximum length of password validation  
    if(pw.length > 15) {  
       document.getElementById("message").innerHTML = "Password length must not exceed 15 characters";  
       return false;  
    } else {  
       
    }  

    
    var pw = document.getElementById("email").value;  
    //check empty email field  
    if(pw == "") {  
       document.getElementById("message").innerHTML = "Fill the email please!";  
       return false;  
    }  else {  
        
     }  

    var pw = document.getElementById("FullName").value;  
    //check empty User Name field  
    if(pw == "") {  
       document.getElementById("message").innerHTML = "Fill the User Name please!";  
       return false;  
    }  else {  
       
     }  

  }  


  //check passworsd

  function validateForm() { 

    var pw1 = document.getElementById("password1").value;  
    var pw2 = document.getElementById("password2").value; 

  if(pw1 != pw2) {  
    document.getElementById("message2").innerHTML = "Passwords are not same";  
    return false;  
  } else {  
    alert ("Your password created successfully");  
    //document.write("JavaScript form has been submitted successfully");  
  }  
}  

     
  