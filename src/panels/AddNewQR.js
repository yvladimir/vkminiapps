import React from 'react';
import PropTypes from 'prop-types';


import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';
import Placeholder from '@vkontakte/vkui/dist/components/Placeholder/Placeholder';
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import bridge from '@vkontakte/vk-bridge';
import { Icon28CameraOutline, Icon56UsersOutline, Icon56MentionOutline, Icon56AddCircleOutline } from '@vkontakte/icons';

const AddNewQR = ({ id, go, fetchedUser }) => (
    <Panel id={id}>
        <PanelHeader
            left={<PanelHeaderBack onClick={go} data-to="home" />}
        >
            Добавление чека
		</PanelHeader>
        <Group>
            <Placeholder
                icon={<Icon56AddCircleOutline />}
                header="Добавить новый чек"
                action={<Button size="l" before={<Icon28CameraOutline />} onClick={() => {
                    bridge.send('VKWebAppOpenCodeReader')
                }}>Сканировать QR</Button>}
            >
                Добавляйте больше чеков и выигрывайте призы!
              </Placeholder>
            <Separator />
        </Group>
    </Panel>);

AddNewQR.propTypes = {
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

export default AddNewQR;
