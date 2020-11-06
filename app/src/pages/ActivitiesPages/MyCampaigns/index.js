import React, { useState, useContext, useCallback } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import MyRequestHelpCard from '../../../components/MyRequestHelpCard';
import { UserContext } from '../../../store/contexts/userContext';
// import helpService from '../../../services/Help';
import styles from '../styles';
import colors from '../../../../assets/styles/colorVariables';

import NoHelps from '../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import useService from '../../../services/useService';
import campaignService from '../../../services/Campaign';

export default function CampaignsFinished({ navigation }) {
    const [finishedCampaignList, setFinishedCampaignList] = useState([]);
    const [loadingCampaignRequests, setLoadingCampaignRequests] = useState(
        false,
    );

    const { user } = useContext(UserContext);
    useFocusEffect(
        useCallback(() => {
            loadOnGoingCampaigns();
        }, [navigation]),
    );

    async function loadOnGoingCampaigns() {
        setLoadingCampaignRequests(true);
        const { _id: userId } = user;
        const resFinished = await useService(
            campaignService,
            'getCampaignMultipleStatus',
            [userId, 'waiting'],
        );
        if (!resFinished.error) {
            setFinishedCampaignList(resFinished);
        }
        setLoadingCampaignRequests(false);
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const renderCampaignList = () => {
        if (finishedCampaignList.length > 0) {
            return (
                <ScrollView>
                    <View style={styles.campaignList}>
                        {finishedCampaignList.map((campaign) => {
                            if (campaign.ownerId === user._id) {
                                return (
                                    <TouchableOpacity
                                        key={campaign._id}
                                        onPress={() =>
                                            navigation.navigate(
                                                'MyOfferCampaignDescription',
                                                {
                                                    campaign,
                                                },
                                            )
                                        }>
                                        {/* Tirar isEntityUser depois */}
                                        <MyRequestHelpCard
                                            help={campaign}
                                            isEntityUser={true}
                                        />
                                    </TouchableOpacity>
                                );
                            } else {
                                return (
                                    <NoHelps
                                        title={
                                            'Você não possui nenhuma campanha criada'
                                        }
                                    />
                                );
                            }
                        })}
                        {/*TODO: O `if` foi adicionado porque as ajudas estavam aparecendo mesmo se voce nao for dono... Rever essa logica para uma mais escalavel.*/}
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <NoHelps title={'Você não possui nenhuma campanha criada'} />
            );
        }
    };
    return (
        <View>
            {loadingCampaignRequests
                ? renderLoadingIndicator()
                : renderCampaignList()}
        </View>
    );
}
