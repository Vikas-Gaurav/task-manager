export interface IUser {
    _id?: string;
    name: string;
    taskList?: Array<string>;
}
export interface IModalData{
    headerTitle?: string;
    bodyText?: string;
    input?: {
        lable: string;
        placeholder: string;
    }
    submitBtnText: string;
};