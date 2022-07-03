# This script will build Docker Image,
# with name is DOCKER_IMAGE and Tag of Docker Image is Git Branch Name

REGISTRY=haohuynh1101
DOCKER_IMAGE=symphomu

# Replace "/" by "-", because docker tag does not allow "/"
ORIGINAL_BRAND_NAME=$(git symbolic-ref --short HEAD)
BRAND_NAME=${ORIGINAL_BRAND_NAME//[\/]/-}
IMAGE_NAME=${REGISTRY}/${DOCKER_IMAGE}:${BRAND_NAME}


# Pull Images
docker pull ${IMAGE_NAME} || true

# Build Image
docker build --platform linux/amd64 --cache-from ${IMAGE_NAME} -t ${IMAGE_NAME} .

# Push Image
docker push ${IMAGE_NAME}

# Echo result
echo ---
echo Docker Image Name : ${IMAGE_NAME}
