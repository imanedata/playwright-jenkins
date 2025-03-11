pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.51.0-noble'
        }
    }
    stages {
        stage('install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('run tests') {
            steps {
                sh 'npx playwright test'
            }
        }
       
        stage('génération de rapport') {
            steps {
                sh 'PLAYWRIGHT_JUNIT_OUTPUT_NAME=results.xml npx playwright test --reporter=junit'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'results.xml', fingerprint: true
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'results.xml',
                reportName: 'Playwright Report'
            ])
        }
    }
}
