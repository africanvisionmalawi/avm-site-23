import CMS from "netlify-cms-app";
// import uploadcare from "netlify-cms-media-library-uploadcare";
// import cloudinary from "netlify-cms-media-library-cloudinary";

// import AboutPagePreview from "./preview-templates/AboutPagePreview";
// import BlogPostPreview from "./preview-templates/BlogPostPreview";
// import ProductPagePreview from "./preview-templates/ProductPagePreview";
// import IndexPagePreview from "./preview-templates/IndexPagePreview";

import { TeamPagePreview } from "./preview-templates/TeamPagePreview";
import { BasicPagePreview } from "./preview-templates/BasicPagePreview";

// CMS.registerMediaLibrary(uploadcare);
// CMS.registerMediaLibrary(cloudinary);

// CMS.registerPreviewTemplate("index", IndexPagePreview);
// CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("teamPage", TeamPagePreview);
CMS.registerPreviewTemplate("howwestarted", BasicPagePreview);
// CMS.registerPreviewTemplate("products", ProductPagePreview);
// CMS.registerPreviewTemplate("blog", BlogPostPreview);
