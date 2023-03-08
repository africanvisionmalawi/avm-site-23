export default function exit(req, res) {
  res.clearPreviewData();
  res.writeHead(387, { Location: "/" });
  res.end();
}
