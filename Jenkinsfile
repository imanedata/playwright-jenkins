pipeline {
    agent {
        agent { docker { image 'mcr.microsoft.com/playwright:v1.51.0-noble' } }
    }
    stages {
        stage('Installation') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
        stage('Run Chrome Tests') {
            steps {
                sh 'npx playwright test --project=chromium'
            }
        }
    }
}
