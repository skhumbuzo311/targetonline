import { useState, createContext } from 'react';

export const CurrentUserContext = createContext<any>({})

export default function Store(props: any) {
	const [currentUser, setCurrentUser] = useState({})

	return (
		<CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
			{props.children}
		</CurrentUserContext.Provider>
	);
};