import { Label, Divider, makeStyles, shorthands, useId, Input, Textarea } from "@fluentui/react-components";
import { ReactElement } from "react";
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
        maxWidth: "100%"
    },
});


export default function TemplateCreate(): ReactElement {
    const templateId = useId("template_id");
    const templateAuthor = useId("template_author");
    const templateTag = useId("template_tag");
    const templateDesc = useId("template_desc");
    const templateContentYaml = useId("template_content");

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Label htmlFor={templateId}>Template ID:</Label>
            <Input contentBefore={<DocumentRegular />} id={templateId} placeholder="ID của Template" />
            <Label htmlFor={templateAuthor}>Author:</Label>
            <Input contentBefore={<Person />} id={templateAuthor} placeholder="Tên tác giả" />

            <Divider />
            <Label htmlFor={templateTag}>Tag:</Label>
            <Input contentBefore={<Tag16Regular />} id={templateTag} placeholder="Thêm thẻ tag cho dự án" />
            <Divider />
            <Label htmlFor={templateDesc} size="medium">Mô tả:</Label>
            <Textarea resize="vertical" id={templateDesc} placeholder="Thêm mô tả để dễ dàng tìm kiếm về sau" />
            <Label htmlFor={templateContentYaml} size="medium">Content:</Label>
            <CodeMirror
                value={templateData}
                height="300px"
                theme={vscodeDark}
            />
        </div>
    )
}