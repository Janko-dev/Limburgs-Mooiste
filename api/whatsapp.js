import { Linking, } from 'react-native';

export default sendOnWhatsApp = () => {

  let url = 'whatsapp://send?text=&phone=+31651889720';
  Linking.openURL(url).then((data) => {
    console.log('WhatsApp Opened');
  }).catch(() => {
    alert('Make sure Whatsapp installed on your device');
  });
}