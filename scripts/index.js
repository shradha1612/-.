const updateList = document.querySelector('.updates')
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in'); 
const accountDetails = document.querySelector('.account-details');

const setupUI =(user)=>{
    if(user){
//account info
db.collection('users').doc(user.uid).get().then(doc =>{
  const html=`
  <div>logged in as ${user.email}</div>
  <div>${doc.data().bio}</div>
  `;
  accountDetails.innerHTML=html;

})
        //toggle UI elements
        loggedInLinks.forEach(item=> item.style.display = 'block');
        loggedOutLinks.forEach(item=> item.style.display = 'none');
    }else{
      //hide account info
      accountDetails.innerHTML=''
        loggedInLinks.forEach(item=> item.style.display = 'none');
        loggedOutLinks.forEach(item=> item.style.display = 'block');
    }
}

//setup updates
const setupUpdates = (data) => {
if(data.length){
    let html = '';
    data.forEach(doc =>{
    const update = doc.data();
    //console.log(update)
    const li=`
    <li >
    <div class="collapsible-header white">
    <h5>${update.title}</h5>
  </div>
    <div class="collapsible-body grey lighten-3">
    <h6>${update.content}</h6>
    </div>
    </li>
    `;
    html += li
    });
    updateList.innerHTML= html;
}else {
    updateList.innerHTML=`
    <div class="row">
    <div class="col s12 m12">
      <div class="card-panel black">
        <span class="white-text"><h5>Log in to see updates of your classroom <h5/>
        </span>
      </div>
    </div>
  </div> `
}
}



//set materialize components
document.addEventListener('DOMContentLoaded', function(){
    var modals= document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items=document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

})

//sidenav
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances=  M.Sidenav.init(elems, instances);
});