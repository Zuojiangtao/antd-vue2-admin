pipeline {
  agent {
    node {
      label 'nodejs'
    }
  }

    parameters {
        string(name:'TAG_NAME',defaultValue: '',description:'')
    }

    environment {
        DOCKER_CREDENTIAL_ID = 'harbor-admin'
        GITHUB_CREDENTIAL_ID = 'gitlab-csz'
        KUBECONFIG_DEV_A_ID = 'kubeconfig-dev-active'
        REPLICAS = 2
        REGISTRY = 'harbor.XXXX.com'
        IMAGE_PULL_SECRET = 'harbor90'
        DOCKERHUB_NAMESPACE = 'iot'
        GITHUB_ACCOUNT = 'kubesphere'
        SONAR_CREDENTIAL_ID = 'sonar-token'
        BRANCH_NAME = 'master'
        K8S_NAMESPACES = 'workSpaceName'
        APP_NAME = 'projectName'
        COMPONENT = 'projectName'
        TIER = 'projectName'
    }
    stages {
        stage ('checkout scm') {
            steps {
                checkout(scm)
            }
        }
        stage ('npm install & build') {
            steps {
                container ('nodejs') {
                    sh 'npm -v'
                    // 设置私有node地址
                    sh 'npm config set registry http://AAAA.BBBB.CCCC:DDDD/repository/npm/'
                    sh 'npm get registry'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage ('docker build & push') {
            steps {
                container ('nodejs') {
                    sh 'docker build --no-cache -f Dockerfile -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'
                    withCredentials([usernamePassword(passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,credentialsId : "$DOCKER_CREDENTIAL_ID" ,)]) {
                        sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
                        sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'
                    }
                }
            }
        }

        stage('push latest'){
           steps{
                container ('nodejs') {
                  sh 'docker tag  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
                  sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
                }
           }
        }
        stage('deploy to K8S') {
          steps {
            kubernetesDeploy(configs: 'deploy/web/**', enableConfigSubstitution: true, kubeconfigId: "$KUBECONFIG_DEV_A_ID")
          }
        }
    }
}
