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
                    
                    // Installer Allure
                    sh 'npm install -g allure-commandline'

                    // Exécuter les tests avec Allure comme reporter
                    sh 'npx playwright test --reporter=line,allure-playwright'
                    
                    // Vérifier que allure-results existe
                    sh 'ls -l allure-results || echo "No results found!"'
                    
                    // Stasher les résultats
                    stash name: 'allure-results', includes: 'allure-results/*'
                }
            }
        }
    }
    post {
        always {
            script {
                try {
                    unstash 'test-results' // Extraire les résultats
                } catch (Exception e) {
                    echo "No stash found, skipping unstash step."
                }

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
