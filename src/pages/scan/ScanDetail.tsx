import { ReactElement } from "react";
import { TemplateInfo } from "../../type";
import TemplateInfoCard from "../../components/VulnerabitilyDetail";
import { Body1, Body1Strong, Divider, Spinner } from "@fluentui/react-components";


export default function ScanDetailView({ result, status, log }: { result: TemplateInfo[], status: number, log: string }): ReactElement {

    return (
        <>  {status === 4 && "Lỗi"}
            {status === 3 &&
                <>
                    <Body1Strong>Info: {result.filter(item => item.info.severity === "info").length}</Body1Strong>
                    <Divider />
                    <Body1Strong>HTTP: {result.filter(item => item.type === "http").length}</Body1Strong>
                    <Divider />
                    <Body1Strong>DNS: {result.filter(item => item.type === "dns").length}</Body1Strong>
                    <Divider />
                    {result.map(item => <TemplateInfoCard templateInfo={item} key={Math.random()} />)}
                </>


            }
            {(status === 1 || status === 0) && <>

                {log.split("\n").map(item => <>
                    <div style={{ margin: "10px", padding: "5px" }}>
                        <Body1>
                            {item}
                        </Body1>
                        <Divider />

                    </div>
                </>)}
                <Divider />
                <Spinner></Spinner>
            </>}
        </>
    )
}