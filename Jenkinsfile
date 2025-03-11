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
        stage('Build') {
            steps {
                git 'https://github.com/eroshenkoam/allure-example.git'
                sh './gradlew clean test'
            }
        } // <-- Added missing closing bracket here

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
        stage('génération de rapport allur') {
            steps {
                sh 'allure serve allure-results'
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
            allure includeProperties: false,
            jdk: '',
            results: [[path: 'build/allure-results']]
        }
    }
}
