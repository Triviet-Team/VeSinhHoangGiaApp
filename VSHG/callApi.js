import axios from 'axios';

export default async function callApi(endpoint, method = 'GET', data) {
  return (
    await axios({
      method: method,
      url: `https://vesinhcongnghiep.com.vn/app/${endpoint}`,
      data: data,
      type: "JSON"
    }).catch(err => {
      console.log(err);
    })
  )
}