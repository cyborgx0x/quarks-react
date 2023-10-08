import {
  Divider,
  Subtitle1,
  Text,
  Title1,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { ReactElement } from "react";
import { ScanProfile } from "../../type";

const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    maxWidth: "100%",
  },
});

export default function ProfileDetail({
  item,
}: {
  item: ScanProfile;
}): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Title1 align="center">{item.name}</Title1>
      <Divider />
      <Subtitle1>Mô tả: {item.desc}</Subtitle1>

      <Text>Các tùy chọn:</Text>
      <code>
        {item.option}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non rem quas
        commodi veniam quibusdam, incidunt porro laborum sit. Magnam voluptatum,
        praesentium eos voluptate nesciunt vero omnis doloremque facere
        inventore est.
      </code>

      <Divider />
    </div>
  );
}
