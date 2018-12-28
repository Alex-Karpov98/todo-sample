import { Animated, Easing, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import AppStyle from '../AppStyle';
import EditScreen from '../screens/EditScreen';
import ListScreen from '../screens/ListScreen';

const noTransitionConfig = () => ({
    transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
    }
})

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

const RootNavigator = createStackNavigator({
    List: { screen: ListScreen },
    Edit: { screen: EditScreen },
}, {
        initialRouteName: 'List',
        transitionConfig: noTransitionConfig,
        headerMode: 'float',
        navigationOptions: ({ navigation }) => ({
            headerTintColor: 'blue',
            headerStyle: {
                backgroundColor: 'red',
            },
        }),
        cardStyle: { backgroundColor: AppStyle.colorSet.mainColor },
    }
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'center',
        color: 'blue',
        flex: 1,
        backgroundColor: 'yellow'
    },
})

const mapStateToProps = state => ({
    state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };

