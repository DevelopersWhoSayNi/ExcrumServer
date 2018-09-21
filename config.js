var credentials = process.env.MLAB_KEY;

module.exports = {
  url: `mongodb://${credentials}@ds231941.mlab.com:31941/excrum`
};
