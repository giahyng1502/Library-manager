import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {cancelOrder} from './FeatchAPI';
import Snackbar from 'react-native-snackbar';
import Color from '../Types/Colors';
const OrderDetail = ({navigation}) => {
  const route = useRoute();
  //   console.log(order);
  const [data, setdata] = useState([]);
  const [isShowCancel, setisShowCancel] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setdata(order.items);
      if (order.status === 'Chờ xác nhận') {
        setisShowCancel(true);
      } else {
        setisShowCancel(false);
      }
    }, []),
  );
  const hanlerCancelOrder = () => {
    // Xử lý hủy đơn hàng
    cancelOrder(order._id).then(data => {
      Snackbar.show({
        text: data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
    });
    setisShowCancel(false);
    navigation.goBack();
  };
  // console.log(data);
  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <View style={st.productContainer}>
        <Pressable
          onPress={() => {
            navigation.navigate('ProductDetail', {
              product: item.products,
            });
          }}>
          <Image source={{uri: item.products.image}} style={st.productImage} />
        </Pressable>
        <View style={st.productInfor}>
          <Text style={st.title}>
            {item.products.name}
            <Text style={{color: Color.primaryColor}}> X{item.quantity}</Text>
          </Text>
          <Text style={[st.title, {color: Color.primaryColor}]}>
            $ {item.totalPrice}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={st.container}>
      <View style={st.header}>
        <Pressable
          style={[st.radius]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../images/back.png')}
            style={{
              width: 24,
              height: 24,
              tintColor: Color.buttomback,
            }}
          />
        </Pressable>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: Color.white,
            flex: 1,
            textAlign: 'center',
          }}>
          Order Detail
        </Text>
      </View>
      <View style={st.body}>
        <Text style={st.title}>
          Order ID :<Text style={st.value}> {order._id}</Text>
        </Text>
        <View style={st.infor}>
          <Text style={st.title}>
            Name :
            <Text style={[st.value, {textTransform: 'uppercase'}]}>
              {order.user.name}
            </Text>
          </Text>
          <Text style={st.title}>
            PhoneNumber :
            <Text style={[st.value, {textTransform: 'uppercase'}]}>
              {order.shippingAddress.phoneNumber}
            </Text>
          </Text>
          <Text style={st.title}>
            Address :
            <Text style={[st.value]}>{order.shippingAddress.address}</Text>
          </Text>
          <Text style={st.title}>
            Status :<Text style={[st.value]}>{order.status}</Text>
          </Text>
        </View>
        <FlatList
          style={{flex: 1}}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </View>
      <View style={st.footer}>
        {isShowCancel && (
          <Pressable
            style={[
              st.button,
              {marginBottom: 10, backgroundColor: Color.buttomback},
            ]}
            onPress={() => {
              hanlerCancelOrder();
            }}>
            <Text
              style={{color: Color.white, fontSize: 18, fontWeight: 'bold'}}>
              Cancel Order
            </Text>
          </Pressable>
        )}
        <Pressable
          style={st.button}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={{color: Color.white, fontSize: 18, fontWeight: 'bold'}}>
            Continue Shopping
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
export default OrderDetail;

const st = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.primaryColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Color.textHint,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  radius: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Color.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    letterSpacing: 1,
    color: Color.textHintColor,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 20,
    marginLeft: 10,
    letterSpacing: 1,
    color: Color.textHintColor,
  },
  infor: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.primaryColor,
    padding: 20,
  },
  body: {
    flex: 1,
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productInfor: {
    flex: 1,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.textHint,
  },
  productPrice: {
    fontSize: 16,
    fontStyle: 20,
    color: Color.textHint,
  },
  productQuantity: {
    color: Color.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
