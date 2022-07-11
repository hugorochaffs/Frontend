import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import styles from './styles';
import useService from '../../services/useService';
import socialNetworkProfileservice from '../../services/socialNetworkProfile';
import { UserContext } from '../../store/contexts/userContext';
import Input from '../../components/UI/input';
import colors from '../../../assets/styles/colorVariables';

const findUsers = ({ navigation }) => {
    const { user } = useContext(UserContext);

    const [isFindUserLoading, setFindUserLoading] = useState(false);
    const [usersProfile, setUsersProfile] = useState(null);
    const [findName, setFindName] = useState(null);

    useEffect(() => {
        async function setupPage() {
            setFindUserLoading(true);
            const findUserTemp = await useService(
                socialNetworkProfileservice,
                'findUsersProfiles',
                [user._id, findName],
            );
            setUsersProfile(findUserTemp);
            setFindUserLoading(false);
        }
        const timer = setTimeout(() => {
            if (findName) {
                setupPage();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [findName, navigation]);

    const renderLoadingIndicator = () => (
        // <View style={styles.loadingContainer}>
        <ActivityIndicator
            style={styles.loading}
            size="large"
            color={colors.primary}
        />
        // </View>
    );

    return (
        <ScrollView style={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
            <View style={styles.container}>
                <Input
                    change={(name) => setFindName(name)}
                    label={'Pesquisar'}
                    placeholder={'Digite o nome do usuário'}
                    value={findName}
                    keyboard={'default'}
                />

                {isFindUserLoading ? (
                    renderLoadingIndicator()
                ) : (
                    <View>
                        {usersProfile ? (
                            usersProfile.map((profile) => {
                                return (
                                    <TouchableOpacity
                                        key={profile._id}
                                        onPress={() =>
                                            navigation.navigate(
                                                'Perfil social dos Usuários',
                                                {
                                                    profileId: profile._id,
                                                    profileUsername:
                                                        profile.username,
                                                    profileNumberOfFollowers:
                                                        profile.numberOfFollowers,
                                                    profileNumberOfFollowing:
                                                        profile.numberOfFollowing,
                                                    profilePhoto:
                                                        profile.user.photo,
                                                },
                                            )
                                        }>
                                        <View
                                            style={[
                                                styles.card,
                                                styles.elevation,
                                            ]}>
                                            <Image
                                                style={styles.profileImage}
                                                source={{
                                                    uri: `data:image/png;base64,${profile.user.photo}`,
                                                }}
                                            />
                                            <View style={styles.textContainer}>
                                                <Text style={styles.text}>
                                                    {profile.username}
                                                </Text>
                                                <Text style={styles.text}>
                                                    Seguidores:{' '}
                                                    {profile.numberOfFollowers}
                                                </Text>
                                                <Text style={styles.text}>
                                                    Seguindo:{' '}
                                                    {profile.numberOfFollowing}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default findUsers;