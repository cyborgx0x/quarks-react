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
import { Template } from "../../type";
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
  item, updateState
}: {
  item: Template; updateState: React.Dispatch<React.SetStateAction<Template>>
}): ReactElement {
  const templateId = useId("template_id");
  const templateAuthor = useId("template_author");
  const templateTag = useId("template_tag");
  const templateDesc = useId("template_desc");
  const templateContentYaml = useId("template_content");

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Label htmlFor={templateId}>Template ID:</Label>
      <Input
        contentBefore={<DocumentRegular />}
        id={templateId}
        placeholder={item.name}
        value={item.name}
        disabled

      />
      <Label htmlFor={templateAuthor}>Author:</Label>
      <Input
        contentBefore={<Person />}
        id={templateAuthor}
        placeholder={item.author}

        onChange={(e) =>
          updateState({ ...item, author: e.target.value })
        }
      />

      <Divider />
      <Label htmlFor={templateTag} >Tag:</Label>
      <Input
        contentBefore={<Tag16Regular />}
        id={templateTag}
        placeholder={item.tag}
        onChange={(e) =>
          updateState({ ...item, tag: e.target.value })
        }
      />
      <Divider />
      <Label htmlFor={templateDesc} size="medium">
        Mô tả:
      </Label>
      <Textarea
        resize="vertical"
        id={templateDesc}
        placeholder={item.desc}
        onChange={(e) =>
          updateState({ ...item, desc: e.target.value })
        }
      />
      <Label htmlFor={templateContentYaml} size="medium">
        Content:
      </Label>
      <CodeMirror value={item.templateData} height="300px" theme={vscodeDark}
        onChange={(value) => {
          updateState({ ...item, templateData: value })
        }} />
    </div>
  );
}
