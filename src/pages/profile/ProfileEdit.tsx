import {
  useId,
  // Input,
  Label,
  Divider,
  makeStyles,
  shorthands,
  Input,
  Body1Stronger,
} from "@fluentui/react-components";
import { DocumentRegular } from "@fluentui/react-icons/lib/fonts";

import { ReactElement, useState } from "react";

import { AddRegular, CardUiRegular, DeleteRegular, PersonRegular, TagRegular, TextDescriptionRegular } from "@fluentui/react-icons";


const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
});
export default function ProfileEdit({
  profileName, setProfileName,
  profileDesc, setProfileDesc,
  header, setHeader,
  authorFilter, setAuthorFilter,
  tagFilter, setTagFilter,
  idFilter, setIdFilter
}: {
  profileName: string,
  setProfileName: React.Dispatch<React.SetStateAction<string>>,
  profileDesc: string,
  setProfileDesc: React.Dispatch<React.SetStateAction<string>>,
  header: string[] | undefined,
  setHeader: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  authorFilter: string[] | undefined,
  setAuthorFilter: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  tagFilter: string[] | undefined,
  setTagFilter: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  idFilter: string[] | undefined,
  setIdFilter: React.Dispatch<React.SetStateAction<string[] | undefined>>
}): ReactElement {
  const classes = useStyles();
  const ProfileName = useId("profile_name");
  const ProfileDesc = useId("profile_desc");
  const customHeader = useId("custom-header");
  const authorFilterID = useId("author-filter");
  const tagFilterID = useId("tag-filter");
  const IDFilterID = useId("id-filer");

  const [temp, setTemp] = useState<string>('')
  const [tempAuthor, setTempAuthor] = useState<string>('')
  const [tempTag, setTempTag] = useState<string>('')
  const [tempID, setTempID] = useState<string>('')

  const updateHeader = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setHeader([...(header || []), e.currentTarget.value])

      setTemp('')
    }
  }
  const updateTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setTagFilter([...(tagFilter || []), e.currentTarget.value])
      setTempTag('')
    }
  }
  const updateAuthor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setAuthorFilter([...(authorFilter || []), e.currentTarget.value])
      setTempAuthor('')
    }
  }
  const updateID = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setIdFilter([...(idFilter || []), e.currentTarget.value])
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
        value={profileName}
        onChange={(e) => setProfileName(e.target.value)}
      />
      <Label htmlFor={ProfileDesc}>Mô tả cho Profle:</Label>
      <Input
        contentBefore={<TextDescriptionRegular />}
        id={ProfileDesc}
        value={profileDesc}
        placeholder="Mô tả ngắn sẽ được hiển thị khi tùy chọn Scan"
        onChange={(e) => setProfileDesc(e.target.value)}
      />
      <Divider />

      <Divider />

      <Label htmlFor={customHeader}>Custom header</Label>
      <Input contentBefore={<AddRegular />} id={customHeader} onKeyDown={(e) => updateHeader(e)} value={temp} onChange={e => { setTemp(e.target.value) }} />
      {header &&
        header.map(item => <div key={item} style={{ display: "flex", justifyContent: 'space-between' }}><Body1Stronger>{item}</Body1Stronger><DeleteRegular /></div>)
      }
      <Divider />

      <Label htmlFor={authorFilterID}>Author Filter</Label>
      <Input contentBefore={<PersonRegular />} id={authorFilterID} onKeyDown={(e) => updateAuthor(e)} value={tempAuthor} onChange={e => { setTempAuthor(e.target.value) }} />

      {authorFilter && authorFilter.map(item => <div key={item} style={{ display: "flex", justifyContent: 'space-between' }}><Body1Stronger>{item}</Body1Stronger><DeleteRegular /></div>)}
      <Divider />

      <Label htmlFor={tagFilterID}>Tag Filter</Label>
      <Input contentBefore={<TagRegular />} id={tagFilterID} onKeyDown={(e) => updateTag(e)} value={tempTag} onChange={e => { setTempTag(e.target.value) }} />
      {tagFilter && tagFilter.map(item => <div key={item} style={{ display: "flex", justifyContent: 'space-between' }}><Body1Stronger>{item}</Body1Stronger><DeleteRegular /></div>)}
      <Divider />

      <Label htmlFor={IDFilterID}>ID Filter</Label>
      <Input contentBefore={<CardUiRegular />} id={IDFilterID} onKeyDown={(e) => updateID(e)} value={tempID} onChange={e => { setTempID(e.target.value) }} />
      {idFilter && idFilter.map(item => <div key={item} style={{ display: "flex", justifyContent: 'space-between' }}><Body1Stronger>{item}</Body1Stronger><DeleteRegular /></div>)}


      <Divider />
    </div>
  );
}
