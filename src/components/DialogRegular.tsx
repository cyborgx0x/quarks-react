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

export default function DialogComponent({ buttonTitle, title, children, action, open, setopen }: { buttonTitle: ReactElement, title: string, children: ReactElement, action: ReactElement, open: boolean, setopen: React.Dispatch<React.SetStateAction<boolean>> }): ReactElement {
    return (
        <Dialog open={open}>
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
                            <Button appearance="secondary" onClick={()=>setopen(false)}>Close</Button>
                        </DialogTrigger>
                        {action}
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}