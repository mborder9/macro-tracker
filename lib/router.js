function emailVerified (user) {
  return _.some(user.emails, function (email) {
    return email.verified
  })
}

var filters = {

  /**
   * ensure user is logged in and 
   * email verified
   */
  authenticate: function () {
    var user

    if (Meteor.loggingIn()) {

      console.log('[authenticate filter] loading')
      this.layout('layout_no_header')
      this.render('loading')

    } else {

      user = Meteor.user()

      if (!user) {
        console.log('[authenticate filter] signin')
        this.layout('layout_no_header')
        this.render('startup')
        return
      }

      /*
      if (!emailVerified(user)) {
        console.log('[authenticate filter] awaiting-verification')
        this.layout('layout')
        this.render('awaiting-verification')
        return
      }*/

      console.log('[authenticate filter] done')
      this.layout('layout')

      this.next()
    }
  },  // end authenticate

  /**
   * nop used to illustrate multiple filters
   * use-case
   */
  testFilter: function () {
    console.log('[test filter]')
    this.next()
  }
}



Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {return Meteor.subscribe('foods');}
});

Router.route('/login', {
  name: 'Login',
  layoutTemplate: 'layout_login'
  //before: [filters.authenticate, filters.testFilter]
});

Router.route('/register', {
  name: 'Register',
  layoutTemplate: 'layout_register'
  //before: [filters.authenticate, filters.testFilter]
});

Router.route('/', {
  name: 'startup',
  before: [filters.authenticate, filters.testFilter]
});

Router.route('/foodlist', {
	name: 'foodList',
	before: [filters.authenticate, filters.testFilter]
});

Router.route('/weekly', {
	name: 'weeklyTrack',
	before: [filters.authenticate, filters.testFilter]
});
