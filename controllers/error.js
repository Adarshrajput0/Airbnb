exports.pageNotFound = (req, res, next) => {
  res.status(400).render("store/404", {
    pageTitle: "Page Not Found",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
