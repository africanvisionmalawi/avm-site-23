import React from "react";
// import PropTypes from "prop-types";
// import { PageBasicTemplate } from "../../templates/page-basic";
import { PageBasicTemplate } from "../../components/previewTemplates/PageBasic";

export const BasicPagePreview = ({ entry, widgetFor }) => {
  return (
    <PageBasicTemplate
      title={entry.getIn(["data", "title"])}
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      path={null}
      isAdmin={true}
    />
  );
};
