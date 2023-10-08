import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogActions,
    DialogContent,
    Button,
} from "@fluentui/react-components";
import { ReactElement } from "react";

export default function DialogComponent({ buttonTitle, title, children, action }: { buttonTitle: ReactElement, title: string, children: ReactElement, action: ReactElement }): ReactElement {
    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                {buttonTitle}
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        {children}
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        {action}
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}