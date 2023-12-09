import * as React from "react";
import {
    makeStyles,
    shorthands,
    Button,
    Caption1,
    Text,
    tokens,
} from "@fluentui/react-components";
import { MoreHorizontal20Regular, ScanObjectRegular } from "@fluentui/react-icons";
import { Card, CardHeader } from "@fluentui/react-components";
import axiosInstance from "../axiosConfig";


const useStyles = makeStyles({
    main: {
        ...shorthands.gap("36px"),
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
    },

    card: {
        width: "360px",
        maxWidth: "100%",
        height: "fit-content",
    },

    section: {
        width: "fit-content",
    },

    title: {
        ...shorthands.margin(0, 0, "12px"),
    },

    horizontalCardImage: {
        width: "64px",
        height: "64px",
    },

    headerImage: {
        ...shorthands.borderRadius("4px"),
        maxWidth: "44px",
        maxHeight: "44px",
    },

    caption: {
        color: tokens.colorNeutralForeground3,
    },

    text: {
        ...shorthands.margin(0),
    },
});



export default function CardScan(
    { target, profile }: { target: number | undefined, profile: number | undefined }
): React.ReactElement {
    const styles = useStyles();
    const handleScan = () => {
        const url = '/api/user/scans/';

        axiosInstance.post(url, {
            profile: profile,
            targets: [target],
        })
            .then((response) => {
                window.location.reload();
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {

                console.log(error);
            });
    }
    return (
        <div className={styles.main}>
            <section className={styles.section}>
                <Card className={styles.card}>
                    <CardHeader
                        header={<Text weight="semibold">Profile: Mặc định</Text>}
                        description={
                            <Caption1 className={styles.caption}>Tạo bởi hệ thống</Caption1>
                        }
                        action={
                            <Button
                                appearance="transparent"
                                icon={<MoreHorizontal20Regular />}
                                aria-label="More options"
                            />
                        }
                    />

                    <p className={styles.text}>
                        Quét Target mới nhất
                        Để tùy chỉnh, vui lòng tạo Profile quét mới và quét nâng cao
                    </p>
                    <Button icon={<ScanObjectRegular />} appearance="primary" onClick={handleScan}>Thực hiện quét</Button>
                </Card>
            </section>

        </div>
    );
}