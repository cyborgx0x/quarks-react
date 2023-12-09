import { ReactElement } from "react";
import { LinkRegular, OrganizationRegular } from "@fluentui/react-icons";

import {
  useId,
  Body1,
  Label,
  Input,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";


const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    maxWidth: "100%",
  },
});

export default function TargetEdit({ url, org , setUrl, setOrg}: { 
  url: string, org: string, setUrl: React.Dispatch<React.SetStateAction<string>>, setOrg: React.Dispatch<React.SetStateAction<string>>
 }): ReactElement {
  const targetURL = useId("target-url");
  const targetOrg = useId("target-org");
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Label htmlFor={targetURL}>URL:</Label>
      <Input
        contentBefore={<LinkRegular />}
        id={targetURL}
        placeholder="example.com"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <Body1>
        Input the URL target, example: <code>example.com</code>.
      </Body1>
      <Label htmlFor={targetOrg}>Tổ chức:</Label>
      <Input
        contentBefore={<OrganizationRegular />}
        id={targetOrg}
        placeholder="Some Organization"
        value={org}
        onChange={(e) => {
          setOrg(e.target.value);
        }}
      />
    </div>
  );
}
