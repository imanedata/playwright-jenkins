pipeline {
    agent any
    stages {
        stage('build and install') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.51.0-noble'
                }
            }
            steps {
                script {
                    sh 'npm ci'
                    sh 'npx playwright test --reporter=line,allure-playwright'
                    stash name: 'test-results', includes: 'test-results/*'
                }
            }
        }
    }
    post {
        always {
            unstash 'test-results' // Extract results
            script {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'test-results']]
                ])
            }
        }
    }
}
