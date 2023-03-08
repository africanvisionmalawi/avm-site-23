export default function preview(req, res) {
  res.setPreviewData({});
  res.writeHead(387, { Location: "/" });
  res.end();
}
