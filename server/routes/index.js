module.exports = function(app) {
    require('./customerRoute')(app);
    require('./billRoute')(app);
}