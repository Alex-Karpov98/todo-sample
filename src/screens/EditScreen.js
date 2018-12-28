import React from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import AppStyle from '../AppStyle';

export default class EditScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitleStyle: {
            color: AppStyle.colorSet.whiteColor,
        },
        headerTintColor: AppStyle.colorSet.whiteColor,
        headerBackTitleStyle: { color: AppStyle.colorSet.whiteColor },
        headerStyle: {
            backgroundColor: AppStyle.colorSet.mainColor,
        },
        title: 'Todo',
        headerRight:
            <TouchableOpacity onPress={() => { navigation.state.params.onSave() }} >
                <Text style={AppStyle.styleSet.rightNavButton}>SAVE</Text>
            </TouchableOpacity>,
    });

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            title: null,
            content: null,
            completed: false,
        };

        const todo = props.navigation.getParam('data');
        if (todo) {
            this.state = { ...todo };
        }

    }

    componentDidMount() {
        this.props.navigation.setParams({
            onSave: this.onSave
        });
    }

    onSave = () => {
        if (this.state.id) {
            this.props.navigation.dispatch({ type: 'update', payload: this.state });
        } else {
            const todo = this.state;
            todo.id = new Date().getTime();
            this.props.navigation.dispatch({ type: 'add', payload: this.state });
        }

        this.props.navigation.goBack();
    }

    onCompleted = () => {
        this.state.completed = !this.state.completed;
        this.props.navigation.dispatch({ type: 'update', payload: this.state });
        this.props.navigation.goBack();
    }

    onDelete = () => {
        this.props.navigation.dispatch({ type: 'delete', payload: this.state });
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ScrollView>
                <TextInput
                    style={styles.title}
                    placeholder="Title"
                    placeholderTextColor={AppStyle.colorSet.whiteColor}
                    onChangeText={(text) => this.setState({ title: text })}
                    value={this.state.title}
                    underlineColorAndroid='transparent' />
                <TextInput
                    style={styles.content}
                    placeholder="Content"
                    numberOfLines={4}
                    multiline={true}
                    placeholderTextColor={AppStyle.colorSet.whiteColor}
                    onChangeText={(text) => this.setState({ content: text })}
                    value={this.state.content}
                    underlineColorAndroid='transparent' />
                {this.state.id &&
                    <View style={styles.btnRow}>
                        <Button containerStyle={styles.btnContainer} style={styles.btnText} onPress={() => this.onCompleted()}>{this.state.completed ? 'Uncompleted' : 'Completed'}</Button>
                        <Button containerStyle={styles.btnContainer} style={styles.btnText} onPress={() => this.onDelete()}>Delete</Button>
                    </View>

                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        margin: 10,
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        color: AppStyle.colorSet.whiteColor,
        backgroundColor: AppStyle.colorSet.darkColor,
    },
    content: {
        margin: 10,
        height: 120,
        paddingLeft: 20,
        paddingRight: 20,
        textAlignVertical: 'top',
        color: AppStyle.colorSet.whiteColor,
        borderRadius: 5,
        backgroundColor: AppStyle.colorSet.darkColor,
    },
    btnRow: {
        flexDirection: 'row',        
        justifyContent: 'space-between',
        margin: 15,
    },
    btnContainer: {
        width: '40%',
        backgroundColor: AppStyle.colorSet.darkColor,
        borderRadius: 25,
        padding: 10,
    },
    btnText: {
        color: AppStyle.colorSet.whiteColor
    },
});


