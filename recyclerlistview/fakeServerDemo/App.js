import React, { Component } from 'react';
import {
  // Button,
  Dimensions,
  // InputAccessoryView,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../Button';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from 'recyclerlistview';
import { fakeServer } from './fakeServer';

export default class fakeServerDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }),
      someThingHappen: false,
      fakeData: [],
      loadingMore: false,
      onEndReached_pass: false,
      onScroll_pass: false,
      onRecreat_pass: false,
      onVisibleIndicesChanged_pass: false,
      onItemLayout_pass: false,
      text: '初始状态', refreshing: false,

    };
  }

  layoutProvider = new LayoutProvider(
    index => {
      if (this.state.dataProvider.getDataForIndex(index).type) {
        return this.state.dataProvider.getDataForIndex(index).type;
      } else {
        return 'dufault';
      }
    },
    (type, dim) => {
      // console.log(type);
      switch (type) {
        case 'fake-data':
          dim.width = 365;
          dim.height = 50;
          break;
        default:
          dim.width = 365 / 2;
          dim.height = 50;
      }
    }
  );

  fetchData = async qty => {
    this.setState({ ...this.state, loadingMore: true });
    const data = await fakeServer(qty);
    if (data === 'done')
      return this.setState({ ...this.state, loadingMore: false });
    this.setState({
      ...this.state,
      dataProvider: this.state.dataProvider.cloneWithRows([
        ...this.state.fakeData,
        ...data,
      ]),
      fakeData: [...this.state.fakeData, ...data],
      loadingMore: false,
    });
  };

  componentDidMount() {
    this.fetchData(20);
  }

  rowRenderer = (type, data, index, extendedState) => {
    switch (type) {
      case 'fake-data':
        return (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              padding: 5,
              borderBottomColor: 'red',
              borderBottomWidth: 1,
              backgroundColor: 'red',
              height: 50,
            }}
          >
            {data.item}
          </Text>
        );

      case 'non-fake-data':
        return (
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                padding: 5,
                borderBottomColor: 'red',
                borderBottomWidth: 1,
                backgroundColor: 'yellow',
                height: 50,
              }}
            >
              {data.item}
            </Text>
            {extendedState.someThingHappen ? <Text>Yes Happen</Text> : null}
          </View>
        );

      default:
        return null;
    }
  };

  fetchMore = async () => {
    console.log('calling fetchMore');
    await this.fetchData(20);
  };

  //下拉视图开始刷新时调用
  _onRefresh() {

    if (this.state.refreshing === false) {
        this.setState({text:'正在刷新......',refreshing: true})

        //5秒后结束刷新
        setTimeout( ()=>{
            this.setState({text:'结束状态',refreshing: false})
        }, 5000)

    }
  }


  render() {
    if (!this.state.dataProvider._data.length) return null;
    return (
      <>
        {/* <Button title='test' color='#555'/> */}
        <Text style={styles.infoText}>onEndReached: {this.state.onEndReached_pass? 'Pass':'Not triggered'}</Text>
        <Text style={styles.infoText}>onItemLayout: {this.state.onItemLayout_pass? 'Pass':'Not triggered'}</Text>
        <Text style={styles.infoText}>onVisibleIndicesChanged: {this.state.onVisibleIndicesChanged_pass? 'Pass':'Not triggered'}</Text>
        <Text style={styles.infoText}>onRecreate: {this.state.onRecreat_pass? 'Pass':'Not triggered'}</Text>
        <Text style={styles.infoText}>onScroll: {this.state.onScroll_pass? 'Pass':'Not triggered'}</Text>
        <RecyclerListView
          dataProvider={this.state.dataProvider}
          layoutProvider={this.layoutProvider}
          rowRenderer={this.rowRenderer}
          extendedState={{ someThingHappen: this.state.someThingHappen }}
          onEndReached={() => {
            this.fetchMore;
            this.setState({...this.state, onEndReached_pass: true})
          }}
          onItemLayout={() => this.setState({...this.state, onItemLayout_pass: true})}
          onVisibleIndicesChanged={() => this.setState({...this.state, onVisibleIndicesChanged_pass: true})}
          onRecreate={() => this.setState({...this.state, onRecreat_pass: true})}
          onScroll={() => this.setState({...this.state, onScroll_pass: true})}
          
          onEndReachedThreshold={0.5}
          // disableRecycling={true}
          // forceNonDeterministicRendering={true}
          renderFooter={() =>
            this.state.loadingMore && (
              <Text
                style={{ padding: 10, fontWeight: 'bold', textAlign: 'center' }}
              >
                Loading
              </Text>
            )
          }
          scrollViewProps={{
            scrollEnabled: true
          }}
        />
        <View style={styles.container}>
          <Button
            title='click me'
            onPress={() =>
              this.setState({
                ...this.state,
                someThingHappen: !this.state.someThingHappen,
              })
            }
            color="#841584"
          />
          <Button
          title='click me'
          onPress={() =>
            this.setState({
              ...this.state,
              someThingHappen: !this.state.someThingHappen,
            })
          }
          color="#841584"
        />
        </View>
        
      </>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#FFF',
    flexDirection: 'row',
    width: 365,
    height: 100,
  },
  infoText: {
    fontSize:10,
    width: 200,
    height:25
  }
})
// export default App;