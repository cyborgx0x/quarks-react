import {
  Label,
  Divider,
  makeStyles,
  shorthands,
  useId,
  Input,
  Textarea,
} from "@fluentui/react-components";
import { ReactElement } from "react";
import { Template, TemplateData } from "../../type";
import YAML from "yaml";
import { templateData } from "../../yamlData";
import { DocumentRegular, Tag16Regular } from "@fluentui/react-icons/lib/fonts";
import { Person } from "@mui/icons-material";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    maxWidth: "100%",
  },
});

export default function TemplateEdit({
  item,
}: {
  item: Template;
}): ReactElement {
  const templateId = useId("template_id");
  const templateAuthor = useId("template_author");
  const templateTag = useId("template_tag");
  const templateDesc = useId("template_desc");
  const templateContentYaml = useId("template_content");
  const data: TemplateData = YAML.parse(templateData);
  const templateContent = YAML.stringify(data);
  console.log(templateContent);
  console.log(item);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Label htmlFor={templateId}>Template ID:</Label>
      <Input
        contentBefore={<DocumentRegular />}
        id={templateId}
        placeholder={data.id}
        value={data.id}
        disabled
      />
      <Label htmlFor={templateAuthor}>Author:</Label>
      <Input
        contentBefore={<Person />}
        id={templateAuthor}
        placeholder={data.info.author}
        value={data.info.author}
        disabled
      />

      <Divider />
      <Label htmlFor={templateTag}>Tag:</Label>
      <Input
        contentBefore={<Tag16Regular />}
        id={templateTag}
        placeholder={data.info.tags.toString()}
        value={data.info.tags.toString()}
      />
      <Divider />
      <Label htmlFor={templateDesc} size="medium">
        Mô tả:
      </Label>
      <Textarea
        resize="vertical"
        id={templateDesc}
        placeholder={data.info.description}
        value={data.info.description}
      />
      <Label htmlFor={templateContentYaml} size="medium">
        Content:
      </Label>
      <CodeMirror value={templateData} height="300px" theme={vscodeDark} />
    </div>
  );
}
