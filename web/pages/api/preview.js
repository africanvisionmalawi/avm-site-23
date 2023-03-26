export default function preview(req, res, slug) {
  res.setPreviewData({});
  res.writeHead(387, { Location: slug ? `/${slug}` : "/" });
  res.end();
}
