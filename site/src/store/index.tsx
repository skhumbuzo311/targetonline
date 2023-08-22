import { createContext, useRef } from 'react';

export const CurrentUserContext = createContext<any>({})

export default function Store(props: any) {
	const localStorageUser : string | null = localStorage.getItem('targetOnlineUser');

	const currentUser = useRef<any>(localStorageUser == null ?  null : JSON.parse(localStorage.getItem('targetOnlineUser')!));

	return (
		<CurrentUserContext.Provider value={{ currentUser }}>
			{props.children}
		</CurrentUserContext.Provider>
	);
};