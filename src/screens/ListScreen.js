import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import AppStyle from '../AppStyle';

class ListScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitleStyle: {
            color: AppStyle.colorSet.whiteColor,
        },

        headerStyle: {
            backgroundColor: AppStyle.colorSet.mainColor,
        },
        title: 'Todo Lists',
        headerLeft:
            <Icon style={AppStyle.styleSet.menuButton} name="ios-person" size={AppStyle.iconSizeSet.normal} color={AppStyle.colorSet.whiteColor} />,
        headerRight:
            <TouchableOpacity onPress={() => { navigation.state.params.onEdit() }} >
                <Icon style={AppStyle.styleSet.rightNavButton} name="ios-add" size={AppStyle.iconSizeSet.normal} color={AppStyle.colorSet.whiteColor} />
            </TouchableOpacity>,
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onEdit: this.onEdit
        });
    }

    onEdit = (item) => {
        this.props.navigation.navigate('Edit', { data: item });
    }


    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onEdit(item)}>
            <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                {item.completed &&
                    <Icon style={styles.checked} name="ios-checkmark-circle-outline" size={AppStyle.iconSizeSet.normal} color={AppStyle.colorSet.whiteColor} />
                }
            </View>
        </TouchableOpacity>
    )

    render() {
        return (
            < FlatList
                data={this.props.todos}
                renderItem={this.renderItem}
                keyExtractor={item => `${item.id}`}
            />
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: AppStyle.colorSet.darkColor,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    title: {
        padding: 20,
        flex: 1,
        color: AppStyle.colorSet.whiteColor,
    },
    checked: {
        marginRight: 15,
    }
});

const mapStateToProps = state => ({
    todos: state.todosReducer.todos,
});

export default connect(mapStateToProps)(ListScreen);

