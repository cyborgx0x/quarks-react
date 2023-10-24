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
  Select,
} from "@fluentui/react-components";
import { DocumentRegular } from "@fluentui/react-icons/lib/fonts";

import { ReactElement } from "react";
import { Switch } from "@fluentui/react-components";
import type { SwitchProps } from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { ScanProfile } from "../../type";

const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
});
export default function ProfileCreate({ newProfile, setNewProfile }: { newProfile: ScanProfile, setNewProfile: React.Dispatch<React.SetStateAction<ScanProfile>> }): ReactElement {
  const classes = useStyles();
  const ProfileName = useId("profile_name");

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
        onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
      />

      <Title3>Tùy chọn chuyển hướng</Title3>
      <Switch label="Follow Redirects" {...follow_redirects} onChange={(e) => setNewProfile({ ...newProfile, configuration: { ...newProfile.configuration, follow_redirects: e.target.value } })} />
      <Switch label="Follow Redirects on the same Host" {...follow_redirects} />
      <Label htmlFor={maxRedirect}>Max Redirects:</Label>
      <SpinButton defaultValue={10} min={0} max={20} id={maxRedirect} />
      <Label htmlFor={disableRedirect}>Disable Redirect:</Label>
      <Switch label="Disable Redirect" {...disable_redirects} />

      <Divider />

      <Title3>Template Filter</Title3>
      <Select>
        <option>Tất cả</option>
      </Select>
      <Divider />

      <Title3>Scan Option</Title3>
      <Label htmlFor={customHeader}>Custom header:</Label>
      <Input contentBefore={<AddRegular />} id={customHeader} />
      <Body1>Custom Header will Appear Here</Body1>
      <Divider />
    </div>
  );
}
