import {
  Body1Strong,
  Divider,
  Subtitle1,
  Text,
  Title1,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";
import { ReactElement } from "react";
import { Template, TemplateData } from "../../type";
import YAML from "yaml";
import { templateData } from "../../yamlData";

const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    maxWidth: "100%",
  },
});

export default function TemplateDetail({
  item,
}: {
  item: Template;
}): ReactElement {
  const data: TemplateData = YAML.parse(templateData);
  const templateContent = YAML.stringify(data);
  console.log(templateContent);
  console.log(item);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Title1 align="center">{data.id}</Title1>
      <Divider />
      <Subtitle1>Tác giả: {data.info.author}</Subtitle1>
      <Text>Độ nghiêm trọng: {data.info.severity}</Text>
      <Text>
        Tag: <Body1Strong>{data.info.tags}</Body1Strong>
      </Text>
      <Text>
        Mô tả : <Body1Strong>{data.info.description}</Body1Strong>
      </Text>
      <Divider />
      <code>
        <Body1Strong>Chi tiết:</Body1Strong>
        <pre>{templateData}</pre>
      </code>
    </div>
  );
}
