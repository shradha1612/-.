// listen for auth status changes
//track authtication status
auth.onAuthStateChanged(user => {
    // console.log(user)
    if(user){
    //get data from firestore
    // db.collection('updates').get().then(snapshot =>{
    db.collection('updates').onSnapshot(snapshot =>{
    setupUpdates(snapshot.docs);
    //console.log(snapshot.docs)
    // console.log('user logged in: ',user)
    setupUI(user); //user hai to setupUi ko call kro in index.js and display acc
    },err => {
        console.log(err.message)
    });
} else{
        setupUI()
        setupUpdates([])
        //console.log('user logged out');
    }
});

//create new update 
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    db.collection('updates').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(()=>{
        //close the modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();

    }).catch(err =>{
        console.log(err.message)
    })
})


// SIGNUP 
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    //signup user
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        return db.collection('users').doc(cred.user.uid).set({  //firebase automatically create collection
            bio: signupForm['signup-bio'].value
        });
    }).then(()=>{
        const modal = document.querySelector('#modal-signup');
        //to close after submiting form i.e close modal
        M.Modal.getInstance(modal).close();
        //reset blank
        signupForm.reset();
    });
});


// LOGOUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut();
});
// // LOGOUT
// const logoutt = document.querySelector('#logoutt');
// logout.addEventListener('click', (e)=>{
//     e.preventDefault();
//     auth.signOut();
// });

// LOGIN
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        //close the login modal and reset
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
});