import { ReactElement } from "react";
import { LinkRegular, OrganizationRegular } from "@fluentui/react-icons";

import { makeStyles, shorthands, Body2 } from "@fluentui/react-components";
import { Target } from "../../type";

const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    maxWidth: "100%",
  },
});

export default function TargetDetail({ item }: { item: Target }): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Body2>
        <LinkRegular></LinkRegular> Đường dẫn: {item.url}
      </Body2>
      <Body2>
        <OrganizationRegular></OrganizationRegular> Tổ chức: {item.org}
      </Body2>
    </div>
  );
}
