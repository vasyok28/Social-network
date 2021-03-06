import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { compose, Dispatch } from "redux";
import { MessageType } from "./Message/Message";
import { DialogType } from "./DialogItem/DialogItem";
import { sendMessageCreator } from "../../redux/reducers/dialogs-reducer";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

// Dialogs type
export type DialogsType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
}
export type DialogsPropsType = mapDispatchToPropsType & mapStateToPropsType;

// Dispatch type
type mapDispatchToPropsType = {
    sendMessage: (message: string) => void
}
type mapStateToPropsType = {
    dialogsPage: DialogsType
}

// Dispatch connect
const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        sendMessage: (message: string) => {
            dispatch(sendMessageCreator(message));
        },
    }
}

export const DialogsContainer = compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
