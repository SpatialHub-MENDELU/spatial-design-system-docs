import { FileType } from "./fileType";

export interface TreeNode {
    key: string;
    label: string;
    data?: { name: string; type: FileType };
    children?: TreeNode[];
}
