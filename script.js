let encodemsg = []
let load = [];

 
  /**
   * Sample JavaScript code for gmail.users.getProfile
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   * 
   * https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly 
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/gmail.readonly"})
        .then(function() { 
            console.log("Sign-in successful"); 

    },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyDG5xC4ErbnEQ4Gq2MQR5hlBKLqV0rqr7k");
    return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
        .then(function() { console.log("GAPI client loaded for API"); 
        signinsuccess();
        
        
    },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "68402850544-44tf25t6o3lb1k3ilk3qb0kvkb9vhnt9.apps.googleusercontent.com"});
  });
  // Make sure the client is loaded and sign-in is complete before calling this method.
  // User Profile
  function getProfile() {
    return gapi.client.gmail.users.getProfile({
      "userId": "me"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
               // console.log("Response", response);
               console.log("get profile function executed")
                return response;
              },
              function(err) { console.error("Execute error", err); });
  }
  


  function shortmessage() {
  
        return gapi.client.gmail.users.messages.list({
          "userId": "me",
          "maxResults": 50
        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                   // console.log("Response", response);
                   console.log("shortmessage executed")
                    return response;
                  },
                  function(err) { console.error("Execute error", err); });
                  
      }

 

  // auth2 is initialized with gapi.auth2.init() and a user is signed in.


      // loading new data
     
      async function signinsuccess(){
        const container = document.querySelector('.mainheader');
        const data = await getProfile();

        //console.log(data)
        container.innerHTML = ''; //wipping the old data     
          container.innerHTML  += ` 
          <div class="row">
            <div class="col-12">
              <div class="header " >
                  <div>
                    <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png"/>
                  </div>
                  
                  <div>
                 
                    <button type="button" class="btn btn-secondary profile-btn rounded-circle" data-bs-toggle="tooltip" data-bs-placement="left" title="${data.result.emailAddress}">
                       

                       
                       
                    </button>
                  </div>
              </div>
          </div>
          
          </div>
          
        <div class="row catagories  ">  
          
               
                <div class="col-3">   
                    <button onclick="Primary()" class="btn btn-success">Compose</button>
                </div>

               
                <div class="col-2 d-grid gap-2 back-btn">
                  
                </div>
                <div class="col-3 ">
                
                  <p class=" text-xl-end total-msg-count">Total Mail:${data.result.messagesTotal}<p>
                </div>
            </div>            
         
          <div class="Menu-container">
            

  <div class="row">
    <div class="col-2">
      <nav class="sidebar">
        <ul class="nav flex-column">
	          <li class="nav-item">
            <a class="nav-link" href="#Income" onclick="display_msg()">
            <span class="material-icons">inbox</span>Inbox
            </a></li>
            
	          <li class="nav-item">
            <a href="#news" class="nav-link"><span class="material-icons">
            star</span>Starred
            </a></li>
            
          	<li class="nav-item">
            <a href="#contact" class="nav-link"><span class="material-icons">
            watch_later</span>
            Snoozed
            </a></li>
           
          	<li class="nav-item">
           <a href="#contact" class="nav-link"><span class="material-icons">
            send
            </span>Sent</a></li>
            
	          <li class="nav-item">
            <a href="#about" class="nav-link"><span class="material-icons">
            drafts
            </span>
            Draft</a></li>
          </ul>
          </nav>
          </div>
          <div class="col-10 message-content bgwhite"">
          
          </div>
          </div>       
            </div>
          <div>


          ` 
          console.log("signinsuccess function executed")
          Primary(); 
          
                
      }  

      
async function Primary() {
       // const primaryMsg = document.querySelector('.primary-message');        
        const data = await shortmessage();

        const msg = data.result.messages
       // primaryMsg.innerHTML = ''; //wipping the old data  
        encodemsg.length = 0;

        msg.forEach((user)=>{ 
  
          return gapi.client.gmail.users.messages.get({
            "userId": "me",
            "id": user.id,
            "format": "full",
          

          })
              .then(function(response) {
                      // Handle the results here (response.result has the parsed body).
                      //console.log("Response", response);
                     //console.log(response.result.labelIds.filter((el)=> el == "INBOX").toString())
                      // if(response.result.labelIds.filter((el)=> el == "INBOX").toString()== "INBOX" )
                      //  {                     
                      // // var sub = response.result.payload.headers.filter((el)=> el.name == "Subject").map(e=>e.value)
                      // var from = response.result.payload.headers.filter((el)=> el.name == "From").map(e=>e.value)
                      // var msgda = response.result.payload.headers.filter((el)=> el.name == "Date").map(e=>e.value)
                      
                      
                      encodemsg.push(response)
                      load.push(response.result.payload)
                      console.log("Primaryfuntion executed")
                      display_msg()
                      // const msg_date = new Date(msgda);
                      // const date = msg_date.getDate()-1;
                      // const month = Number(msg_date.getMonth())+1;
                      // const year = Number(msg_date.getFullYear())-1;                                            
                      // <button id="myBtn" onclick="mailmessage(${indexof(response)})"></button> 
                      
                      
                    
                     // }
                      

                    },
                    function(err) { console.error("Execute error", err); });
        })
        encodemsg;
      

       
      }
      
//Inbox function starts



      
      
let msgencoded = []
      
    //  console.log("response")
      //console.log(encodemsg)

      //  console.log("Payload")
      //  console.log(load)
       
        function inboxmsg_enc(num){
        const data = document.querySelector(".message-content")
        data.innerHTML = ``;
        msgencoded.length =0;
          var i = num;

          // for(let i=0; i<load.length; i++)
          // {
            if(load[i].body.data != undefined)
            {
              msgencoded.push(load[i].body.data)  
                                      
            }
          else if(load[i].parts[1] != undefined){
            msgencoded.push(load[i].parts[1].body.data)
            
          }
          else if(load[i].parts[0].body.data != undefined)
          {
            msgencoded.push(load[i].parts[0].body.data)
                            
          }
          else{
            msgencoded.push(load[i].parts[0].parts[0].body.data)
          }
        // }
       // console.log(i)
        // mailmessage(msgencoded[0])
        
        var str = msgencoded[0]
        var d1 = str.replaceAll('-', '+')
        var d2 = d1.replaceAll('_', '/')
        
        //console.log(d2);
        var decodedStr = atob(d2);
       // console.log(decodedStr);
        

        
        data.innerHTML += `${decodedStr}`

      var  backbtn = document.querySelector(".back-btn")
      backbtn.innerHTML = `<button onclick="display_msg()" class="btn btn-danger">Back</button>`
        
      }
      

      





function display_msg(){
  const primaryMsg = document.querySelector('.message-content'); 
  primaryMsg.innerHTML = '';

for(let j=0; j<50; j++)
{
  var hearderdata = encodemsg[j].result.payload.headers

  if(encodemsg[j].result.labelIds.filter((el)=> el == "INBOX").toString()== "INBOX" )
   {                     
    var sub = hearderdata.filter((el)=> el.name == "Subject").map(e=>e.value)
    var from = hearderdata.filter((el)=> el.name == "From").map(e=>e.value)
    var msgda = hearderdata.filter((el)=> el.name == "Date").map(e=>e.value)

      const msg_date = new Date(msgda);
      const date = msg_date.getDate()-1;
      const month = Number(msg_date.getMonth())+1;
      const year = Number(msg_date.getFullYear())-1;                                            
     // <button id="myBtn" onclick="mailmessage(${indexof(response)})"></button> 
     
    // console.log(j)
    //console.log(sub, from, msgda) 
  
        primaryMsg.innerHTML += `
          <div >
          
          <a href="#${j}"  class="msg-record" onclick="inboxmsg_enc(${j})">
          
          <div class="row subjectmsg">
            <div class="col-3">
            ${from}
            </div>
            <div class="col-7">
            ${sub}
            </div>
            <div class="col-2">
            ${date+"/"+ month+"/"+year}
            </div>
            
          </div>
          
          <a>
          <div>
          `
          var  backbtn = document.querySelector(".back-btn")
          backbtn.innerHTML = ``
       console.log("display message clicked")  

}
                 
}
}


// async function asyncCall() {
//   console.log('calling');
//   const result = await display_msg();
//   console.log(result);
//   // expected output: "resolved"
// }

// asyncCall()
      function mailmessage(num){
        var str = num.toString
        // var str = msgencoded[i];

        console.log(typeof(str))

        // var d1 = str.replaceAll('-', '+')
        // var d2 = d1.replaceAll('_', '/')
        
        // //console.log(d2);
        // var decodedStr = atob(d2);
        // console.log(decodedStr);
        // data.innerHTML = ``

        // const data = document.getElementById("primary-data")
        // data.innerHTML = `${decodedStr}`

        
      }
      


        // var d1 = str.replaceAll('-', '+')
        // var d2 = d1.replaceAll('_', '/')
        
        // //console.log(d2);
        // var decodedStr = atob(d2);
        // console.log(decodedStr);
        
        // const data = document.getElementById("msg")
        // document.body.innerHTML = `${decodedStr}`
       
