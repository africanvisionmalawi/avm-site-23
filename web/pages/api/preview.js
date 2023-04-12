export default function preview(req, res) {
  res.setPreviewData({});
  res.writeHead(307, {
    Location: req?.query?.slug ? `/${req.query.slug}` : "/",
  });
  res.end();
}
