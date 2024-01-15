const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1OTBjNDk2ZC03ZGNjLTRhYWMtOTNmMy01ZjA1ZTQ4N2U3ZTYiLCJlbWFpbCI6ImRld3Rlc2ZheWU3NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWI3Y2NlZTU5MTAwYTcwODkwM2EiLCJzY29wZWRLZXlTZWNyZXQiOiJlMGM4MTMzZjE2MDhmMzdlYjM3OWZjNTlmMGQwOTVjODAzYzNlMWZhMzIyYTQzZjRlNGZkMTU4YzE5ZTc3ZmQzIiwiaWF0IjoxNzA1MTc0MTY0fQ.in_D5uJ5sdq_HOTL9WtelYPpIt-9lMo386R5yojx_j4

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "/home/abresh/Desktop/End-to-End-Web3-dApps/assets/Certificate_of_comp.png";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
      name: 'Certificate_of_comp',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
