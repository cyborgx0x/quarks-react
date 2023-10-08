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
    Input
} from "@fluentui/react-components";

import { ReactElement } from "react";
import { Switch } from "@fluentui/react-components";
import type { SwitchProps } from "@fluentui/react-components";
import { LinkRegular } from "@fluentui/react-icons";


const useStyles = makeStyles({
    container: {
        ...shorthands.gap("16px"),
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    },
});
export default function ProfileCreate(): ReactElement {
    const classes = useStyles();

    const maxRedirect = useId("max-redirect");
    const customHeader = useId("custom-header");
    const targetURL = useId("input-url");
    const disableRedirect = useId("disable-redirect");
    const follow_redirects: SwitchProps = {};
    const disable_redirects: SwitchProps = {};
    return (

        <div className={classes.container}>
            <div >

                <Label htmlFor={targetURL}>URL:</Label>
                <br />
                <Input contentBefore={<LinkRegular />} id={targetURL} />
                <br />
                <Body1>
                    Input the URL target, example: <code>vulscan.me</code>.
                </Body1>
            </div>
            <Divider />
            <div>
                <Title3>Redirect Configuration</Title3>
                <br />
                <Switch label="Follow Redirects" {...follow_redirects} />
                <br />
                <Switch
                    label="Follow Redirects on the same Host"
                    {...follow_redirects}
                />
                <br />
                <Label htmlFor={maxRedirect}>Max Redirects:</Label>
                <br />
                <SpinButton defaultValue={10} min={0} max={20} id={maxRedirect} />
                <br />
                <Label htmlFor={disableRedirect}>Disable Redirect:</Label>
                <br />
                <Switch label="Disable Redirect" {...disable_redirects} />
            </div>
            <Divider />
            <div>
                <Title3>Report Configuration</Title3>

            </div>
            <Divider />
            <div>
                <Title3>Scan Option</Title3>
                <br />
                <Label htmlFor={customHeader}>Custom header:</Label>
                {/* <Input contentBefore={<Add24Regular />} id={customHeader} /> */}
                <br />
                <Body1>
                    Custom Header will Appear Here
                </Body1>
            </div>
            <Divider />
        </div>
    )
}