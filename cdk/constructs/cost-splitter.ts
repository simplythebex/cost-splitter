import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'

type UpdatedStackProps = cdk.StackProps 
  & { stageName: string }

export class CostSplitterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: UpdatedStackProps) {
    super(scope, id, props)

    const lambdaFunction = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('functions'),
      handler: 'hello.handler'
    })

    const api = new apigateway.RestApi(this, `${props?.stageName}-MyApi`, {
      deployOptions: {
        stageName: props?.stageName
      }
    })

    const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction)
    api.root.addMethod('GET', lambdaIntegration)
  }
}
