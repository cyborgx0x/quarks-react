import { Tab, TabList } from "@fluentui/react-tabs";
import { makeStyles, shorthands, Divider } from "@fluentui/react-components";
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
export default function LayoutProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [layout, setLayout] = useState("default");
  const styles = useStyles();

  return (
    <>
      <TabList defaultSelectedValue={""} size="large">
        <Link
          reloadDocument
          to={"/templates"}
          style={{ textDecoration: "none" }}
        >
          {" "}
          <Tab value="templates">Templates</Tab>
        </Link>

        <Link reloadDocument to={"/scans"} style={{ textDecoration: "none" }}>
          <Tab
            // icon={<CalendarMonth />}
            value="scans"
          >
            Scans
          </Tab>
        </Link>
        <Link
          reloadDocument
          to={"/profiles"}
          style={{ textDecoration: "none" }}
        >
          <Tab value="profiles">Profiles</Tab>
        </Link>
        <Link reloadDocument to={"/targets"} style={{ textDecoration: "none" }}>
          <Tab value="targets">Targets</Tab>
        </Link>
      </TabList>
      <Divider />
      <LayoutContext.Provider value={{ layout, setLayout }}>
        <div className={styles.root}>{children}</div>
      </LayoutContext.Provider>
    </>
  );
}
