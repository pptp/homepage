/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var i18n = require('i18n');

exports.setLocale = function (req, res, next) {
	var lang = req.params.lang;
	// console.log('setLocale: "' + lang + '"');
  if (lang && i18n.getLocales().indexOf(lang) !== -1) {
    req.setLocale(lang);
  } else {
  	// console.log("Redirect. Locales: " + i18n.getLocales().join(', '));
    res.redirect('/ru/');
  }

  res.locals.language = lang;
  res.locals.languages = i18n.getLocales();

  console.log(res.locals.languages);

  const langIndex = res.locals.languages.findIndex(_l => _l == lang);
  const nextLangIndex = (langIndex == res.locals.languages.length - 1) ? 0 : langIndex + 1;

  res.locals.nextLang = res.locals.languages[nextLangIndex];

  next();
};

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	var lang = req.params.lang;
	// console.log('setLocale: "' + lang + '"');

	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' + lang },
		{ label: 'Blog', key: 'blog', href: '/' + lang + '/blog' },
		// { label: 'Gallery', key: 'gallery', href: '/gallery' },
		// { label: 'Contact', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
