pipeline {
    agent {
        docker 
        { image 'mcr.microsoft.com/playwright:v1.51.0-noble' }
        }

    stages {
        stage('Installation') {
            steps {
                sh 'npm ci'
                sh 'npx playwright test'
            }
        }
        
    }
}

