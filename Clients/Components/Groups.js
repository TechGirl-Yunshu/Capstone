import React, { Component } from 'react';
import UserPage from './UserPage';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import styles from './Style';
import { firestore, auth } from '../../fire';
import GroupItem from './GroupItem';
import SignOut from './SignOut';

export default class Groups extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Groups',
      headerLeft: null,
      headerRight: (
        <SignOut style={styles.name} navigate={navigation.navigate} />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      username: ''
    };
  }

  async getUserName() {
    try {
      const user = await firestore
        .collection('publicUsers')
        .doc(this.props.navigation.getParam('userId', 'NO-ID'))
        .get();

      return user.data().username;
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    const username = await this.getUserName();
    this.setState({ username: username, groups: [] });
    this.unsubscribe = firestore
      .collection('groups')
      .where('members', 'array-contains', username)
      // .get()
      // .then(docs =>
      //   docs.forEach(doc => {
      //     this.setState({
      //       groups: [...this.state.groups, { id: doc.id, data: doc.data() }]
      //     });
      .onSnapshot(docs => {
        this.setState({ groups: [] });
        docs.forEach(doc => {
          this.setState({
            groups: [...this.state.groups, { id: doc.id, data: doc.data() }]
          });
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  returnSubtitle(members) {
    let len = members.length;
    if (len < 5) {
      return members.join(', ');
    } else {
      let FirstThree = members.filter((cur, i) => i < 3).join(', ');
      return FirstThree + `... and ${len - 3} more`;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <Card title="GROUPS" style={styles.card}>
          {this.state.groups.map((group, i) => (
            <GroupItem
              key={i}
              id={group.id}
              group={group.data}
              returnSubtitle={this.returnSubtitle}
              navigate={navigate}
              user={this.state.username}
            />
          ))}
        </Card>
        <TouchableOpacity
          style={{ paddingBottom: 50 }}
          onPress={() => {
            navigate('AddGroupForm', {
              username: this.state.username
            });
          }}
        >
          <Text style={styles.button}>Add Group</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
