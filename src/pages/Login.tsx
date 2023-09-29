import * as React from "react";
import axios, { AxiosRequestConfig } from 'axios';
import {
    makeStyles,
    shorthands,
    useId,
    Body1,
    Button,
    Input,
    Label,
} from "@fluentui/react-components";
import { PersonRegular, Eye24Regular } from "@fluentui/react-icons";
import type { ButtonProps } from "@fluentui/react-components";
import { LoginData } from "../type";
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        ...shorthands.gap("20px"),
        // Prevent the example from taking the full width of the page (optional)
        maxWidth: "400px",
        // Stack the label above the field (with 2px gap per the design system)
        "> div": {
            display: "flex",
            flexDirection: "column",
            ...shorthands.gap("2px"),
        },
    },
});

const EyeIcon: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            {...props}
            appearance="transparent"
            icon={<Eye24Regular />}
            size="small"
        />
    );
};

export const LoginView = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = React.useState<LoginData>({
        username: '',
        password: '',
    });
    const styles = useStyles();

    const beforeId = useId("content-before");
    const afterId = useId("content-after");

    const handleLogin = () => {
        const config: AxiosRequestConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/token/',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (config.url) {

            axios.post(config.url, loginData)
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access);
                    navigate('/templates');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div className={styles.root}>
            <div>
                <Label htmlFor={beforeId}>Full name</Label>
                <Input contentBefore={<PersonRegular />} id={beforeId} type="email" onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} value={loginData.username} />
                <Body1>
                    Your username that you register with our system
                </Body1>
            </div>

            <div>
                <Label htmlFor={afterId}>Password</Label>
                <Input
                    type="password"
                    contentAfter={<EyeIcon aria-label="Enter by voice" />}
                    id={afterId}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <Body1>
                    Do not let anyone see your input
                </Body1>
            </div>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default LoginView;
