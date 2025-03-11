pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.51.0-noble'
            args '-u root' // Run as root to install Allure and Java
        }
    }
    stages {
        stage('Install Java') {
            steps {
                script {
                    // Install OpenJDK 11 (or choose another version as necessary)
                    sh 'apt-get update && apt-get install -y openjdk-11-jdk'
                    // Set JAVA_HOME
                    sh 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64'
                    sh 'export PATH=$JAVA_HOME/bin:$PATH'
                }
            }
        }
        stage('Install Allure') {
            steps {
                script {
                    sh 'npm install -g allure-commandline'
                }
            }
        }
        stage('install dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Build') {
            steps {
                git 'https://github.com/eroshenkoam/allure-example.git'
                // Ensure Java is available before running gradle
                sh './gradlew clean test'
            }
        }
        stage('run tests') {
            steps {
                sh 'npx playwright test --reporter=html --output=playwright-report'
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
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            allure includeProperties: false, jdk: '', results: [[path: 'build/allure-results']]
        }
    }
}
