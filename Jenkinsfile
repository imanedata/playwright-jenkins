pipeline {
    agent any
    stages {
        stage('Build and Install') {
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

                    // Vérification de la présence d'Allure dans le conteneur
                    sh 'which allure || echo "Allure not found!"'
                }
            }
        }
    }
    post {
        always {
            unstash 'test-results' // Extraire les résultats
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
