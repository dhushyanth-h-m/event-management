# AWS Setup Guide for Event Management Platform

This guide helps you set up AWS credentials and infrastructure for deploying the Event Management Platform.

## Prerequisites

- AWS Account
- AWS CLI installed locally
- kubectl installed
- Docker Desktop (for local testing)

## Step 1: Create AWS IAM User for GitHub Actions

### 1.1 Create IAM User
```bash
# Log into AWS Console
# Go to IAM → Users → Create User
# User name: github-actions-event-management
# Select "Attach policies directly"
```

### 1.2 Attach Required Policies
The IAM user needs these permissions:
- `AmazonEKSClusterPolicy`
- `AmazonEKSWorkerNodePolicy`
- `AmazonEKS_CNI_Policy`
- `AmazonEC2ContainerRegistryPowerUser`
- `AmazonEKSServicePolicy`

Or create a custom policy with these permissions:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "eks:DescribeCluster",
                "eks:ListClusters",
                "eks:DescribeNodegroup",
                "eks:ListNodegroups",
                "eks:DescribeUpdate",
                "eks:ListUpdates"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken",
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage"
            ],
            "Resource": "*"
        }
    ]
}
```

### 1.3 Generate Access Keys
```bash
# In IAM Console → Users → [your-user] → Security credentials
# Create access key → Command Line Interface (CLI)
# Download or copy the credentials
```

## Step 2: Set Up EKS Cluster

### 2.1 Create EKS Cluster (Option 1: AWS Console)
```bash
# Go to EKS Console
# Create cluster
# Name: event-management-cluster
# Version: 1.27 or later
# Service role: Create new role with EKS service policy
```

### 2.2 Create EKS Cluster (Option 2: AWS CLI)
```bash
# Create cluster
aws eks create-cluster \
    --name event-management-cluster \
    --version 1.27 \
    --role-arn arn:aws:iam::ACCOUNT-ID:role/eks-service-role \
    --resources-vpc-config subnetIds=subnet-12345,subnet-67890

# Create node group
aws eks create-nodegroup \
    --cluster-name event-management-cluster \
    --nodegroup-name event-management-nodes \
    --subnets subnet-12345 subnet-67890 \
    --instance-types t3.medium \
    --ami-type AL2_x86_64 \
    --node-role arn:aws:iam::ACCOUNT-ID:role/NodeInstanceRole \
    --scaling-config minSize=1,maxSize=3,desiredSize=2
```

### 2.3 Update kubeconfig locally
```bash
# Configure kubectl to use your EKS cluster
aws eks update-kubeconfig --region us-west-2 --name event-management-cluster

# Test connection
kubectl get nodes
```

## Step 3: Configure GitHub Secrets

### 3.1 Required Secrets
In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**

Add these repository secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `AWS_ACCESS_KEY_ID` | Your IAM user access key | `AKIA1234567890EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | Your IAM user secret key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | Your AWS region | `us-west-2` |

### 3.2 Optional: Environment-specific Secrets
For production deployment, also add:

| Secret Name | Description |
|-------------|-------------|
| `MONGODB_URI` | Production MongoDB connection string |
| `JWT_SECRET` | Strong production JWT secret (32+ characters) |
| `REDIS_URL` | Redis connection URL for production |

## Step 4: Test Deployment

### 4.1 Trigger Deployment
```bash
# Push to main branch to trigger CI/CD
git push origin main
```

### 4.2 Monitor Deployment
```bash
# Watch GitHub Actions workflow
# Check in GitHub repository → Actions tab

# Check Kubernetes deployment
kubectl get deployments
kubectl get services
kubectl get pods
```

### 4.3 Get Application URL
```bash
# Get LoadBalancer URL
kubectl get service event-management-service

# Or use port-forward for testing
kubectl port-forward service/event-management-service 3000:80
```

## Step 5: Troubleshooting

### Common Issues

1. **EKS cluster not found**
   - Verify cluster name matches in workflow
   - Check AWS region is correct
   - Ensure IAM user has EKS permissions

2. **Authentication failed**
   - Verify AWS credentials are correct
   - Check IAM user policies
   - Ensure secrets are set in GitHub

3. **Deployment fails**
   - Check Kubernetes manifests
   - Verify Docker image exists
   - Check cluster has sufficient resources

### Debug Commands
```bash
# Check cluster status
aws eks describe-cluster --name event-management-cluster

# Check node groups
aws eks describe-nodegroup --cluster-name event-management-cluster --nodegroup-name event-management-nodes

# Check pods
kubectl get pods -A
kubectl describe pod <pod-name>

# Check logs
kubectl logs deployment/event-management-app
```

## Step 6: Cost Optimization

### 6.1 Use Spot Instances
```bash
# Create managed node group with spot instances
aws eks create-nodegroup \
    --cluster-name event-management-cluster \
    --nodegroup-name spot-nodes \
    --capacity-type SPOT \
    --instance-types t3.medium,t3.large \
    --scaling-config minSize=1,maxSize=5,desiredSize=2
```

### 6.2 Enable Cluster Autoscaler
```bash
# Deploy cluster autoscaler
kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
```

## Security Best Practices

1. **Rotate AWS credentials regularly**
2. **Use least privilege principle for IAM policies**
3. **Enable EKS audit logging**
4. **Use AWS Secrets Manager for sensitive data**
5. **Enable network policies in Kubernetes**

## Next Steps

1. Set up monitoring with Prometheus/Grafana
2. Configure SSL/TLS certificates
3. Set up backup strategies
4. Implement blue-green deployments
5. Add health checks and readiness probes 