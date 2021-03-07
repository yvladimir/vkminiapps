import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import { AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import AddNewQR from './panels/AddNewQR';
import AddNewQRSuccess from './panels/AddNewQRSuccess';

import Persik from './panels/Persik';

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [fetchedUserPhone, setUserPhone] = useState(null);
	const [qrData, setQrData] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}

			if (type === 'VKWebAppOpenCodeReaderResult') {
				setQrData(data);
				setActivePanel('add-new-qr-success');
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const phone = await bridge.send("VKWebAppGetPhoneNumber");

			setUser(user);
			setUserPhone(phone);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={popout}>
					<Home id='home' fetchedUser={fetchedUser} fetchedUserPhone={fetchedUserPhone} go={go} />
					<Persik id='persik' qrData={qrData} go={go} />
					<AddNewQR fetchedUser={fetchedUser} id='add-new-qr' go={go} />
					<AddNewQRSuccess id='add-new-qr-success' go={go} />
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;

