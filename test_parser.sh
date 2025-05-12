#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# API base URL - using local development server
API_BASE="http://localhost:3000"
# API_BASE="https://parser-api-two.vercel.app" # Replace with your actual API base URL

# Check if URL is provided
if [ -z "$1" ]; then
    echo "Usage: ./test-parser.sh <url>"
    echo "Example: ./test-parser.sh https://example.com"
    exit 1
fi

URL="https://sspai.com/post/99117"

echo -e "\n${BLUE}🔍 Testing /parser endpoint with URL: $URL${NC}"
echo "GET $API_BASE/parser?url=$URL"
echo -e "\n${GREEN}Response:${NC}"
PARSER_RESPONSE=$(curl -s -v "$API_BASE/parser?url=$URL")
echo "Raw response:"
echo "$PARSER_RESPONSE"
echo -e "\nFormatted JSON (if valid):"
echo "$PARSER_RESPONSE" | jq '.' || echo "Invalid JSON response"

echo -e "\n${BLUE}🔍 Testing /parse-html endpoint with sample HTML${NC}"
echo "POST $API_BASE/parse-html"
echo -e "\n${GREEN}Response:${NC}"
HTML_RESPONSE=$(curl -s -v -X POST "$API_BASE/parse-html" \
  -H "Content-Type: application/json" \
  -d "{
    \"url\": \"$URL\",
    \"html\": \"<html><head><title>Test Article</title></head><body><h1>Test Article</h1><p>This is a test article content.</p></body></html>\"
  }")
echo "Raw response:"
echo "$HTML_RESPONSE"
echo -e "\nFormatted JSON (if valid):"
echo "$HTML_RESPONSE" | jq '.' || echo "Invalid JSON response"

echo -e "\n✅ Tests completed!"