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
                    
                    // Installation d'Allure si nécessaire
                    sh 'npm install -g allure-commandline'

                    // Exécution des tests avec Allure
                    sh 'npx playwright test --reporter=line,allure-playwright'

                    // Vérification si test-results existe avant de stasher
                    sh '[ -d test-results ] && echo "Stashing test-results" || echo "No test-results found!"'

                    stash name: 'test-results', includes: 'test-results/*'
                }
            }
        }
    }
    post {
        always {
            script {
                try {
                    unstash 'test-results' // Extraction des résultats
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
