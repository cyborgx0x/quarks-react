import {
  useId,
  Label,
  Divider,
  makeStyles,
  shorthands,
  Input,
  Body1Stronger,
} from "@fluentui/react-components";
import { DocumentRegular, TextDescriptionRegular, DeleteRegular, TagRegular, PersonRegular, CardUiRegular } from "@fluentui/react-icons/lib/fonts";

import { ReactElement, useState } from "react";
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
export default function ProfileCreate({
  newProfile,
  setNewProfile,
  header,
  setHeader,
  authorFilter,
  setAuthorFilter,
  tagFilter,
  setTagFilter,
  idFilter,
  setIdFilter
}: {
  newProfile: ScanProfile,
  setNewProfile: React.Dispatch<React.SetStateAction<ScanProfile>>,
  header: string[],
  setHeader: React.Dispatch<React.SetStateAction<string[]>>
  authorFilter: string[],
  setAuthorFilter: React.Dispatch<React.SetStateAction<string[]>>
  tagFilter: string[],
  setTagFilter: React.Dispatch<React.SetStateAction<string[]>>
  idFilter: string[],
  setIdFilter: React.Dispatch<React.SetStateAction<string[]>>
}): ReactElement {
  const classes = useStyles();
  const ProfileName = useId("profile_name");
  const ProfileDesc = useId("profile_desc");


  const customHeader = useId("custom-header");
  const authorFilterID = useId("author-filter");
  const tagFilterID = useId("tag-filter");
  const IDFilterID = useId("id-filer");


  const follow_redirects: SwitchProps = {};


  const [temp, setTemp] = useState<string>('')
  const [tempAuthor, setTempAuthor] = useState<string>('')
  const [tempTag, setTempTag] = useState<string>('')
  const [tempID, setTempID] = useState<string>('')
  const updateHeader = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setHeader([...header, e.currentTarget.value])
      setTemp('')
    }
  }
  const updateTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setTagFilter([...tagFilter, e.currentTarget.value])
      setTempTag('')
    }
  }
  const updateAuthor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setAuthorFilter([...authorFilter, e.currentTarget.value])
      setTempAuthor('')
    }
  }
  const updateID = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setIdFilter([...idFilter, e.currentTarget.value])
      setTempID('')
    }
  }
  return (
    <div className={classes.container}>
      <Label htmlFor={ProfileName}>Tên Profile:</Label>
      <Input
        contentBefore={<DocumentRegular />}
        id={ProfileName}
        placeholder="Nhập tên dễ nhớ cho Profile"
        onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
      />
      <Label htmlFor={ProfileDesc}>Mô tả cho Profle:</Label>
      <Input
        contentBefore={<TextDescriptionRegular />}
        id={ProfileDesc}
        placeholder="Mô tả ngắn sẽ được hiển thị khi tùy chọn Scan"
        onChange={(e) => setNewProfile({ ...newProfile, desc: e.target.value })}
      />
      <Divider />
      <Switch label="Follow Redirects" {...follow_redirects} onChange={(e) => setNewProfile({ ...newProfile, configuration: { ...newProfile.configuration, follow_redirects: e.target.value } })} />

      <Divider />

      <Label htmlFor={customHeader}>Custom header</Label>
      <Input contentBefore={<AddRegular />} id={customHeader} onKeyDown={(e) => updateHeader(e)} value={temp} onChange={e => { setTemp(e.target.value) }} />
      {header.map(item => <div key={item} style={{ display: "flex", justifyContent: 'space-between' }}><Body1Stronger>{item}</Body1Stronger><DeleteRegular /></div>)}
      <Divider />

      <Label htmlFor={authorFilterID}>Author Filter</Label>
      <Input contentBefore={<PersonRegular />} id={authorFilterID} onKeyDown={(e) => updateAuthor(e)} value={tempAuthor} onChange={e => { setTempAuthor(e.target.value) }} />
      {authorFilter.map(item => <div key={item} style={{ display: "flex", justifyContent: 'space-between' }}><Body1Stronger>{item}</Body1Stronger><DeleteRegular /></div>)}
      <Divider />

      <Label htmlFor={tagFilterID}>Tag Filter</Label>
      <Input contentBefore={<TagRegular />} id={tagFilterID} onKeyDown={(e) => updateTag(e)} value={tempTag} onChange={e => { setTempTag(e.target.value) }} />
      {tagFilter.map(item => <div key={item} style={{ display: "flex", justifyContent: 'space-between' }}><Body1Stronger>{item}</Body1Stronger><DeleteRegular /></div>)}
      <Divider />

      <Label htmlFor={IDFilterID}>ID Filter</Label>
      <Input contentBefore={<CardUiRegular />} id={IDFilterID} onKeyDown={(e) => updateID(e)} value={tempID} onChange={e => { setTempID(e.target.value) }} />
      {idFilter.map(item => <div key={item} style={{ display: "flex", justifyContent: 'space-between' }}><Body1Stronger>{item}</Body1Stronger><DeleteRegular /></div>)}


      <Divider />
    </div>
  );
}
