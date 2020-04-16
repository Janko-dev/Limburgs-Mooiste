import { Linking, } from 'react-native';

export default sendOnWhatsApp = (number) => {
  let url = 'whatsapp://send?text=&phone=+' + number;
  Linking.openURL(url).then((data) => {
  }).catch(() => {
    alert('Make sure Whatsapp installed on your device');
  });
}