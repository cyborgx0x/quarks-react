import {
  makeStyles,
  shorthands,
  useId,
  Body1,
  SpinButton,
  Input,
  Label,
  Title3,
  Divider,
} from "@fluentui/react-components";
import { Link24Regular, Add24Regular } from "@fluentui/react-icons";

import { Switch } from "@fluentui/react-components";
import type { SwitchProps } from "@fluentui/react-components";
import { TemplateSelectionView } from "./TemplateSelections";
import  ScanProgressView  from "./ScanProgress";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    // Prevent the example from taking the full width of the page (optional)
    // maxWidth: "400px",
    // Stack the label above the field (with 2px gap per the design system)
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },
});

export default function NucleiOptionView() {
  const styles = useStyles();
  const maxRedirect = useId("max-redirect");
  const customHeader = useId("custom-header");
  const targetURL = useId("content-before");
  const disableRedirect = useId("disable-redirect");
  const follow_redirects: SwitchProps = {};
  const disable_redirects: SwitchProps = {};

  return (
    <div className={styles.root}>
      <div>
        <Title3>Input Target Group</Title3>
        <Label htmlFor={targetURL}>URL:</Label>
        <Input contentBefore={<Link24Regular />} id={targetURL} />
        <Body1>
          Input the URL target, example: <code>vulscan.me</code>.
        </Body1>
      </div>
      <Divider />
      <div>
        <Title3>Redirect Configuration</Title3>
        <Switch label="Follow Redirects" {...follow_redirects} />
        <Switch
          label="Follow Redirects on the same Host"
          {...follow_redirects}
        />
        <Label htmlFor={maxRedirect}>Max Redirects:</Label>
        <SpinButton defaultValue={10} min={0} max={20} id={maxRedirect} />
        <Label htmlFor={disableRedirect}>Disable Redirect:</Label>
        <Switch label="Disable Redirect" {...disable_redirects} />
      </div>
      <Divider />
      <div>
        <Title3>Report Configuration</Title3>

      </div>
      <Divider />
      <div>
        <Title3>Scan Option</Title3>
        <Label htmlFor={customHeader}>Custom header:</Label>
        <Input contentBefore={<Add24Regular />} id={customHeader} />
        <Body1>
          Custom Header will Appear Here
        </Body1>
      </div>
      <Divider />
      <div>
        <Title3>Scan Progress</Title3>
        <ScanProgressView />
      </div>
      <Divider />
      <div>
        <Title3>Template Selection</Title3>
        <TemplateSelectionView />
      </div>
      <Divider />
    </div>
  );
}
