#!/bin/bash

SERVICES=("service-1" "service-2" "service-3")

# Run tests and capture output
TEST_OUTPUT=$(npm test)

if [ $? -ne 0 ]; then
    echo "Tests failed. Exiting."
    exit 1
fi

echo "Creating a service with test information..."
SERVICE_NAME="test-info-service"
SERVICE_DIR="./services/$SERVICE_NAME"
mkdir -p $SERVICE_DIR
echo "$TEST_OUTPUT" > $SERVICE_DIR/test-info.txt

if [ $? -ne 0 ]; then
    echo "Failed to create test information service. Exiting."
    exit 1
else
    echo "Test information service created successfully."
fi

for SERVICE_NAME in "${SERVICES[@]}"; do
  SERVICE_DIR="./services/$SERVICE_NAME"
  
  echo "Processing $SERVICE_NAME..."

  ./shared/scripts/run-tests-and-create-service.sh $SERVICE_NAME $SERVICE_DIR

  if [ $? -ne 0 ]; then
    echo "Failed to create service for $SERVICE_NAME. Moving to the next service."
  else
    echo "Service for $SERVICE_NAME created successfully."
  fi
done

echo "All services processed."