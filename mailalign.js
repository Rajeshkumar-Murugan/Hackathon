let encodemsg = []
let load = [];
let pagenation = 0;
 
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
        
        
        
    },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "68402850544-44tf25t6o3lb1k3ilk3qb0kvkb9vhnt9.apps.googleusercontent.com"});
  });
  // Make sure the client is loaded and sign-in is complete before calling this method.
  // User Profile
  let usermail= ''
  function getProfile() {
    return gapi.client.gmail.users.getProfile({
      "userId": "me"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
              //  console.log("Response", response);
               usermail = response.result.emailAddress
               console.log("get profile function executed")
                return response;
              },
              function(err) { console.error("Execute error", err); });
  }

  function shortmessage() {
  
        return gapi.client.gmail.users.messages.list({
          "userId": "me",
          "maxResults": 500

        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                   console.log("Response", response);
                   console.log("shortmessage executed")
                    return response;
                  },
                  function(err) { console.error("Execute error", err); });
                  
      }
  // auth2 is initialized with gapi.auth2.init() and a user is signed in.
    
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
                      
                      encodemsg.push(response)
                      load.push(response.result.payload)               

                    },
                    function(err) { console.error("Execute error", err); });
        })
        console.log("Primaryfuntion executed")
        console.log(encodemsg)
       

        return encodemsg; 
        
      }
 let pg=0;
 let maxpg = 0;   
 function nextpg()
  {
    
    if(pg<maxpg-20)
    {
      pg = pg+20
      display_msg()
    }
  }
  function prevpg()
{
  if(pg==0){
    pg=0
  }else{
    pg=pg-20
    display_msg()
  }
}
//Inbox function starts
function display_msg(da='INBOX'){
  var msgtype = da
  const primaryMsg = document.querySelector('.message-content'); 
  primaryMsg.innerHTML = '';
  
  maxpg = encodemsg.length
// for(let j=0; j<encodemsg.length; j++)
for(let j=0+pg; j<20+pg; j++)
{
  // console.log(encodemsg[j].result.id)
  
  var hearderdata = encodemsg[j].result.payload.headers
  if(encodemsg[j].result.labelIds.filter((el)=> el == msgtype).toString()== msgtype )
   {                     
    var sub = hearderdata.filter((el)=> el.name == "Subject").map(e=>e.value)
    var from = hearderdata.filter((el)=> el.name == "From").map(e=>e.value)
    var msgda = hearderdata.filter((el)=> el.name == "Date").map(e=>e.value)

      const msg_date = new Date(msgda);
      const date = msg_date.getDate()-1;
      const month = Number(msg_date.getMonth())+1;
      const year = Number(msg_date.getFullYear())-1;                                            
    
        primaryMsg.innerHTML += `
          <div >
          <a href="#${j}"  class="msg-record" onclick="inboxmsg_enc(${j})">
          
          <div class="row subjectmsg">
            <div class="col-0">
            ${from}
            </div>
            <div class="col-6">
            ${sub}
            </div>
            <div class="col-0 ">
            ${date+"/"+ month+"/"+year}
            </div>
            
          </div>
          
          </a>
          <div>


          `
          var  backbtn = document.querySelector(".back-btn")
          backbtn.innerHTML = ``

       var  backbtn = document.querySelector(".back-btn")
       backbtn.innerHTML = `<div>
       <button onclick="display_msg('${msgtype}')" class="btn btn-danger rounded-circle">
       
               <span class="material-icons">refresh</span>
               
       </button>
       <div>`

}
                 
}
}


      // loading new data
     
async function signinsuccess(){
        const container = document.querySelector('.mainheader');      
        //console.log(data)
        container.innerHTML = ''; //wipping the old data     
          container.innerHTML  += ` 
          <div class="row">
            <div class="col-12 header"> 
            <div>
            <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
      <a class="nav-link" href="#Income" onclick="display_msg('INBOX')">
                <span class="material-icons">inbox</span>Inbox
              </a>
              <a href="#news" class="nav-link" onclick="display_msg('STARRED')">
              <span class="material-icons">star</span>Starred
            </a>
            <a href="#contact" class="nav-link" onclick="display_msg('SNOOZED')">
            <span class="material-icons">watch_later</span>Snoozed
          </a>
          <a href="#sent" class="nav-link" onclick="display_msg('SENT')">
          <span class="material-icons">send</span>Sent
        </a>
        <a href="#draft" class="nav-link" onclick="display_msg('DRAFT')">
                <span class="material-icons">drafts</span>Draft
              </a>
    </div>
    
    <div id="main">
            <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span>
            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png"/>
            
    </div>            
    </div>
    <div>
    
  </div>
                              
          </div>
          
          </div>
          
         
  <div class="container-fluid Menu-container">          
    <div class="row">     
        <div class="col-12">
         <div class="row catagories  ">                                         
          <div class="col-2  icons">          
          <div class="back-btn">

          </div>&nbsp;&nbsp;
         
                
  

          <!-- Trigger the modal with a button -->
          <button type="button" class="btn btn-success btn-lg" data-toggle="modal" data-target="#myModal">Compose</button>
        
          <!-- Modal -->
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
            
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  
                  <h4 class="modal-title">Email Form</h4>
                </div>
                <div class="modal-body">
                <form method="post">
                
               
                <div class="form-group row">
                  <label for="to" class="col-sm-2 col-form-label">To</label>
                  <div class="col-sm-10">
                    <input type="text"  class="form-control" id="to">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="subject" class="col-sm-2 col-form-label">Subject</label>
                  <div class="col-sm-10">
                    <input type="text"  class="form-control" id="subject">
                  </div>
                </div>
                
                <div class="form-group row">
                  <label for="message" class="col-sm-2 col-form-label">Message</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" id="message"></textarea>

                  </div>
                </div>

                <div class="form-group row">
                  <label for="filename" class="col-sm-2 col-form-label" >File name</label>
                  <div class="col-sm-10">
                    <input type="text"  class="form-control" id="filename" placeholder="Enter name with extension">
                  </div>
                </div>

                <div class="form-group row">
                  <label for="attach" class="col-sm-2 col-form-label" >File Path</label>
                  <div class="col-sm-10">
                    <input type="text"  class="form-control" id="attach" placeholder="Enter full path">
                  </div>
                </div>
               
              </form>
                </div>
                <div class="modal-footer">

                <input type="button" class="btn btn-success" value="Send" onclick="sendEmail(
                  document.getElementById('to').value,
                  document.getElementById('subject').value,
                  document.getElementById('message').value
                  
                )"/>                
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
              
            </div>
          </div><button onclick="nextpg()">Next</button>
          <button onclick="prevpg()">Prev</button>
          </div>

          
        </div>
    <div class="row">
    <div class="col-12 message-content bgwhite">
          
Loading            
            </div>
            
            </div>
            
      </div>       
    </div>
  <div> ` 
          console.log("signinsuccess function executed")
          setTimeout(display_msg, 1000);
                
      }  

let msgencoded = []
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
    console.log("inboxmsg function clicked")
    // mailmessage(msgencoded[0])
        
        var str = msgencoded[0]
        var d1 = str.replaceAll('-', '+')
        var d2 = d1.replaceAll('_', '/')
        
        //console.log(d2);
        var decodedStr = atob(d2);
        //console.log(decodedStr);        
        data.innerHTML += `
        ${decodedStr}`

     
        
 }

 //Sending message

function sendEmail(to,subject,message) {
  Email.send({
    Host: "smtp.gmail.com",
    Username :  "testingforweb01@gmail.com",
    Password : "Password!23",
    To : to,
    From : 'testingforweb01@gmail.com',
    Subject : subject,
    Body : message,
   
  })
  .then(function(message){
    alert("mail sent successfully",message)
  });
}

