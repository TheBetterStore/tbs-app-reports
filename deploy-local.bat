set Environment=prod
set DEPLOY_BUCKET=deploy-ap-southeast-2-048116471576

set APP_NAME=tbs-app-reports
set STACK_NAME=%APP_NAME%-%Environment%

#npm run build

REM sam package --template-file ./template.yaml --output-template-file generated-template.yaml --s3-bucket $DEPLOY_BUCKET



cd src
call npx prisma generate

cd ..
call sam build --cached --parallel

sam package --template-file ./template.yaml --output-template-file generated-template.yaml ^
--s3-bucket %DEPLOY_BUCKET% --s3-prefix sam/%STACK_NAME%

call sam deploy --template-file .aws-sam/build/template.yaml --stack-name $STACK_NAME ^
--s3-bucket %DEPLOY_BUCKET% --s3-prefix %APP_NAME% ^
--capabilities CAPABILITY_NAMED_IAM --region ap-southeast-2 --parameter-overrides Environment=%Environment% ^
AppLoginCFName=tbs-app-login-%Environment% ^
InfraBaseCFName=tbs-infra-%Environment% ^
VpcCFStackName=tbs-infra-vpc-%Environment% ^
--no-fail-on-empty-changeset ^
--tags Environment=%Environment% StackName=%STACK_NAME% TagProduct=%APP_NAME% ^
--profile thebetterstore
