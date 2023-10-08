import { Tab, TabList } from "@fluentui/react-tabs";
import {
    makeStyles,
    shorthands,

    Divider,

} from "@fluentui/react-components";
// import {
//     CalendarMonthRegular,
//     CalendarMonthFilled,
//     bundleIcon,
// } from "@fluentui/react-icons";

import { ReactElement, createContext, useState } from "react";
import { Link } from "react-router-dom";
// const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
export const LayoutContext = createContext({});
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
export default function LayoutProvider({ children }: { children: ReactElement }): ReactElement {

    const [layout, setLayout] = useState("default");
    const styles = useStyles();

    return (
        <>
            <TabList defaultSelectedValue={""} size="large">
                <Tab value="templates">
                    <Link reloadDocument to={"/templates"} >Templates</Link>
                </Tab>

                <Tab
                    // icon={<CalendarMonth />} 
                    value="scans">
                    <Link reloadDocument to={"/scans"} >Scans</Link>
                </Tab>
                <Tab value="profiles" >
                    <Link reloadDocument to={"/profiles"} >Profiles</Link>
                </Tab>
                <Tab value="targets" >
                    <Link reloadDocument to={"/targets"} >Targets</Link>
                </Tab>
            </TabList>
            <Divider />
            <LayoutContext.Provider value={{ layout, setLayout }}>
                <div className={styles.root}>
                    {children}
                </div>
            </LayoutContext.Provider>
        </>
    );
}

