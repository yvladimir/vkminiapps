import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import List from '@vkontakte/vkui/dist/components/List/List';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import bridge from '@vkontakte/vk-bridge';
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs';
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import { Icon28CameraOutline, Icon16Dropdown, Icon20Add, Icon28UserOutline, Icon28SettingsOutline, Icon28PrivacyOutline, Icon12Verified } from '@vkontakte/icons';


const Home = ({ id, go, fetchedUser, fetchedUserPhone }) => {
	const [state, setState] = useState({
		activePanel: 'panel1',
		contextOpened: false,
		mode: 'all',
		activeTab1: 'recomendations',
		activeTab2: 'music',
		activeTab3: 'news',
		activeTab4: 'all',
		activeTab5: 'all',
	});


	// this.select = this.select.bind(this);


	return (
		<Panel id={id}>
			<PanelHeader>Золотая Лилия</PanelHeader>

			{
				fetchedUser &&
				<Group>
					<Cell
						before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200} /> : null}
						description={fetchedUserPhone && fetchedUserPhone.phone_number ? fetchedUserPhone.phone_number : 'Не определен'}
					>
						{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
					</Cell>
				</Group>
			}

			<Group>
				<Banner
					mode="image"
					size="m"
					header="Вы накопили: 500 рублей"
					subheader={<span>Добавляйте чеки и выигрывайте призы</span>}
					background={
						<div
							style={{
								backgroundColor: '#5b9be6',
								backgroundImage: 'url(https://sun9-31.userapi.com/PQ4UCzqE_jue9hAINefBMorYCdfGXvcuV5nSjA/eYugcFYzdW8.jpg)',
								backgroundPosition: 'right bottom',
								backgroundSize: '102%',
								backgroundRepeat: 'no-repeat',
							}}
						/>
					}
				/>
			</Group>

			<Group header={<Header mode="secondary">Добавленные чеки</Header>}>
				<List>
					<Cell before={<Icon12Verified />} description="Добавлен: 03 Марта 2021">Чек №: 6007cc35a92dc</Cell>
					<Cell before={<Icon12Verified />} description="Добавлен: 02 Марта 2021">Чек №: 8907aa75a92db</Cell>
					<Cell before={<Icon12Verified />} description="Добавлен: 01 Марта 2021">Чек №: 8937kl34a83dc</Cell>
				</List>
			</Group>

			<Group>
				<Div>
					<Button stretched size="l" before={<Icon20Add />} onClick={go} data-to="add-new-qr">
						Добавить новый чек
				</Button>
				</Div>
			</Group>
		</Panel >
	);
}


Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
