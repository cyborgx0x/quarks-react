import * as React from "react";
import { Field, ProgressBar } from "@fluentui/react-components";

const intervalDelay = 100;
const intervalIncrement = 1;

const ScanProgressView = () => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        const id = setInterval(() => {
            setValue(value < 42 ? intervalIncrement + value : 0);
        }, intervalDelay);
        return () => {
            clearInterval(id);
        };
    });
    return (
        <Field
            validationMessage={`There have been ${value} template scanned`}
            validationState="none"
        >
            <ProgressBar max={42} value={value} />
        </Field>
    );
};
export default ScanProgressView