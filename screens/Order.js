import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
// import Header from './Header';
import {useFocusEffect} from '@react-navigation/native';
import {getData} from './FeatchAPI';
import Color from '../Types/Colors';

const Orderhistory = ({navigation}) => {
  const [data, setdata] = useState([]);
  const uri = 'http://10.0.3.2:3000/borrowing';

  const [onRefesh, setonRefesh] = useState(false);

  const onRefeshing = async () => {
    setonRefesh(true);
    await getData(uri).then(data => setdata(data));
    setonRefesh(false);
  };
  useFocusEffect(
    useCallback(() => {
      getData(uri).then(data => setdata(data));
      //   console.log(data);
    }, []),
  );

  const renderItem = ({item}) => {
    // console.log(items);
    const infor = item.infor;
    const product = item.bookId;
    const dateStr = item.createdAt;
    const date = new Date(dateStr);

    // Chuyển đổi sang định dạng dd/mm/yyyy
    const formattedDate = date.toLocaleDateString('en-GB'); // 'en-GB' cho định dạng ngày kiểu dd/mm/yyyy
    return (
      <TouchableOpacity key={item._id} style={s.itemContainer}>
        <LinearGradient
          start={{x: 0.1, y: 0.1}} // Điều chỉnh hướng bắt đầu
          end={{x: 1, y: 0.5}} // Điều chỉnh hướng kết thúc
          colors={['#21262E', 'rgba(33, 38, 46, 0)']}
          style={s.gradient}>
          <View style={s.row}>
            <Image source={{uri: product.image}} style={s.image} />
            <View>
              <Text style={s.title}>Nguời mượn : {infor.borrowerName}</Text>
              <Text style={s.title}>{product.name}</Text>
              <Text style={s.title}>
                Tình trạng : {item.status ? 'Đã trả' : 'Chưa trả'}
              </Text>
              <Text style={s.title}>Ngày Mượn : {formattedDate}</Text>
            </View>
            <View style={s.infor}></View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={s.container}>
      {/* <Header title="Order History" navigation={navigation} /> */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={onRefesh} onRefresh={onRefeshing} />
        }
      />
    </View>
  );
};

export default Orderhistory;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.backGroundColor,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.white,
    marginBottom: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: 200,
    borderRadius: 20,
    padding: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  image: {
    width: 120,
    marginRight: 10,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollar: {
    color: Color.white,
    fontSize: 24,
    marginRight: 5,
    fontWeight: 'bold',
    color: Color.primaryColor,
  },
  priceText: {
    fontSize: 24,
    color: Color.white,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.white,
    marginBottom: 5,
  },
});
