pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.51.0-noble'
            args '--entrypoint=""'
        }
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Install Allure CLI') {
            steps {
                git 'https://github.com/eroshenkoam/allure-example.git'
                sh './gradlew clean test'
            }
        }
        stage('Génération de rapport Allure') {
            steps {
                sh 'allure generate allure-results --clean -o allure-report'
            }
        }
    }
    post {
        always {
                    allure includeProperties:
                     false,
                     jdk: '',
                     results: [[path: 'build/allure-results']]
                }
    }
}
