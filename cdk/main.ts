#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { CostSplitterStack } from './constructs/cost-splitter'

const app = new cdk.App()
let stageName = app.node.tryGetContext('stageName')

if (!stageName) {
  console.log('Defaulting stage name to dev')
  stageName = 'dev'
}

new CostSplitterStack(app, `CostSplitterStack-${stageName}`, { stageName })