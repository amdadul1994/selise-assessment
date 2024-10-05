# Assessment
### To run the projects you need input your docker username and password as secrets
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