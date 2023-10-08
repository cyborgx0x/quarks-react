import {
  useId,
  Body1,
  SpinButton,
  // Input,
  Label,
  Title3,
  Divider,
  makeStyles,
  shorthands,
  Input,
} from "@fluentui/react-components";
import { DocumentRegular } from "@fluentui/react-icons/lib/fonts";

import { ReactElement } from "react";
import { Switch } from "@fluentui/react-components";
import type { SwitchProps } from "@fluentui/react-components";
import { AddRegular, TextDescriptionRegular } from "@fluentui/react-icons";
import { ScanProfile } from "../../type";

const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
});
export default function ProfileEdit({
  item,
}: {
  item: ScanProfile;
}): ReactElement {
  const classes = useStyles();
  const ProfileName = useId("profile_name");
  const ProfileDesc = useId("profile_desc");

  const maxRedirect = useId("max-redirect");
  const customHeader = useId("custom-header");
  const disableRedirect = useId("disable-redirect");
  const follow_redirects: SwitchProps = {};
  const disable_redirects: SwitchProps = {};
  return (
    <div className={classes.container}>
      <Label htmlFor={ProfileName}>Tên Profile:</Label>
      <Input
        contentBefore={<DocumentRegular />}
        id={ProfileName}
        placeholder="Nhập tên dễ nhớ cho Profile"
        value={item.name}
      />
      <Label htmlFor={ProfileDesc}>Mô tả cho Profle:</Label>
      <Input
        contentBefore={<TextDescriptionRegular />}
        id={ProfileDesc}
        placeholder="Mô tả ngắn sẽ được hiển thị khi tùy chọn Scan"
        value={item.desc}
      />
      <Title3>Tùy chọn chuyển hướng</Title3>
      <Switch label="Follow Redirects" {...follow_redirects} />
      <Switch label="Follow Redirects on the same Host" {...follow_redirects} />
      <Label htmlFor={maxRedirect}>Max Redirects:</Label>
      <SpinButton defaultValue={10} min={0} max={20} id={maxRedirect} />
      <Label htmlFor={disableRedirect}>Disable Redirect:</Label>
      <Switch label="Disable Redirect" {...disable_redirects} />

      <Divider />

      <Title3>Report Configuration</Title3>

      <Divider />

      <Title3>Scan Option</Title3>
      <Label htmlFor={customHeader}>Custom header:</Label>
      <Input contentBefore={<AddRegular />} id={customHeader} />
      <Body1>Custom Header will Appear Here</Body1>
      <Divider />
    </div>
  );
}
