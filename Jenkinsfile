pipeline {
    agent {
        docker {
            image 'playwright'
        }
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
