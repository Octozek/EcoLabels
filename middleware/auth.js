const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  const withAdminAuth = (req, res, next) => {
    if (!req.session.logged_in || !req.session.isAdmin) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = { withAuth, withAdminAuth };
  