import React, { memo } from "react";
import { Helmet } from "react-helmet";

import { APP_NAME } from "@/constants";

type Props = {
  pageTitle: string;
};
export const _Head: React.FC<Props> = ({ pageTitle }) => {
  const title = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME;
  const description = "Symphony Software `with Powerful for Club";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content=" Business" />
      <meta name="author" content="Symphony Production" />
    </Helmet>
  );
};

export const Head = memo(_Head);
