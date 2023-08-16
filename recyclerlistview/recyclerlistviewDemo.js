import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import faker from 'faker';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

// const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_WIDTH = 365
export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(this._generateData(20)),
    };

    this.layoutProvider = new LayoutProvider((i) => {
      return this.state.list.getDataForIndex(i).type;
    }, (type, dim) => {
      switch (type) {
        case 'NORMAL': 
          dim.width = SCREEN_WIDTH;
          dim.height = 100;
          break;
        default: 
          dim.width = 0;
          dim.height = 0;
          break;
      };
    })
  }

  _generateData(qty) {
    const fakeData = [];
    for(i = 0; i < qty; i+= 1) {
      fakeData.push({
        type: 'NORMAL',
        item: {
          id: i,
          image: faker.image.avatar(),
          name: faker.name.firstName(),
          description: faker.random.words(5),
        },
      });
    }
    return fakeData
  }

  fetchMoreData = () => {
    this.setState({
        ...this.state,
        list: this.state.list
    })
  }

  rowRenderer = (type, data) => {
    const { image, name, description } = data.item;
    return (
      <View style={styles.listItem}>
        {/* <Image style={styles.image} source={{ uri: image }} /> */}
        <Text style={styles.image}></Text>
        <View style={styles.body}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <RecyclerListView
          style={{flex: 1}}
          rowRenderer={this.rowRenderer}
          dataProvider={this.state.list}
          layoutProvider={this.layoutProvider}
          onEndReached={this.fethMoreData}
          onEndReachedThreshold={0.5}
          isHorizontal={true}
        //   renderFooter={() => {
        //     <View style={styles.body}>
        //         <Text style={styles.loadingItem}>Loading</Text>
        //     </View>
        //   }}
        />
       </View>
    );
  }
}

// function RecycleTestComponent() {
//     return (
//         <View style={styles.listItem}>
//         {/* <Image style={styles.image} source={{ uri: image }} /> */}
//             <Text style={styles.name}>name</Text>
//             <View style={styles.body}>
//                 <Text style={styles.name}>name</Text>
//                 <Text style={styles.description}>description</Text>
//             </View>
//         </View>
//     )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    minHeight: 1,
    minWidth: 1,
    // height: '50',
    // width: '100%',
  },
  body: {
    marginLeft: 10,
    marginRight: 10,
    maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
  },
  image: {
    height: 80,
    width: 80,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    width: 200,
  },
  description: {
    fontSize: 14,
    opacity: 0.5,
    height: 50,
    width: 200,
  },
  listItem: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#555',
    height: 50,
    width: 365,
  },
  loadingItem: {
    backgroundColor: '#999',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    // padding: '5',
    height: 30,
    width: 100
  },
});

// export default RecycleTestComponent;