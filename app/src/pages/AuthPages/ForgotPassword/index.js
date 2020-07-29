import React, { useState } from 'react';

import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';
import Input from '../../../components/UI/input';
import colors from '../../../../assets/styles/colorVariables';
import Button from '../../../components/UI/button';
import { Icon } from 'react-native-elements';
import styles from './styles';
import checkEmailFormat from '../../../utils/emailValidator';
import firebaseService from '../../../services/Firebase';
import { alertSuccess, alertError } from '../../../utils/Alert';

export default function ForgotPassword({ navigation }) {
    const navigateBackToLoginPage = () => navigation.goBack();
    const [email, setEmail] = useState('');
    const [isEmailFormatValid, setIsEmailFormatValid] = useState(false);
    const [
        forgotPasswordRequestLoading,
        setForgotPasswordRequestLoading,
    ] = useState(false);

    const handlerSubmit = async () => {
        try {
            setForgotPasswordRequestLoading(true);
            await firebaseService.resetUserPassword(email.trim().toLowerCase());
            navigateBackToLoginPage();
            alertSuccess(
                'Email enviado com sucesso! Por favor, verifique sua a caixa de entrada com as instruções de mudança de senha!',
            );
        } catch (err) {
            setForgotPasswordRequestLoading(false);
            alertError(
                err,
                'Email não encontrado. Tente novamente!',
                'Ooops..',
            );
        }
    };

    const renderLoadingIndicator = () => (
        <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} size="large" />
        </View>
    );

    const forgotPasswordForm = () => {
        let buttonDisabled;
        let isEmailInputValid;

        if (email.length == 0 || isEmailFormatValid == false) {
            buttonDisabled = true;
        } else {
            buttonDisabled = false;
        }

        if (email.length == 0 || isEmailFormatValid) {
            isEmailInputValid = true;
        } else {
            isEmailInputValid = false;
        }

        return (
            <View style={styles.content}>
                <View style={styles.contentText}>
                    <Icon
                        name="unlock"
                        size={80}
                        type="foundation"
                        color={colors.primary}
                    />
                    <Text style={styles.textTitle}>Esqueceu sua senha?</Text>
                    <Text style={styles.subtitle}>
                        Será enviado instruções de como redefinir sua senha por
                        e-mail.
                    </Text>
                    <View style={styles.inputWrapper}>
                        <Input
                            placeholder="Digite seu email"
                            value={email}
                            change={(email) => {
                                setIsEmailFormatValid(checkEmailFormat(email));
                                setEmail(email);
                            }}
                            valid={isEmailInputValid}
                        />
                    </View>
                </View>
                <Button
                    large
                    press={handlerSubmit}
                    title="Enviar"
                    disabled={buttonDisabled}
                />
            </View>
        );
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={'height'}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" color="black" />
                    </TouchableOpacity>
                </View>
                {forgotPasswordRequestLoading
                    ? renderLoadingIndicator()
                    : forgotPasswordForm()}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}