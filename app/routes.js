//Where CRUD is happening. Create, Result, Update, Delete
module.exports = function(app, passport, db) {
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  //Result
  app.get('/', function(req, res) {
    //tells us what page to render in the dom
    res.render('orderpage.ejs');
  });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/vieworders', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/vieworders', // redirect to the secure profile section
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    })
  );


  app.post('/vieworders', (req, res) => {
    db.collection('messages').save(
      {
        size: req.body.size,
        drink: req.body.drink,
        name: req.body.name,
        completion: req.body.completion,
        isIced: req.body.isIced
      },
      (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        //refreshing the page, which will then display with the latest message added.
        res.redirect('/orderlist.ejs');
      }
    );
  });

  app.put('/vieworders/completeOrder', (req, res) => {
    db.collection('messages').findOneAndUpdate({name: req.body.name, size: req.body.size},
      {
        $set: { completion: req.body.completion },
      },
      (err, result) => {
        if (err) return console.log(err);
        res.send(result);
      }
    );
  });

  app.get('/vieworders', isLoggedIn, function(req, res) {
    //get request grabs profile function
    // routes js line 14-19 is our request. GET is what we use to achieve this
    db.collection('messages')
      .find()
      .toArray((err, result) => {
        console.log(result);
        //reuest to grabbatabase collection named message,into array
        if (err) return console.log(err);
        //conditional console logged for error
        res.render('orderlist.ejs', {
          user: req.user,
          orders: result
        });
      });
  });

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/vieworders');
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}
