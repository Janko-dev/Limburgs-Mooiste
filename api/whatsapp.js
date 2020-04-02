import { Linking, } from 'react-native';

export default sendOnWhatsApp = (number) => {
  console.log(number)
  let url = 'whatsapp://send?text=&phone=+' + number;
  Linking.openURL(url).then((data) => {
    console.log('WhatsApp Opened');
  }).catch(() => {
    alert('Make sure Whatsapp installed on your device');
  });
}