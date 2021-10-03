  /**
   * Sample JavaScript code for gmail.users.drafts.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyDG5xC4ErbnEQ4Gq2MQR5hlBKLqV0rqr7k");
    return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
// ===========Getuserdetails starts=============

  function clear(){
    const messages = document.querySelector(".primary");
               messages.innerHTML= " ";
  }  

 
 // ==============Message details Starts================

  function getmessage() {
    return gapi.client.gmail.users.messages.list({
      "userId": "me",
      "maxResults": 10
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }

 // =============Message details ends==========
 //=============Thread message================
 function getThreadmsg() {
  return gapi.client.gmail.users.threads.list({
    "userId": "me",
    "maxResults": 20
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              const msgarr = response.result.threads;
              console.log(msgarr)
              clear() 

              msgarr.forEach((user)=>{ 
                                
               const messages = document.querySelector(".primary");
               messages.innerHTML+=`<button onClick="getmsgdetail('${user.id}')" id="threadmsg">${user.snippet}</button><hr/>`;
                  
            },
            function(err) { console.error("Execute error", err); });
      
  }) 
}

 //=============Thread Message ends=============
 //=========Message Preview starts=============


  function getmsgdetail(userids) {
    return gapi.client.gmail.users.threads.get({
      "userId": "me",
      "id": userids
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log(response.result.messages);
              },
              function(err) { console.error("Execute error", err); });
  }

//======Send Mail=========



        
//=========Send mail end============
            
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "68402850544-44tf25t6o3lb1k3ilk3qb0kvkb9vhnt9.apps.googleusercontent.com"});
  });

