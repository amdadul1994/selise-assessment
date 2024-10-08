# Assessment
### To run the projects you need input your docker username and password as secrets
### All my manifest file are located at k8s folder and Github CI/CD main.yml file located at .github/workflows

### Also need to input your Azure credentials as secrets
### Create a Virtual Network and Subnet for AKS  using AZ CLI
```
az network vnet create \
  --resource-group myResourceGroup \
  --name myVNet \
  --address-prefixes 10.0.0.0/8 \
  --subnet-name myAKSSubnet \
  --subnet-prefix 10.240.0.0/16

```
### Deploy AKS in the Virtual Network
```
az aks create \
  --resource-group myResourceGroup \
  --name myAKSCluster \
  --node-count 2 \
  --enable-addons monitoring \
  --network-plugin azure \
  --vnet-subnet-id "/subscriptions/<subscription-id>/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myVNet/subnets/myAKSSubnet"

```
### create azure application Gateway 
```
az network application-gateway create \
  --name your-gateway-name \
  --resource-group your-resource-group \
  --location your-location \
  --sku Standard_v2 \
  --capacity 2 \
  --http-settings-protocol Http \
  --frontend-port 80 \
  --frontend-ip-configurations your-frontend-config
```
### Add the AKS service as a backend pool for your Application Gateway.
```
az network application-gateway backend-pool create \
  --gateway-name your-gateway-name \
  --resource-group your-resource-group \
  --name your-backend-pool-name \
  --servers your-aks-service-ip

```
### Create a self-signed SSL certificate and configure it in the Application Gateway
```
az network application-gateway ssl-cert create \
  --resource-group your-resource-group \
  --gateway-name your-gateway-name \
  --name your-ssl-cert-name \
  --cert-file your-cert-file.pem \
  --cert-password your-cert-password

```
### Configure listeners for both HTTP and HTTPS.

```
az network application-gateway http-listener create \
  --resource-group your-resource-group \
  --gateway-name your-gateway-name \
  --name your-http-listener-name \
  --frontend-ip-configuration your-frontend-ip-config \
  --frontend-port your-http-port

az network application-gateway http-listener create \
  --resource-group your-resource-group \
  --gateway-name your-gateway-name \
  --name your-https-listener-name \
  --frontend-ip-configuration your-frontend-ip-config \
  --frontend-port your-https-port \
  --ssl-cert your-ssl-cert-name

```
### Steps to Create a Self-Signed SSL Certificate for himu.seliseassessment.com
```
sudo apt update
sudo apt install openssl

openssl genrsa -out himu.seliseassessment.com.key 2048
openssl req -new -key himu.seliseassessment.com.key -out himu.seliseassessment.com.csr

openssl x509 -req -days 365 -in himu.seliseassessment.com.csr -signkey himu.seliseassessment.com.key -out himu.seliseassessment.com.crt

```

### Install mongodb at  ubuntu 22.04 

```
#!/bin/bash

sudo apt update
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl daemon-reload
sudo systemctl start mongod
sudo systemctl enable mongod

```