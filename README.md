Welcome to the Team Up project :)

## Generate types from Swagger

npx swagger-typescript-api -p http://localhost:5161/swagger/v1/swagger.json -o "./src/app" -n "types.ts" --no-client --type-prefix "TO"
