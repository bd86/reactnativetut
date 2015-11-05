/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var MOCKED_MOVIES_DATA = [
  {
    title: 'Title',
    year: '2015',
    posters: {
      thumbnail: 'http://i.imgur.com/UePbdph.jpg'
    }
  },
];
//USE GOOGLE TO CONVERT XML TO JSON
//MAKE NEW BRANCH FOR ANIMATION
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var RSS_FEED = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=http%3A%2F%2Fwww.charismanews.com%2Findex.php%3Foption%3Dcom_ninjarsssyndicator%26feed_id%3D1%26format%3Draw';

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(RSS_FEED)
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData.responseData.feed.entries);
        this.setState({
          //dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          dataSource: this.state.dataSource.cloneWithRows(responseData.responseData.feed.entries),
          loaded: true,
        });
      })
      .done();
  },
  render: function() {
    //var movie = MOCKED_MOVIES_DATA[0];
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  },
  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.mediaGroups[0].contents[0].url}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.contentSnippet}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
