import nebPayQuery from '../lib/nebPay';
import nebulas from 'nebulas';
import moment from 'moment';
const NebPay = nebPayQuery('nebpay');

const Account = nebulas.Account,
      neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));

window.nebulas = nebulas;
window.Account = Account;
const address = 'n1kH7LxXZJhvBWLzfKbPaFvGSYbA2V3LWxT';

var nebPay = new NebPay();

var intervalQuery

function funcIntervalQuery(serialNumber,cb,count) {
  nebPay.queryPayInfo(serialNumber)   //search transaction result from server (result upload to server by app)
    .then(function (resp) {
      var respObject = JSON.parse(resp)
      if(respObject.code === 0){
        cb(resp);
        if(count == 3){
          clearTimeout(intervalQuery)
        }
        setTimeout(() => {
          funcIntervalQuery(serialNumber,cb,count++);
        },5000)
        }
      })
    .catch(function (err) {
      console.log(err);
    });
}
export const addDream = (key,value,cb) => {
  var options = {}
  const time = moment().format('YYYY-MM-DD HH:mm');
  console.log(time)
  const serialNumber = nebPay.call(address,0,"save",JSON.stringify([key,value,time]),options)
  intervalQuery = setTimeout(() => {
    funcIntervalQuery(serialNumber,cb,0)
  },5000);
}
export const findDreams = (cb) => {
  var from = Account.NewAccount().getAddressString();
  var value = "0";
  var nonce = "0";
  var gas_price = "1000000";
  var gas_limit = "2000000";
  var callFunction = "getAll";
  var contract = {
    "function": callFunction,
    "args":'["0","9999"]'
  };
  neb.api.call(from,address,value,nonce,gas_price,gas_limit,contract).then(function ({result}) {
    console.log(result)
    cb(JSON.parse(result))
  }).catch(function (err) {
    //cbSearch(err)
    console.log("error:" + err.message)
  })
}