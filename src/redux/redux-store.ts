import { applyMiddleware, combineReducers, createStore } from 'redux';

import { dialogsReducer } from './reducers/dialogs-reducer';
import { profileReducer } from './reducers/profile-reducer';
import { sidebarReducer } from './reducers/sidebar-reducer';
import { usersReducer } from './reducers/users-reducer';
import { authReducer } from './reducers/auth-reducer';
import thunk from 'redux-thunk';
import { appReducer } from './reducers/app-reducer';

const rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
