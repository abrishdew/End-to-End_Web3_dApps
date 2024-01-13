import os
import json
import requests
from flask import Flask, request

app = Flask(__name__)

@app.route('/create_nft', methods=['POST'])
def create_nft():
   nft_name = request.json['name']
   nft_description = request.json['description']

   metadata = {
       'name': nft_name,
       'description': nft_description,
      
   }

   ipfs_url = upload_to_ipfs(metadata)

   return {'ipfsUrl': ipfs_url}

def upload_to_ipfs(metadata):
   # Convert the metadata to a JSON string
   metadata_str = json.dumps(metadata)

   # Create a FormData object and append the metadata
   form_data = FormData()
   form_data.append('file', metadata_str)

   # Set the headers
   headers = {
       'Content-Type': f'multipart/form-data; boundary={form_data.boundary}',
       'Authorization': f'Bearer {os.getenv('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1OTBjNDk2ZC03ZGNjLTRhYWMtOTNmMy01ZjA1ZTQ4N2U3ZTYiLCJlbWFpbCI6ImRld3Rlc2ZheWU3NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWI3Y2NlZTU5MTAwYTcwODkwM2EiLCJzY29wZWRLZXlTZWNyZXQiOiJlMGM4MTMzZjE2MDhmMzdlYjM3OWZjNTlmMGQwOTVjODAzYzNlMWZhMzIyYTQzZjRlNGZkMTU4YzE5ZTc3ZmQzIiwiaWF0IjoxNzA1MTc0MTY0fQ.in_D5uJ5sdq_HOTL9WtelYPpIt-9lMo386R5yojx_j4')}'
')}'
   }

   # Send the POST request to Pinata
   response = requests.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data=form_data, headers=headers)

   # Extract the IPFS URL from the response
   ipfs_url = response.json()['IpfsHash']

   return ipfs_url

if __name__ == '__main__':
   app.run(debug=True)
