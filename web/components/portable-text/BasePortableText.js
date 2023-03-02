import { PortableText as BasePortableText } from "@portabletext/react";
import components from "components/portable-text/Components";
import clientConfig from "/client-config";

export const PortableText = ({ blocks }) => {
  // console.log("blocks here ******** ", blocks);
  return (
    <BasePortableText
      value={blocks}
      components={components}
      {...clientConfig.sanity}
    />
  );
};
