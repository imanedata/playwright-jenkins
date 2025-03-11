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
                sh 'npm install -g allure-commandline --save-dev'
            }
        }
        stage('Run tests') {
            steps {
                sh 'npx playwright test --reporter=junit,html'
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
            archiveArtifacts artifacts: 'results.xml', fingerprint: true
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            archiveArtifacts artifacts: 'allure-report/**', fingerprint: true

            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
        cleanup {
            cleanWs()
        }
    }
}
