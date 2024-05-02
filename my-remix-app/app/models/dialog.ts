import {MouseEvent} from "react";

export interface DialogData {
    onClose: (event: MouseEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
    title?: string;
}
