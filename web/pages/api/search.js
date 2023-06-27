const pages = require("cache/data").pages;

export default (req, res) => {
  const results = req.query.q
    ? pages.filter((page) =>
        page.title.toLowerCase().includes(req.query.q.toLowerCase())
      )
    : [];
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
};
